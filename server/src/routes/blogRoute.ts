import express, { Request, Response } from "express";
import { allblogs, getBlogById, newblog, newComment, uploadFileToS3 } from "../controllers/blogcontroller";
import { multerUpload } from "../services/InitMulter";
import { verifyToken } from "../middleware/verifyToken.middleware";

const blogRoute=express.Router()
blogRoute.get('/allblogs',allblogs)
blogRoute.get('/getblog',getBlogById)
blogRoute.post('/newblog',verifyToken, newblog)
blogRoute.post('/newComment',verifyToken, newComment)
blogRoute.post('/uploadfile', multerUpload.single('file'),uploadFileToS3)

blogRoute.get('*',(req:Request,res:Response)=>{
    res.send("No matching routes")
})
export const blogRoutes = blogRoute