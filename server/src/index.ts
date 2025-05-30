import express, { Request, Response } from 'express'
import cors from "cors";
import { connectToDb } from './database/connectToDb'
import { AppCredentials } from './config/appConfig'
import {blogRoutes} from './routes/blogRoute'
import authrouter from './routes/authRoute'
import rateLimiter from './middleware/RateLimiter.middleware';
import { allblogs } from './controllers/blogcontroller';

const app=express()
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(rateLimiter)

app.get('/',(req,res)=>{
    console.log("Server working fine")
    res.status(200).json("Server working fine")
})

app.use('/api/v1/blog',blogRoutes)
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