import { FaRegUser } from 'react-icons/fa6'
import { FaLock } from 'react-icons/fa6'
import { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Label } from 'react-aria-components'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../utils/AuthContext'

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { user, loginUser } = useAuth()
  const loginForm = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (user) {
      navigate('/homepage')
    }
  })
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault()

    if (!loginForm.current) {
      console.error('Form reference is null')
      return
    }

    const email = loginForm.current?.email?.value
    const password = loginForm.current?.password?.value

    const userInfo = { email, password }
    loginUser(userInfo)
  }

  return (
    <Form onSubmit={handleLogIn} ref={loginForm}>
      <Label htmlFor="email" className="block mb-1 text-base font-semibold">
        Email
      </Label>
      <div className="flex border-gray-400 items-center pr-10 border mb-1 bg-white px-3 rounded-md shadow-md max-w-lg w-full focus-within:ring-2 focus-within:ring-black">
        <FaRegUser className="text-gray-400 text-sm" />

        <Input
          type="email"
          name="email"
          id="email"
          placeholder="trainer@pokevista.com"
          required
          className="p-3 w-full rounded-md focus:outline-none text-sm"
        />
      </div>
      <p className="text-sm font-light mb-4">
        We'll never share your email with anyone else
      </p>
      <Label htmlFor="password" className="block mb-1 text-base font-semibold">
        Password
      </Label>
      <div className="flex border-gray-400 items-center border mb-1 bg-white px-3 rounded-md shadow-md max-w-lg w-full focus-within:ring-2 focus-within:ring-black">
        <FaLock className="text-gray-400 text-sm" />

        <Input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          className="p-3 w-full flex-grow rounded-md focus:outline-none text-sm h-12"
        />
        <Button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-orange-500 px-4 py-2 h-12 flex min-w-18  items-center justify-center"
        >
          {showPassword ? 'Hide' : 'Show'}
        </Button>
      </div>
      <p className="text-sm font-light mb-4">Enter your password</p>
      <Button
        className="bg-gradient-to-b font-semibold from-orange-400 w-full to-amber-300 text-white px-4 py-2 rounded-md hover:from-orange-500 hover:to-amber-400 "
        type="submit"
        onClick={handleLogIn}
      >
        Login
      </Button>
    </Form>
  )
}
