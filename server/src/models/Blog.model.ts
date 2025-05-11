import mongoose, { Document, Schema } from 'mongoose';
import { Blog } from '../types/Blog';

// Comment subdocument schema
const commentSchema = new mongoose.Schema(
  {
    commentUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  imageUrl: { type: String},
  blogId: { type: String},
  tags: { type: [String], required: false },
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema] 
},
{ timestamps: true }
);

const blogmodel=mongoose.model<Blog & Document>('Blog', BlogSchema)
export default blogmodel