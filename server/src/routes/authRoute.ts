import express from "express";
import { login } from "../controllers/authcontroller";

const authrouter=express.Router()

authrouter.post('/login',login)

export default authrouter