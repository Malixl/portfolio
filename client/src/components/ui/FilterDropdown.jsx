import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Filter, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Reusable filter dropdown component.
 * Matches the portfolio's design language with glass-morphism and subtle animations.
 *
 * @param {string} value - Currently selected filter value ('' = all)
 * @param {function} onChange - Callback when selection changes
 * @param {Array<string>} options - List of filter options
 * @param {string} label - Label shown when nothing is selected
 */
export default function FilterDropdown({ value, onChange, options = [], label = 'Category' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const displayText = value || `All ${label}s`

  if (!options.length) return null

  return (
    <div ref={ref} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-2.5 px-4 py-3 rounded-xl
          bg-gray-50 dark:bg-white/[0.03]
          border transition-all duration-300 text-sm whitespace-nowrap
          ${open
            ? 'border-purple-400 dark:border-purple-500/40 shadow-lg shadow-purple-500/5'
            : 'border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/10'
          }
        `}
      >
        <Filter
          size={16}
          className={`shrink-0 transition-colors duration-200 ${
            open || value ? 'text-purple-500' : 'text-gray-400 dark:text-white/30'
          }`}
        />
        <span className={`${value ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-white/25'}`}>
          {displayText}
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-gray-400 dark:text-white/30 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 md:left-0 mt-2 z-50 w-56 py-1.5 rounded-xl
              bg-white dark:bg-[#0a0a0a]
              border border-gray-200 dark:border-white/[0.08]
              shadow-xl shadow-black/10 dark:shadow-black/40
              backdrop-blur-xl overflow-hidden"
          >
            {/* "All" option */}
            <button
              onClick={() => { onChange(''); setOpen(false) }}
              className={`
                w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors
                ${!value
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10'
                  : 'text-gray-600 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5'
                }
              `}
            >
              <span className="font-medium">All {label}s</span>
              {!value && <Check size={14} className="text-purple-500" />}
            </button>

            {/* Divider */}
            <div className="h-px bg-gray-100 dark:bg-white/[0.06] mx-3 my-1" />

            {/* Options */}
            <div className="max-h-52 overflow-y-auto no-scrollbar">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false) }}
                  className={`
                    w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors
                    ${value === opt
                      ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10'
                      : 'text-gray-600 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5'
                    }
                  `}
                >
                  <span className="font-medium">{opt}</span>
                  {value === opt && <Check size={14} className="text-purple-500" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
