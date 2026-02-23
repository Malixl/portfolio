import { useState, useEffect } from 'react'
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, Gamepad2, Briefcase, GraduationCap, Award, BookOpen, User, LogOut, Loader2, ShieldCheck, Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/skills', label: 'Skills', icon: Gamepad2 },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase },
  { to: '/admin/education', label: 'Education', icon: GraduationCap },
  { to: '/admin/blogs', label: 'Blogs', icon: BookOpen },
  { to: '/admin/achievements', label: 'Certificates', icon: Award },
  { to: '/admin/profile', label: 'Profile', icon: User },
]

export default function AdminLayout() {
  const { user, logout, loading } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('adminSidebarCollapsed') === 'true'
  })

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('adminSidebarCollapsed', newState)
  }

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  if (loading) {
    return (
      <div className="h-screen w-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-500 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <div className="h-screen w-screen bg-gray-50 dark:bg-[#0a0a0a] flex overflow-hidden transition-colors duration-300">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 h-16 bg-white dark:bg-[#0d0d0d] border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-500 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-gray-900 dark:text-white">Admin Panel</span>
        </div>
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/5 transition-all"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 bg-white dark:bg-[#0d0d0d] border-r border-gray-200 dark:border-white/5 flex flex-col transition-all duration-300 transform 
        ${isCollapsed ? 'md:w-20' : 'md:w-64'}
        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo & Close Button */}
        <div className={`
          border-b border-gray-200 dark:border-white/5 flex flex-col md:flex-row transition-all duration-300
          ${isCollapsed ? 'px-0 py-4 justify-center items-center h-auto' : 'px-6 py-5 justify-between items-center h-16 md:h-auto'}
        `}>
          {!isCollapsed && (
            <div className="hidden md:block">
              <h1 className="text-lg font-bold gradient-text">Lix Portfolio</h1>
              <p className="text-gray-500 dark:text-white/30 text-xs mt-0.5">Welcome, {user.username}</p>
            </div>
          )}
          
          {/* Mobile Branding (always visible on small screens when sidebar is open) */}
          <div className="md:hidden">
            <h1 className="text-lg font-bold gradient-text">Lix Portfolio</h1>
          </div>
          
          <div className={`flex items-center gap-2 ${isCollapsed ? 'flex-col space-y-3 w-full justify-center' : ''}`}>
            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden md:block p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/5 transition-all"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Sidebar Toggle (Desktop) */}
            <button
              onClick={toggleSidebar}
              className="hidden md:flex p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/5 transition-all"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Menu size={18} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Mobile Close Button */}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 -mr-2 text-gray-500 dark:text-white/50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400 font-medium'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/50 dark:hover:text-white/80 dark:hover:bg-white/5'
                } ${isCollapsed ? 'md:justify-center md:px-0' : ''}`
              }
              title={isCollapsed ? label : ''}
            >
              <div className={`${isCollapsed ? 'md:w-full md:flex md:justify-center' : ''}`}>
                <Icon size={18} className="shrink-0" />
              </div>
              {!isCollapsed && <span className="truncate">{label}</span>}
              {isCollapsed && <span className="md:hidden">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-200 dark:border-white/5">
          <button
            onClick={logout}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500/80 hover:text-red-600 hover:bg-red-500/10 dark:text-red-400/70 dark:hover:text-red-400 dark:hover:bg-red-500/10 transition-all duration-200 w-full ${isCollapsed ? 'md:justify-center md:px-0' : ''}`}
            title={isCollapsed ? "Logout" : ""}
          >
            <div className={`${isCollapsed ? 'md:w-full md:flex md:justify-center' : ''}`}>
              <LogOut size={18} className="shrink-0" />
            </div>
            {!isCollapsed && <span>Logout</span>}
            {isCollapsed && <span className="md:hidden">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pt-16 md:pt-0 bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
