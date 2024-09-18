import mongoose from 'mongoose'
import { Mongo } from '../config/appConfig'

export async function connectToDb() {
  try {
    const db=await mongoose.connect(Mongo.url).then(() => {
      console.log(`Connection to MongoDb `)
    })
  } catch (err) {
    console.log("MongoDB connection failed")
    setTimeout(() => {
      connectToDb()
      console.log("Retrying...")
    }, 5000);
  }
}