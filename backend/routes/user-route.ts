import express from "express"
import { userRegister, userLogin } from "../controllers/user-controller.ts"

const UserRouter = express.Router()

UserRouter.post('/register', userRegister)
UserRouter.post('/login', userLogin)

export default UserRouter