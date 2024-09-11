import mongoose, { Schema } from "mongoose";

const userSchema=new Schema(
    {
        name:String,
        password:String,
        email:{
            type:String,
            required:true,
            unique:true,
        }
    },
    {
        timestamps: true
    }
)

const User=mongoose.model('User',userSchema)

export default User