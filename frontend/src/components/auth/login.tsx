import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from "./schema"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button'
import { login } from '@/actions/auth-action'
import { useState } from 'react'
import { FormError } from '../form-message'
import { useNavigate } from 'react-router'
import { Switch } from '@/components/ui/switch'
import { Label } from '../ui/label'

export const Login = () => {
  const [error, setError] = useState<string | "">("")
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const navigate = useNavigate()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await login(values)
      navigate('/')
    } catch (err: any) {
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
        <Button type="submit">Login</Button>
      </form>
    </Form >
  )
}