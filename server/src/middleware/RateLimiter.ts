import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: (req: Request, res: Response) => {
    return 500;
  },
  keyGenerator: (req: Request) => {
    if (!req.ip) return "";
    return req.ip;
  },
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      status: 429,
      message: "Too many requests, please try again later.",
    });
  },
});

export const ImageUploadRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      status: 429,
      message: 'Too many requests to this specific endpoint, please try again later.',
    });
  },
});

export default rateLimiter;