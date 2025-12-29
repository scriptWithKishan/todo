import axios from 'axios'
import Cookies from 'js-cookie'

const apiUrl = import.meta.env.VITE_API_URL

interface RegisterProps {
  username: string,
  password: string,
  email: string,
}

interface LoginProps {
  username: string,
  password: string,
}

export const register = async ({
  username,
  password,
  email
}: RegisterProps) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, {
      username,
      password,
      email
    })

    const data = response.data.message

    return data

  } catch (err: any) {
    throw new Error(err.response.data.message)
  }
}

export const login = async ({
  username,
  password
}: LoginProps) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, {
      username,
      password
    })

    const token = response.data.token

    Cookies.set('token', token, { expires: 7 })

  } catch (err: any) {
    throw new Error(err.response.data.message)
  }
}