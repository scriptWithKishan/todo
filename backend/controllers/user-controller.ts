import { type Request, type Response } from "express"

import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/user-model.ts"

export const userRegister = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already exists"
      })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    await User.create({
      username,
      email,
      password: hashedPassword
    })

    return res.status(200).json({
      success: true,
      message: "User created successfully"
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

export const userLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const secretKey = process.env.JWT_SECRET || "MY_SECRET_KEY"

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials!"
      })
    }

    const comparedPassword = await bcryptjs.compare(password, user.password || "")

    if (!comparedPassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials!"
      })
    }

    const token = jwt.sign({ userId: user?._id }, secretKey, { expiresIn: '7d' })

    return res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      token
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}