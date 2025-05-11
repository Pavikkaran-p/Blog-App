import mongoose from 'mongoose'
import { Mongo } from '../config/appConfig'

export function connectToDb() {
  try {
    const f = async () => {
      const db=await mongoose.connect(Mongo.url).then(() => {
        console.log(`Connection to MongoDb `)
      })
    }
    f()
  } catch (err) {
    console.log("MongoDB connection failed")
    setTimeout(() => {
      connectToDb()
      console.log("Retrying...")
    }, 5000);
  }
}