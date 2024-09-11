import express, { Request, Response } from "express";
import { allblogs, newblog } from "../controllers/blogcontroller";

const router=express.Router()
router.get('/allblogs',allblogs)
router.post('/newblog',newblog)
router.get('*',(req:Request,res:Response)=>{
    res.send("No routes found")
})
export default router