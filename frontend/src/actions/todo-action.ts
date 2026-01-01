import axios from "axios"
import Cookies from "js-cookie"

const apiUrl = import.meta.env.VITE_API_URL

export const getTodos = async (query: string) => {
  try {
    const token = Cookies.get('token')

    const response = await axios.get(`${apiUrl}/todo/?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = response.data.data

    return data
  } catch (err: any) {
    throw new Error(err.response.data.message)
  }
}

interface PostTodoProps {
  todo: string
}

export const postTodo = async ({ todo }: PostTodoProps) => {
  try {
    const token = Cookies.get('token')

    const response = await axios.post(`${apiUrl}/todo`, {
      todo
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = response.data.message

    return data
  } catch (err: any) {
    throw new Error(err.response.data.message)
  }
}