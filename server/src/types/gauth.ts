import { Document } from "mongoose";

export interface GoogleAuthUser extends Document {
    googleId: string;
    name: string;
    email: string;
    picture?: string;
  }