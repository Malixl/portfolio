import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Reusable search bar component for filtering content by title.
 * Matches the portfolio's design language with glass-morphism and subtle animations.
 * 
 * @param {string} value - Current search query
 * @param {function} onChange - Callback when query changes
 * @param {string} placeholder - Input placeholder text
 * @param {number} resultCount - Number of filtered results to display
 * @param {number} totalCount - Total number of items
 */
export default function SearchBar({ value, onChange, placeholder = 'Search...', resultCount, totalCount }) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  const hasQuery = value.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-8"
    >
      <div 
        className={`
          relative flex items-center gap-3 px-4 py-3 rounded-xl
          bg-gray-50 dark:bg-white/[0.03]
          border transition-all duration-300
          ${focused 
            ? 'border-purple-400 dark:border-purple-500/40 shadow-lg shadow-purple-500/5' 
            : 'border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/10'
          }
        `}
      >
        <Search 
          size={18} 
          className={`shrink-0 transition-colors duration-200 ${
            focused ? 'text-purple-500' : 'text-gray-400 dark:text-white/30'
          }`} 
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-white/25 outline-none"
        />

        {/* Clear button */}
        <AnimatePresence>
          {hasQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => { onChange(''); inputRef.current?.focus() }}
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              <X size={14} className="text-gray-400 dark:text-white/40" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Result count indicator */}
      <AnimatePresence>
        {hasQuery && resultCount !== undefined && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-gray-400 dark:text-white/30 mt-2 ml-1"
          >
            {resultCount === 0 
              ? 'No results found' 
              : `Showing ${resultCount} of ${totalCount} items`
            }
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
