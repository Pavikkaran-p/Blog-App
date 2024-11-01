import Blog from './../models/Blog.model';
import { Request, Response } from "express";
import BlogModel from "../models/Blog.model";

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