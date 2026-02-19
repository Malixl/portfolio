import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password })
    const { token, _id, username: name } = res.data.data

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify({ _id, username: name }))
    setUser({ _id, username: name })

    toast.success(`Welcome back, ${name}!`)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    toast.success('Logged out')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
