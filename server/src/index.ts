import express, { Request, Response } from 'express'
import cors from "cors";
import { connectToDb } from './database/connectToDb'
import { AppCredentials } from './config/appConfig'
import blogRoute from './routes/blogRoute'
import authrouter from './routes/authRoute'
import rateLimiter, { ImageUploadRateLimiter } from './middleware/RateLimiter';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import path from 'path';
const app=express()
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(rateLimiter)

const upload = multer();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

app.get('/',(req,res)=>{
    console.log("Hello world")
    res.status(200).json("Ok")
})


app.post('/upload',ImageUploadRateLimiter, upload.single('file'), async (req: Request, res: Response): Promise<Response> => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    const file = req.file;
    console.log(file.originalname)
    const uniqueFileName = `${uuidv4()}+${file.originalname}`;
    
    const uploadParams: PutObjectCommandInput = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: uniqueFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: 'public-read',
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

    return res.json({
      message: 'File uploaded successfully',
      fileUrl,
    });
  } catch (err) {
    console.error('Error uploading file to S3:', err);
    return res.status(500).json({ error: 'Error uploading file' });
  }
});

app.use('/api/v1/blog',blogRoute)
app.use('/api/v1/auth',authrouter)

const startServer = async () => {
    try {
      await connectToDb()
      app.listen(AppCredentials.port, () => {
        console.log(`Server listening on ${AppCredentials.port}`)
      })
    } catch (error: any) {
      console.log('something went wrong ', error)
    }
}

startServer()