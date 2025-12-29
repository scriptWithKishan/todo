import express from "express"
import { userRegister } from "../controllers/user-controller.ts"

const UserRouter = express.Router()

UserRouter.post('/register', userRegister)

export default UserRouter