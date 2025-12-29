import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Login } from "./login"
import { Register } from "./register"

import Cookies from 'js-cookie'
import { Navigate } from "react-router"

const Auth = () => {
  const token = Cookies.get('token')

  if (token) {
    return <Navigate to="/" />
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login to your account to access your Todos.</CardDescription>
              </CardHeader>
              <CardContent>
                <Login />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>Sign up to create a new account for you todos.</CardDescription>
              </CardHeader>
              <CardContent>
                <Register />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }
}

export default Auth