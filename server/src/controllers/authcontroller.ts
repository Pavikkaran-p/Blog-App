import { Request, Response } from "express";

export function login(req:Request, res:Response){
    try {
        return res.status(200).send({"msg":"Login successful"})
    } catch (error) {
        console.log(error)
    }
}