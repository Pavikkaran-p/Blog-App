import express from 'express'
import cors from "cors";
import { connectToDb } from './database/connectToDb'
import { AppCredentials } from './config/appConfig'
import blogRoute from './routes/blogRoute'
import authrouter from './routes/authRoute'
const app=express()
app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    console.log("Hello world")
    res.status(200).json("Ok")
})

app.use('/api/v1/blog',blogRoute)
app.use('/api/v1/auth',authrouter)

const startServer = async () => {
    try {
      await connectToDb()
      app.listen(AppCredentials.port, () => {
        console.log(`Server listening on ${AppCredentials.port}`)
      })
    } catch (error: any) {
      console.log('something went wrong ', error)
    }
}
  
startServer()