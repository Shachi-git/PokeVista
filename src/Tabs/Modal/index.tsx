import { Button, Header } from 'react-aria-components'
import { SignInForm } from './SignInForm'
import { HiOutlineBolt } from 'react-icons/hi2'
import { useState } from 'react'
import { SignUpForm } from './SignUp'

export const SignIn = () => {
  const [signUp, setSignUpForm] = useState(false)
  const handleModal = () => {
    setSignUpForm(!signUp)
  }

  return (
    <div
      className="bg-gradient-to-br from-amber-100 via-blue-100 to-amber-200
      min-h-screen flex flex-col justify-center items-center"
    >
      <Header className="flex">
        <div className="p-1 inline rounded-full bg-gradient-to-b mr-2 from-orange-200 via-orange-300 to-amber-300">
          <HiOutlineBolt
            className="text-3xl text-amber-500 text-center"
            aria-hidden="true"
          />
        </div>
        <h2 className="bg-gradient-to-b text-center from-orange-500 w-full to-amber-400 bg-clip-text text-transparent text-3xl font-bold inline">
          PokeVista
        </h2>
      </Header>
      <main className="px-20 py-14 bg-gradient-to-tr from-white via-amber-100 to-amber-200 shadow-lg rounded-lg mt-5">
        <h2 className="text-2xl font-semibold text-center">
          {signUp ? 'Create Account' : 'Sign In'}
        </h2>
        {signUp ? <SignUpForm /> : <SignInForm />}
        <p className="text-sm font-light mt-5 text-center">
          {signUp ? 'Already have an account?' : 'Do not have an account?'}
        </p>
        <Button
          className="bg-gradient-to-r text-base from-orange-600 w-full to-amber-500 bg-clip-text text-transparent rounded-md hover:underline hover:text-orange-700 hover:scale-100"
          type="button"
          onClick={handleModal}
        >
          {signUp ? 'Sign in here' : 'Sign up here'}
        </Button>
      </main>
      <footer className="mt-5 mb-10">
        <p className="font-light text-sm">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </footer>
    </div>
  )
}
