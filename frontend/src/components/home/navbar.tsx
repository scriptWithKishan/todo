import Cookies from "js-cookie"
import { useNavigate } from "react-router"

import { Button } from '@/components/ui/button'

export const Navbar = () => {
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove('token')
    navigate('/auth'
    )
  }

  return (
    <div className="flex items-center justify-between p-4 bg-black rounded-lg">
      <h1 className="text-4xl font-bold text-white">TODO</h1>
      <Button className="border-white border-1 bg-transparent text-white" onClick={logout}>
        Logout
      </Button>
    </div>
  )
}