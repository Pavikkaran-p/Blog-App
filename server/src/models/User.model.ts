import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String, // required only for email/password login
      default: null,
    },
    googleId: {
      type: String, // required only for Google login
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    blogs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }]
  }, { timestamps: true });
  

const User=mongoose.model('User',userSchema)

export default User