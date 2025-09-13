import { FaRegUser } from 'react-icons/fa6'
import { FaLock } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import { Button, Form, Input, Label } from 'react-aria-components'
import { useAuth } from '../../../utils/AuthContext'
import { useNavigate } from 'react-router-dom'

export const SignUpForm = () => {
  const [myPassword, setMyPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setConfirmShowPassword] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const { registerUser, user } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    console.log('File Name:', selectedPhoto)

    const name = (form.elements.namedItem('name') as HTMLInputElement).value // Trainer Name
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    console.log('Captured Name:', name)
    console.log('Captured Email:', email)
    console.log('Captured Password:', myPassword)
    // Password validation
    if (myPassword !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    const userInfo = { name, email, password: myPassword } // Make sure this is correct
    await registerUser(userInfo)
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword)
  }

  const handleUploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (file) {
      setSelectedPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center">
        <Label
          htmlFor="profile"
          className="block mb-2 text-base text-center mt-5 font-semibold"
        >
          Upload a Profile Picture
        </Label>
        <div
          className={`bg-gradient-to-br from-amber-50 via-amber-100 to-orange-100 rounded-full shadow-lg ${
            photoPreview ? 'h-20 w-20' : 'p-8'
          }`}
        >
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Profile Preview"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <FaRegUser className="text-gray-400 text-sm text-center" />
          )}
          <Input
            id="profile"
            type="file"
            accept="image/*"
            onChange={handleUploadPhoto}
            className="hidden"
          />
        </div>
        <Button
          type="button"
          onClick={() => document.getElementById('profile')?.click()}
          className="bg-gradient-to-r from-amber-50 to-orange-100 p-2 px-4 shadow text-base rounded-lg mt-2 font-semibold"
        >
          Upload Photo
        </Button>
      </div>
      <Label
        htmlFor="trainerName"
        className="block mb-2 text-base font-semibold mt-3"
      >
        Trainer Name
      </Label>
      <div className="flex border-gray-400 items-center pr-10 border mb-1 bg-white px-3 rounded-md shadow-md max-w-lg w-full focus-within:ring-2 focus-within:ring-black">
        <FaRegUser className="text-gray-400 text-sm" />
        <Input
          type="text"
          name="name"
          id="trainerName"
          placeholder="Enter your trainer name"
          required
          className="p-3 w-full rounded-md focus:outline-none text-sm"
        />
      </div>
      <p className="text-sm font-light mb-4">Choose a unique trainer name</p>
      <Label htmlFor="email" className="block mb-2 text-base font-semibold">
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
        We'll never share your email with anyone else.
      </p>
      <Label htmlFor="password" className="block mb-2 text-base font-semibold">
        Password
      </Label>
      <div className="flex border-gray-400 items-center border mb-1 bg-white px-3 rounded-md shadow-md max-w-lg w-full focus-within:ring-2 focus-within:ring-black">
        <FaLock className="text-gray-400 text-sm" />
        <Input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder="Enter your password"
          value={myPassword}
          onChange={(e) => setMyPassword(e.target.value)}
          required
          className="p-3 w-full flex-grow rounded-md focus:outline-none text-sm h-12"
        />
        <Button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-orange-500 px-4 py-2 h-12 flex min-w-18 items-center justify-center"
        >
          {showPassword ? 'Hide' : 'Show'}
        </Button>
      </div>
      <p className="text-sm font-light mb-4">
        Password must be at least 8 characters
      </p>
      <Label
        htmlFor="repeatPassword"
        className="block mb-2 text-base font-semibold mt-5"
      >
        Confirm Password
      </Label>
      <div className="flex border-gray-400 items-center border mb-1 bg-white px-3 rounded-md shadow-md max-w-lg w-full focus-within:ring-2 focus-within:ring-black">
        <FaLock className="text-gray-400 text-sm" />
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          name="repeatPassword"
          id="repeatPassword"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="p-3 w-full flex-grow rounded-md focus:outline-none text-sm h-12"
        />
        <Button
          type="button"
          onClick={toggleConfirmPasswordVisibility}
          className="text-orange-500 px-4 py-2 h-12 flex min-w-18 items-center justify-center"
        >
          {showConfirmPassword ? 'Hide' : 'Show'}
        </Button>
      </div>
      <p className="text-sm font-light mb-4">
        Re-enter your password to confirm
      </p>
      <Button
        className="bg-gradient-to-b from-orange-400 w-full to-amber-300 hover:scale-110 text-white text-base px-4 py-2 rounded-md hover:from-orange-500 hover:to-amber-400"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  )
}
