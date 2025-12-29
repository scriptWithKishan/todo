import { useNavigate } from "react-router"

import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

const NotFound = () => {
  let navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-[150px] font-extrabold">404</h1>
      <h2 className="text-4xl font-bold">Route Not Found</h2>
      <p className="text-xl">Navigate back to home page</p>
      <Button onClick={() => navigate("/")} className="flex items-center gap-x-2">
        Home
        <ArrowRight />
      </Button>
    </div>
  )
}

export default NotFound