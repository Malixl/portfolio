import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { Section, SectionTitle } from './Section'
import { fadeUp, staggerContainer } from '../../utils/animations'

import { getOptimizedImageUrl, getGDriveFallbackUrl } from '../../utils/imageUtils'

export default function Education({ data }) {
  if (!data?.length) return null

  return (
    <Section id="education">
      <SectionTitle sub="Academic background">Education</SectionTitle>
      <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-4">
        {data.map((edu) => (
          <motion.div
            key={edu._id}
            variants={fadeUp}
            className="bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] backdrop-blur-xl rounded-2xl p-6 border-l-4 !border-l-yellow-400 dark:!border-l-yellow-500/50 hover:!border-l-yellow-500 dark:hover:!border-l-yellow-400/70 transition-colors duration-300"
          >
            <div className="mb-4">
               {edu.image ? (
                 <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/10 p-1 border border-gray-100 dark:border-white/5 overflow-hidden">
                    <img 
                      src={getOptimizedImageUrl(edu.image)} 
                      alt={edu.institution}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const fallback = getGDriveFallbackUrl(edu.image)
                        if (fallback && e.target.src !== fallback) {
                          e.target.src = fallback
                        } else {
                          e.target.style.display = 'none'
                        }
                      }}
                    />
                 </div>
               ) : (
                 <GraduationCap size={28} className="text-yellow-500 dark:text-yellow-400" />
               )}
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
            <p className="text-yellow-600 dark:text-yellow-400/80 text-sm font-medium">{edu.institution}</p>
            {edu.field && <p className="text-gray-400 dark:text-white/40 text-xs mt-1">{edu.field}</p>}
            {edu.period && <p className="text-gray-400 dark:text-white/30 text-xs mt-1 font-mono">{edu.period}</p>}
            {edu.description && <p className="text-gray-500 dark:text-white/50 text-sm mt-3">{edu.description}</p>}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
