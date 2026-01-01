import { z } from 'zod'

export const todoSchema = z.object({
  todo: z.string(),
})