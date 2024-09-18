import mongoose, { Document, Schema } from 'mongoose';
import { Blog } from '../types/Blog';

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String},
  tags: { type: [String], required: false },
  createdAt: { type: Date, default: Date.now },
});

const blogmodel=mongoose.model<Blog>('Blog', BlogSchema)
export default blogmodel