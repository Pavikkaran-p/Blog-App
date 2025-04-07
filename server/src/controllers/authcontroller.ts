import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/User.model";
import { JwtConfig } from "../config/appConfig";
import { authtype, usertype } from "../types/auth";
import { GoogleAuthClient } from "../services/GoogleAuthClient";
import GAuthUser from "../models/GoogleAuth.model";
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
    console.log(existingUser)
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
    });
    console.log(newUser)
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
    console.log(ticket)
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send("Unable to get user information from token");
    }
    console.log(payload)
    const { sub: googleId, name, email, picture } = payload as authtype;
    if (!googleId || !email) {
      return res.status(400).send("Missing required user information");
    }

    let user = (await GAuthUser.findOne({ email })) as GoogleAuthUser;
    
    console.log(user)
    if (!user) {
      // Create new user if not found
      user = new GAuthUser({
        googleId,
        name,
        email,
        picture,
        blogs: []
      });

      await user.save();
    }

    // Generate JWT after ensuring user exists
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      JwtConfig.key,
      { expiresIn: '30d' }
    );

    return res.status(user._id ? 200 : 201).json({
      message: user._id ? "Sign-in successful" : "Sign-up successful",
      user: {
        // id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
      token: jwtToken,
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid token" });
  }
}
