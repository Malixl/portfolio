import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search } from 'lucide-react'

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  name,
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)
  const inputRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus search input when opened
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  const selected = options.find((o) => o.value === value)

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div ref={ref} className="relative">
      {/* Hidden input for react-hook-form */}
      {name && <input type="hidden" name={name} value={value || ''} />}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="input-field flex items-center justify-between gap-2 text-left"
      >
        <span className={selected ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-white/20'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-400 dark:text-white/30 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-[#141414] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/50">
          {/* Search Input */}
          {(
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 dark:border-white/5">
              <Search size={14} className="text-gray-400 dark:text-white/20 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-sm text-gray-900 dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-white/20"
              />
            </div>
          )}

          {/* Options List */}
          <div className="max-h-[200px] overflow-y-auto">
            {/* Empty option */}
            {!query && (
              <button
                type="button"
                onClick={() => {
                  onChange('')
                  setOpen(false)
                  setQuery('')
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-400 dark:text-white/30 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                {placeholder}
              </button>
            )}

            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-xs text-gray-400 dark:text-white/20 text-center">
                No matches found
              </div>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value)
                    setOpen(false)
                    setQuery('')
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                    value === opt.value
                      ? 'bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300'
                      : 'text-gray-600 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
