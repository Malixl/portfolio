import { useState, useRef, useEffect } from 'react'
import { X, Search, ChevronDown } from 'lucide-react'

/**
 * Searchable multi-select dropdown.
 * @param {Object} props
 * @param {{ value: string, label: string }[]} props.options - Available options
 * @param {string[]} props.value - Currently selected values
 * @param {(vals: string[]) => void} props.onChange - Callback with updated array
 * @param {string} [props.placeholder] - Input placeholder
 */
export default function SearchableMultiSelect({
  options = [],
  value = [],
  onChange,
  placeholder = 'Search...',
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

  const filtered = options.filter(
    (opt) =>
      !value.includes(opt.value) &&
      opt.label.toLowerCase().includes(query.toLowerCase())
  )

  const toggleOption = (val) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val))
    } else {
      onChange([...value, val])
      setQuery('')
    }
  }

  const removeItem = (val) => {
    onChange(value.filter((v) => v !== val))
  }

  const selectedLabels = value.map((v) => {
    const opt = options.find((o) => o.value === v)
    return { value: v, label: opt?.label || v }
  })

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="input-field flex items-center justify-between gap-2 text-left min-h-[42px]"
      >
        {selectedLabels.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 py-0.5">
            {selectedLabels.map((item) => (
              <span
                key={item.value}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300 rounded-md text-xs"
              >
                {item.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeItem(item.value)
                  }}
                  className="hover:text-purple-800 dark:hover:text-white transition-colors"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-400 dark:text-white/20">{placeholder}</span>
        )}
        <ChevronDown
          size={14}
          className={`text-gray-400 dark:text-white/30 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-[#141414] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/50">
          {/* Search Input */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 dark:border-white/5">
            <Search size={14} className="text-gray-400 dark:text-white/20 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search..."
              className="w-full bg-transparent text-sm text-gray-900 dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-white/20"
            />
          </div>

          {/* Options List */}
          <div className="max-h-[180px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-xs text-gray-400 dark:text-white/20 text-center">
                {options.length === 0
                  ? 'No data available'
                  : query
                    ? 'No matches found'
                    : 'All options selected'}
              </div>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleOption(opt.value)}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-600 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors"
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
