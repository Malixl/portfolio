import { useTheme } from '../../context/ThemeContext'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Home, User, Sun, Moon, Mail } from 'lucide-react'

const NAV_ITEMS = [
  { id: '/', label: 'Home', icon: Home },
  { id: '/about', label: 'About', icon: User },
  { id: '/experience', label: 'Experience', icon: Briefcase },
  { id: '/contact', label: 'Contact', icon: Mail },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto">
        <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-full border border-gray-200/50 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-black/50 px-2 py-2 flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.id
            const Icon = item.icon
            return (
              <Link
                key={item.id}
                to={item.id}
                className={`relative flex flex-col items-center justify-center w-16 h-14 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-purple-100 dark:bg-purple-500/15 rounded-3xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <Icon size={20} className="relative z-10 mb-0.5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="relative z-10 text-[9px] font-bold tracking-wide leading-none opacity-80">
                  {item.label}
                </span>
              </Link>
            )
          })}

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200 dark:bg-white/10 mx-1" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center justify-center w-14 h-14 rounded-full text-gray-400 dark:text-white/40 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 group"
            aria-label="Toggle theme"
          >
            <div className="relative w-5 h-5 mb-0.5">
               <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div 
                    key="sun" 
                    initial={{ scale: 0.5, opacity: 0, rotate: -90 }} 
                    animate={{ scale: 1, opacity: 1, rotate: 0 }} 
                    exit={{ scale: 0.5, opacity: 0, rotate: 90 }} 
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Sun size={20} />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="moon" 
                    initial={{ scale: 0.5, opacity: 0, rotate: 90 }} 
                    animate={{ scale: 1, opacity: 1, rotate: 0 }} 
                    exit={{ scale: 0.5, opacity: 0, rotate: -90 }} 
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Moon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[9px] font-semibold tracking-wide leading-none opacity-60 group-hover:opacity-100 transition-opacity">
              Theme
            </span>
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
