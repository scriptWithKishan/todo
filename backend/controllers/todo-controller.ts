import { type Request, type Response } from 'express'
import Todo from '../models/todo-model.ts'

export const getTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id

    const data = await Todo.find({ user: userId })

    return res.status(200).json({
      success: true,
      message: 'Todo data fetched successfully',
      data
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

export const postTodo = async (req: Request, res: Response) => {
  try {
    const { todo } = req.body
    const userId = (req as any).user._id

    if (!todo || todo === "") {
      return res.status(400).json({
        success: false,
        message: 'Todo is empty'
      })
    }

    await Todo.create({
      todo,
      user: userId
    })

    return res.status(200).json({
      success: true,
      message: 'Todo created successfully'
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}