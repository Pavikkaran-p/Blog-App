import { Types } from "mongoose";

export interface Comment {
  commentUserId: Types.ObjectId;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Blog extends Document {
    blogId: string;
    title: string;
    content: string;
    imageUrl?: string;
    tags: string[];
    createdAt: Date;
    userId?: string;
    comments: Comment[];
  }