import express from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JwtConfig } from '../config/appConfig' // Make sure this has JwtConfig.key

export const verifyToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token is missing',
      });
    }
    const decoded = jwt.verify(token, JwtConfig.key) as JwtPayload;

    console.log("Token:", token);
    console.log("Decoded:", decoded);

    res.locals.user = { id: decoded.id };
    res.locals.email = decoded.email;

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({
      success: false,
      message: 'Token is invalid or expired',
    });
  }
};
