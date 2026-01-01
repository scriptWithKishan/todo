import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem
} from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { todoSchema } from "./schema"

import { PlusIcon } from "lucide-react"
import { postTodo } from "@/actions/todo-action"
import { FormError, FormSuccess } from "../form-message"

export const AddTodo = ({ refresh }: { refresh: () => void }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      todo: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof todoSchema>) => {
    console.log("submit called")
    try {
      const response = await postTodo(values)
      setError("")
      setSuccess(response)
      refresh()
      form.reset()
    } catch (err: any) {
      setSuccess("")
      setError(err.message)
    }
  }

  return (
    <Dialog >
      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button className="border-black" variant='outline'>
            <PlusIcon />
            Add Todo
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle>Add Todos</DialogTitle>
          <DialogDescription>Enter your todo and submit</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="todo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {error && <FormError text={error} />}
            {success && <FormSuccess text={success} />}
            <Button type="submit">Submit</Button>
          </form>
        </Form >
      </DialogContent>
    </Dialog >
  )
}