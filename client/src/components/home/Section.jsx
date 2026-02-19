import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../utils/animations'

export function Section({ children, id, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={`py-16 md:py-28 px-4 md:px-6 max-w-6xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  )
}

export function SectionTitle({ children, sub }) {
  return (
    <motion.div variants={fadeUp} className="mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {children}
      </h2>
      {sub && <p className="text-gray-500 dark:text-white/40 mt-2 text-lg">{sub}</p>}
      <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4" />
    </motion.div>
  )
}
