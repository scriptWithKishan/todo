import express, { type Request, type Response } from "express"
import config from "./config/config.ts"
import connect from "./config/db.ts"

const app = express()
app.use(express.json())

// MongoDB connect
connect()

// Routes
import UserRouter from "./routes/user-route.ts"

app.use('/api', UserRouter)

// Not found page
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Page not found" })
})

app.listen(config.port, () => {
  console.log(`Server running in port ${config.port}`)
})