import { multerUpload } from '../services/InitMulter';
import Blog from './../models/Blog.model';
import { Request, Response } from "express";
import BlogModel from "../models/Blog.model";
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import path from 'path';
import { s3clientservice } from '../services/AwsS3Client';
import GAuthUser from '../models/GoogleAuth.model';
import mongoose from 'mongoose';
import User from '../models/User.model';

export async function allblogs(req: Request, res: Response) {
    try {
        const data = await Blog.find();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'An error occurred while fetching blogs.' });
    }
}
export async function myblogs(req: Request, res: Response) {
    try {
        const data = await Blog.find({userId:req.params.userId});
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'An error occurred while fetching blogs.' });
    }
}

export async function getBlogById(req:Request,res:Response){
    try {
      console.log("req",req)
        const blogId=req.headers['blogid']
        console.log("blogid",blogId)
        const blog=await Blog.findOne({blogId}) 
        // .select("title content userId imageUrl tags");
        console.log("blog",blog)
        if (!blog) return res.status(404).send("Blog not found");     
        res.status(200).json(blog);
    } catch (error) {
        console.log(error)
        res.status(400).send("error")
    }
}


export async function newblog(req: Request,res: Response){
    try {
        const {title, content,imageUrl,tags}=req.body
        console.log(req.body)
        if (!title || !content ) {
            return res.status(400).json({ error: 'Title and content are required.' });
        }
        const email = res.locals.email;
        const user = await User.findOne({ email:email });
        console.log(user)
        if (!user) {
        return res.status(404).json({ error: "User not found." });
        }
        const userId = user?._id || new mongoose.Types.ObjectId("6612d2fcf69d8a5f34719f9b");

        console.log("userId",userId)
        const blogId = uuidv4();
        console.log("blogId",blogId)
        // slugify(title, { lower: true });
        const newBlog = new BlogModel({
        blogId,
        title,
        content,
        userId,
        imageUrl,
        tags,
        });

        await newBlog.save()
        await User.findByIdAndUpdate(
            userId,
            { $push: { blogs: newBlog._id } },
            { new: true }
        )
        res.status(200).json({"message":"Blog saved successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong")
    }
}

export async function uploadFileToS3(req: Request, res: Response): Promise<Response>  {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
      const file = req.file;
      console.log(file.originalname)

      // const uniqueFileName = `${uuidv4()}+${file.originalname}`;
      const uniqueFileName = `${uuidv4()}`;
      
      const uploadParams: PutObjectCommandInput = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: uniqueFileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read',
      };
  
      const command = new PutObjectCommand(uploadParams);
      await s3clientservice.send(command);
  
      // const fileUrl = `${uniqueFileName}`;
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

export async function newComment(req: Request, res: Response) {
  try {
    const { blogId, text } = req.body;

    if (!blogId || !text) {
      return res.status(400).json({ error: "blogId and text are required." });
    }

    const email = res.locals.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const blog = await BlogModel.findOne({ blogId });

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found." });
    }

    blog.comments.push({
        commentUserId: new mongoose.Types.ObjectId(user._id),
        text: text,
    });

    await blog.save();

    res.status(200).json({
      message: "Comment added successfully",
      comments: blog.comments,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
