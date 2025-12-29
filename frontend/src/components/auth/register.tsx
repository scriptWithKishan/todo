import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from "./schema"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button'
import { register } from '@/actions/auth-action'
import { useState } from 'react'
import { FormError, FormSuccess } from '../form-message'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'

export const Register = () => {
  const [error, setError] = useState<string | "">("")
  const [success, setSuccess] = useState<string | "">("")
  const [showPassword, setShowPassword] = useState<boolean>(false)


  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const response = await register(values)
      setError("")
      setSuccess(response)
      form.reset()
    } catch (err: any) {
      setSuccess("")
      setError(err.message)
    }
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }


  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input required type="email" {...field} className="focus-visible:ring-0 focus-visible:border-input" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input required {...field} className="focus-visible:ring-0 focus-visible:border-input" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input required type={showPassword ? 'text' : 'password'} {...field} className="focus-visible:ring-0 focus-visible:border-input" />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-2">
          <Switch onCheckedChange={togglePassword} id="show-password" />
          <Label htmlFor='show-password'>Show password</Label>
        </div>
        {error && <FormError text={error} />}
        {success && <FormSuccess text={success} />}
        <Button type="submit">Sign up</Button>
      </form>
    </Form>
  )
}