import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import toast from 'react-hot-toast'
import { Loader2, Lock, Sun, Moon } from 'lucide-react'

export default function Login() {
  const { login, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Already logged in
  if (user) return <Navigate to="/admin" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(username, password)
      navigate('/admin')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center transition-colors duration-300">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/5 transition-all"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="w-full max-w-sm bg-white dark:bg-transparent p-8 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-none transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 dark:bg-purple-500/15 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Sign in to manage your portfolio</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-white/20"
              placeholder="Enter username"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-white/20"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 dark:shadow-none"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Signing in...</>
            ) : 'Sign In'}
          </button>
        </form>

       
      </div>
    </div>
  )
}
