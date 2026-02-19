import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

/**
 * Reusable confirmation dialog to replace native window.confirm().
 * 
 * Props:
 *   isOpen      — whether the dialog is visible
 *   onClose     — callback to close without action
 *   onConfirm   — callback when user confirms the action
 *   title       — dialog title (default: "Confirm Delete")
 *   message     — dialog body text
 *   confirmText — confirm button label (default: "Delete")
 *   variant     — "danger" | "warning" (default: "danger")
 */
export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Delete',
  message = 'Are you sure? This action cannot be undone.',
  confirmText = 'Delete',
  variant = 'danger',
}) {
  const colors = variant === 'danger'
    ? { bg: 'bg-red-50 dark:bg-red-500/10', icon: 'text-red-500', btn: 'bg-red-600 hover:bg-red-500 focus:ring-red-500/30' }
    : { bg: 'bg-amber-50 dark:bg-amber-500/10', icon: 'text-amber-500', btn: 'bg-amber-600 hover:bg-amber-500 focus:ring-amber-500/30' }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          {/* Dialog */}
          <motion.div
            className="relative w-[90vw] max-w-sm bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl dark:shadow-none overflow-hidden"
            initial={{ y: 20, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X size={14} className="text-gray-500 dark:text-white/50" />
            </button>

            <div className="p-6 text-center">
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mx-auto mb-4`}>
                <AlertTriangle size={24} className={colors.icon} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h3>

              {/* Message */}
              <p className="text-sm text-gray-500 dark:text-white/40 leading-relaxed">
                {message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-white/60 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { onConfirm(); onClose() }}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white ${colors.btn} transition-colors focus:outline-none focus:ring-2`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
