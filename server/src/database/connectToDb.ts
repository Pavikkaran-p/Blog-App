import mongoose from 'mongoose'
import { Mongo } from '../config/appConfig'

export async function connectToDb() {
  try {
    mongoose.connect(Mongo.url).then(() => {
      console.log('Connection to Db was Successfull !')
    })
  } catch (err) {
    console.log("MongoDB connection failed")
  }
}