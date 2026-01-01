import { type Request, type Response } from 'express'
import Todo from '../models/todo-model.ts'

export const getTodo = async (req: Request, res: Response) => {
  try {
    const { range, status } = req.query
    const userId = (req as any).user._id

    const query: any = { user: userId }

    if (range && typeof range === 'string') {
      const [fromStr, toStr] = range.split("_") as [string, string]

      const from = new Date(fromStr)
      const to = new Date(toStr)

      from.setHours(0, 0, 0, 0)
      from.setDate(from.getDate() + 1)
      to.setHours(23, 59, 59, 999)
      to.setDate(to.getDate() + 1)

      if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
        query.createdAt = {
          $gte: from,
          $lte: to
        }
      }
    }

    if (status === 'completed') {
      query.checked = true
    } else if (status === 'pending') {
      query.checked = false
    }

    const data = await Todo.find(query).sort({ createdAt: -1 })

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