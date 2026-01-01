import { Separator } from '@/components/ui/separator'

import { Navbar } from "./navbar"
import { TodoFilter } from './todo-filter'
import { useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'
import { getTodos } from '@/actions/todo-action'
import { AddTodo } from './add-todo'
import { EachTodo } from './each-todo'

type TodoFilterValue = {
  range?: { from?: Date; to?: Date }
  status?: "completed" | "pending"
}

type TodoType = {
  _id: string,
  todo: string,
  checked: boolean,
  createdAt: Date
}

const Home = () => {
  const [todos, setTodos] = useState<TodoType[] | null>([])
  const [error, setError] = useState("")

  const [searchParams, setSearchParams] = useSearchParams()

  const getTodosFunction = async () => {
    try {
      const result = await getTodos(searchParams.toString())
      setTodos(result)
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    getTodosFunction()
  }, [])

  const handleFileterChange = (filters: TodoFilterValue) => {
    const params = new URLSearchParams()

    if (filters.range?.from && filters.range?.to) {
      params.set(
        "range",
        `${filters.range.from.toISOString()}_${filters.range.to.toISOString()}`
      )
    }

    if (filters.status) {
      params.set('status', filters.status)
    }

    setSearchParams(params)
  }

  const handleClearFilter = () => {
    setSearchParams({})
  }

  return (
    <div className="min-h-screen w-full p-4">
      <Navbar />
      <div className='flex gap-x-2 p-4'>
        <TodoFilter onSubmit={getTodosFunction} onClear={handleClearFilter} onChange={handleFileterChange} />
        <Separator orientation='vertical' />
        <div className='w-full'>
          <AddTodo refresh={getTodosFunction} />
          {!todos || todos.length === 0 ? (
            <div className='mt-4'>
              <h1 className='text-4xl text-center font-medium'>No Todos found</h1>
            </div>
          ) : (
            <div className='flex flex-col mt-6 gap-4'>
              {
                todos.map((eachEle) => (
                  <EachTodo key={eachEle._id} details={eachEle} />
                ))}
            </div>
          )
          }
          {error && <p className='text-center font-red-500'>{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default Home