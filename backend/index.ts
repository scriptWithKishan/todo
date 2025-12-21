import express, { type Request, type Response } from "express"
import config from "./config/config.ts"
import connect from "./config/db.ts"

const app = express()
app.use(express.json())

connect()

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World!"
  })
})

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Page not found" })
})

app.listen(config.port, () => {
  console.log(`Server running in port ${config.port}`)
})