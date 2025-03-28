import dotenv from 'dotenv'
import { Environment } from '../types/environment'
dotenv.config()

const env: Environment = <any>process.env
export const AppCredentials = {
  port: env.PORT || 3000,
  client :env.FRONTEND_URL
}

export const Mongo = {
  url: env.MONGO_URL,
}

export const EmailConfig = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_APP_PASS,
}

export const JwtConfig = {
  key: process.env.JWT_KEY || 'pgdrwixbncvdfuhudnmshwu',
}

export const GoogleClientId= process.env.GOOGLE_CLIENT_ID