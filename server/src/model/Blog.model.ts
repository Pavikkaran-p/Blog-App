import mongoose, { Document, Schema } from 'mongoose';

export interface Blog extends Document {
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
}


const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], required: false },
  createdAt: { type: Date, default: Date.now },
});


export default mongoose.model<Blog>('Blog', BlogSchema);