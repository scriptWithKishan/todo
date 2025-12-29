import { type Request, type Response } from "express"
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

    await User.create({
      username,
      email,
      password
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