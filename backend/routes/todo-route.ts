import express from 'express'
import { protectedRoute } from '../middleware/protected-route.ts'
import { getTodo, postTodo } from '../controllers/todo-controller.ts'

const TodoRouter = express.Router()

TodoRouter.get('/', protectedRoute, getTodo)
TodoRouter.post('/', protectedRoute, postTodo)

export default TodoRouter