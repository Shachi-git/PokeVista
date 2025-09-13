import {
  useContext,
  useState,
  useEffect,
  createContext,
  type ReactNode,
} from 'react'
import { account } from '../lib/appwrite'
import { useNavigate } from 'react-router-dom'
import { ID } from 'appwrite'

interface AuthContextType {
  user: any
  loginUser: (userInfo: any) => void
  logoutUser: () => void
  registerUser: (userInfo: any) => void
  checkUserStatus: () => void
}
const AuthContext = createContext<AuthContextType>({
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
  registerUser: () => {},
  checkUserStatus: () => {},
})
interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    checkUserStatus()
  }, [])

  const loginUser = async (userInfo: { email: string; password: string }) => {
    try {
      // Step 1: Log the user in (create a new session)
      const session = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      )

      // Step 2: Get user info now that they're authenticated
      const userDetails = await account.get()

      // Step 3: Store user data in your context
      setUser({
        id: userDetails.$id,
        name: userDetails.name,
        email: userDetails.email,
      })
    } catch (error) {
      alert(
        'Login failed: ' +
          (error instanceof Error
            ? error.message
            : 'An unknown error occurred.')
      )
    }
  }

  const logoutUser = () => {
    account.deleteSessions()
    setUser(null)
  }

  const registerUser = async (userInfo: any) => {
    setLoading(true)

    console.log('User Info:', userInfo)

    try {
      // Validate email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(userInfo.email)) {
        throw new Error('Invalid email format')
      }

      // Validate password strength
      const passwordPattern =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,256}$/
      console.log('Validating password:', userInfo.password)
      console.log('Password length:', userInfo.password.length)
      if (!passwordPattern.test(userInfo.password)) {
        throw new Error(
          'Password must contain uppercase, lowercase, number, and special character.'
        )
      }

      // Validate password length
      if (userInfo.password.length < 8 || userInfo.password.length > 256) {
        throw new Error('Password must be between 8 and 256 characters long.')
      }

      // Create the user
      let response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.name
      )

      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      )

      let accountDetails = await account.get()
      setUser(accountDetails)
    } catch (error) {
      console.error('Error creating user:', error)
      alert('Registration failed: ' + error)
    }

    setLoading(false)
  }

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get()
      setUser(accountDetails)
    } catch (error) {
      setUser(null) // Not logged in or session expired
    } finally {
      setLoading(false)
    }
  }

  const contextData: AuthContextType = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    checkUserStatus,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
