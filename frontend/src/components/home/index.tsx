import Cookies from "js-cookie"
import { Button } from "../ui/button"
import { useNavigate } from "react-router"

const Home = () => {
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove('token')
    navigate('/auth'

    )
  }

  return (
    <div className="min-h-screen">
      <h1>This is home page</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}

export default Home