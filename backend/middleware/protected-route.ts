import { type Request, type Response, type NextFunction } from "express"

import jwt from "jsonwebtoken"
import User from "../models/user-model.ts"

export const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    const secretKey = process.env.JWT_SECRET || "MY_SECRET_KEY"

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized token, access denied"
      })
    }

    const decoded = jwt.verify(token, secretKey) as { userId: string }

    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      })
    }

    (req as any).user = user
    next()
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: `Token is not valid, ${err.message}`
    })
  }
}