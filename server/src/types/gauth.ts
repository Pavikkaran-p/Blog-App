import { Document, Types } from "mongoose";

export interface GoogleAuthUser extends Document {
    googleId: string;
    name: string;
    email: string;
    picture?: string;
    blogs?: Types.ObjectId[]; 
  }