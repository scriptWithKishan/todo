import { Checkbox } from '@/components/ui/checkbox'

interface EachTodoProps {
  todo: string
  checked: boolean
  createdAt: string
}

export const EachTodo = ({ details }: EachTodoProps) => {
  const { todo, checked, createdAt } = details

  return (
    <div className='w-full rounded-lg shadow-md bg-black flex justify-between items-center p-4 gap-4'>
      <div className="flex items-center gap-4">
        <div className="border-white border-1 w-15 h-15 text-white flex flex-col items-center justify-center">
          <p className="text-xs font-medium">{new Date(createdAt).getDate().toString()}</p>
          <p className="text-xs font-medium">{new Date(createdAt).toLocaleString("en-US", { month: "short" })}</p>
          <p className="text-xs font-medium">{new Date(createdAt).getFullYear().toString()}</p>
        </div>
        <h1 className="text-white">{todo}</h1>
      </div>
      <div>
        <Checkbox className='size-5' />
      </div>
    </div>
  )
}