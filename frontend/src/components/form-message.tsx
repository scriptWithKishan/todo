import { CheckCircle2, TriangleAlert } from "lucide-react"

interface FormMessageProps {
  text?: string
}

export const FormSuccess = ({ text }: FormMessageProps) => {
  return (
    <div className="w-full rounded-md bg-emerald-300 flex items-center px-4 py-2 gap-x-4">
      <CheckCircle2 />
      <p className="font-bold">{text}</p>
    </div>
  )
}

export const FormError = ({ text }: FormMessageProps) => {
  return (
    <div className="w-full rounded-md bg-rose-400 flex items-center px-4 py-2 gap-x-4">
      <TriangleAlert />
      <p className="font-bold">{text}</p>
    </div>
  )
}