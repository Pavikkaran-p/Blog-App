import express from "express";
import { gauth, signin, signup } from "../controllers/authcontroller";

const authrouter=express.Router()

authrouter.post('/signin',signin)
authrouter.post('/signup',signup)
authrouter.post('/google',gauth)

export default authrouter