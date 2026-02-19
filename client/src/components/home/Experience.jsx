import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { Section, SectionTitle } from './Section'
import { fadeUp } from '../../utils/animations'

import { getOptimizedImageUrl, getGDriveFallbackUrl } from '../../utils/imageUtils'

const card = 'bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] backdrop-blur-xl rounded-2xl p-6 hover:border-blue-300 dark:hover:border-blue-500/20 transition-colors duration-300'

export default function Experience({ data }) {
  if (!data?.length) return null

  return (
    <Section id="experience">
      <SectionTitle sub="My journey so far">Career</SectionTitle>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10 hidden md:block" />

        <div className="space-y-6">
          {data.map((exp) => (
            <motion.div key={exp._id} variants={fadeUp} className="relative md:pl-10">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-500/20 border-2 border-blue-400 dark:border-blue-500/50 hidden md:flex items-center justify-center">
                <Briefcase size={12} className="text-blue-500 dark:text-blue-400" />
              </div>

              <div className={card}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-4">
                     {exp.image && (
                       <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/10 p-1 border border-gray-100 dark:border-white/5 overflow-hidden shrink-0">
                         <img 
                           src={getOptimizedImageUrl(exp.image)} 
                           alt={exp.company}
                           className="w-full h-full object-contain"
                           onError={(e) => {
                             const fallback = getGDriveFallbackUrl(exp.image)
                             if (fallback && e.target.src !== fallback) {
                               e.target.src = fallback
                             } else {
                               e.target.style.display = 'none'
                             }
                           }}
                         />
                       </div>
                     )}
                     <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                        <p className="text-blue-500 dark:text-blue-400 text-sm font-medium">{exp.company}</p>
                     </div>
                  </div>
                  <span className="text-gray-400 dark:text-white/30 text-xs font-mono whitespace-nowrap mt-1">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
