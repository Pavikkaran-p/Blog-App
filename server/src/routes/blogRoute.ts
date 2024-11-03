import express, { Request, Response } from "express";
import { allblogs, newblog, uploadFileToS3 } from "../controllers/blogcontroller";
import { multerUpload } from "../services/InitMulter";

const router=express.Router()
router.get('/allblogs',allblogs)
router.post('/newblog',newblog)
router.post('/uploadfile', multerUpload.single('file'),uploadFileToS3)

router.get('*',(req:Request,res:Response)=>{
    res.send("No matching troutes")
})
export default router