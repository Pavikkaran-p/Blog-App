import { multerUpload } from '../services/InitMulter';
import Blog from './../models/Blog.model';
import { Request, Response } from "express";
import BlogModel from "../models/Blog.model";
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import path from 'path';
import { s3clientservice } from '../services/AwsS3Client';

export async function allblogs(req:Request,res:Response){
    try {
        const data=await Blog.find()        
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(400).send("error")
    }
}

export async function FindById(req:Request,res:Response){
    try {
        const blogid=req.params
        const data=await Blog.find()        
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(400).send("error")
    }
}


export async function newblog(req: Request,res: Response){
    try {
        const {title, content,imageUrl}=req.body
        
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required.' });
        }

        const newBlog = new BlogModel({
        title,
        content,
        imageUrl
        // tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
        });

        await newBlog.save()
        console.log("New Blog saved")
        res.status(200).json("Saved successfully")
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

export async function uploadFileToS3(req: Request, res: Response): Promise<Response>  {
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
      await s3clientservice.send(command);
  
      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
  
      return res.json({
        message: 'File uploaded successfully',
        fileUrl,
      });
    } catch (err) {
      console.error('Error uploading file to S3:', err);
      return res.status(500).json({ error: 'Error uploading file' });
    }
  }