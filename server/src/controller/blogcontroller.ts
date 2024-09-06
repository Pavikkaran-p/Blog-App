import { Request, Response } from "express";
import BlogModel from "../model/Blog.model";


export function newblog(req: Request,res: Response){
    try {
        const {title, content,}=req.body
        console.log("0001")
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required.' });
        }

        const newBlog = new BlogModel({
        title,
        content,
        // tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
        });

        newBlog.save()
        res.status(200).json("Saved successfully")
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}