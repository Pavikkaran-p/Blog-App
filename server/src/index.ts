import express from 'express'
import { connectToDb } from './database/connectToDb'
import { AppCredentials } from './config/appConfig'
import blogRoute from './routes/blogRoute'
const app=express()
app.use(express.json())

app.get('/',(req,res)=>{
    console.log("Hello world")
    res.status(200).json("Ok")
})
app.use('/api/v1/blog',blogRoute)
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