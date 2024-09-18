import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/User";
import { JwtConfig } from "../config/appConfig";
import { authtype, usertype } from "../types/auth";
import { GoogleAuthClient } from "../services/GoogleAuthClient";
import GAuthUser from "../models/GoogleAuth";
import { GoogleAuthUser } from "../types/gauth";

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JwtConfig.key, {
      expiresIn: "30d",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function signup(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function gauth(req: Request, res: Response) {
  const { token } = req.body;

  try {
    const ticket = await GoogleAuthClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send("Unable to get user information from token");
    }

    const { sub: googleId, name, email, picture } = payload as authtype;
    if (!googleId) return res.status(400).send("Unable to get user information");

    let user = (await GAuthUser.findOne({ email })) as GoogleAuthUser;
    
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' }
    );

    if (user) {
      return res.status(200).json({
        message: "Sign-in successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
        },
        token: jwtToken,
      });
    } else {
      const newuser = await GAuthUser.create({
        googleId,
        name,
        email,
        picture,
      });

      await newuser.save();

      return res.status(201).json({
        message: "Sign-up successful",
        user: { id: newuser._id, email: newuser.email },
        token: jwtToken,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid token" });
  }
}