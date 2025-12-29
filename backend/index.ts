import express, { type Request, type Response } from "express"
import config from "./config/config.ts"
import connect from "./config/db.ts"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

// MongoDB connect
connect()

// Routes
import UserRouter from "./routes/user-route.ts"
import TodoRouter from "./routes/todo-route.ts"

app.use('/api/auth', UserRouter)
app.use('/api/todo', TodoRouter)

// Not found page
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Page not found" })
})

app.listen(config.port, () => {
  console.log(`Server running in port ${config.port}`)
})