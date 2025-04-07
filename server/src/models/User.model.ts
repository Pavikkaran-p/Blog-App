import mongoose, { Schema } from "mongoose";

const userSchema=new Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        blogs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }]
    },
    {
        timestamps: true
    }
)

const User=mongoose.model('User',userSchema)

export default User