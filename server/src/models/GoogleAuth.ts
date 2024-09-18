import mongoose, { Schema, Document } from 'mongoose';
import { GoogleAuthUser } from '../types/gauth';

const GoogleUserSchema: Schema = new Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String },
});

const GAuthUser=mongoose.model<GoogleAuthUser>('GAuthUser', GoogleUserSchema);
export default GAuthUser
