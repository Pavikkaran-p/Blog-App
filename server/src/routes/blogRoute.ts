import express from "express";
import { newblog } from "../controller/blogcontroller";

const router=express.Router()

router.post('/newblog',newblog)

export default router