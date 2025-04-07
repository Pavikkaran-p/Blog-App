import express, { Request, Response } from "express";
import { allblogs, newblog, uploadFileToS3 } from "../controllers/blogcontroller";
import { multerUpload } from "../services/InitMulter";
import { verifyToken } from "../middleware/verifyToken.middleware";

const blogRoute=express.Router()
blogRoute.get('/allblogs',allblogs)
blogRoute.post('/newblog',verifyToken, newblog)
blogRoute.post('/uploadfile', multerUpload.single('file'),uploadFileToS3)

blogRoute.get('*',(req:Request,res:Response)=>{
    res.send("No matching routes")
})
export const blogRoutes = blogRoute