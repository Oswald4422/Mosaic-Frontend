import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { auth } from '../utils/api'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const response = await auth.getCurrentUser()
        setUser(response.data)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await auth.login({ email, password })
      const { token, user: userData } = response.data
      localStorage.setItem('token', token)
      setUser(userData)
      toast.success('Successfully logged in!')
      
      // Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/events')
      }
      
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      setError(message)
      return { success: false, message }
    }
  }

  const register = async (userData) => {
    try {
      const response = await auth.register(userData)
      const { token, user: newUser } = response.data
      localStorage.setItem('token', token)
      setUser({
        ...newUser,
        preferences: newUser.preferences || []
      })
      toast.success('Registration successful!')
      
      // Redirect based on role
      if (newUser.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/profile')
      }
      
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      setError(message)
      return { success: false, message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
    toast.success('Successfully logged out!')
  }

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      login,
      logout,
      register,
      error,
      isAdmin: user?.role === 'admin',
      isAuthenticated: !!user
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
