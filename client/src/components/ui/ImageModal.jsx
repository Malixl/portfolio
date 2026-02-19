import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function ImageModal({ isOpen, onClose, imageSrc, altText }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-zoom-out"
          />

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={24} />
          </motion.button>

          {/* Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-[105] max-w-full max-h-full overflow-hidden rounded-lg shadow-2xl"
          >
            <img
              src={imageSrc}
              alt={altText}
              className="max-w-full max-h-[90vh] object-contain select-none"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
