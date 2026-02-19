import { motion } from 'framer-motion'
import { FiMapPin } from 'react-icons/fi'
import { Sparkles } from 'lucide-react'
import { Section, SectionTitle } from './Section'
import { fadeUp } from '../../utils/animations'
import { getOptimizedImageUrl } from '../../utils/imageUtils'

const card = 'bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] backdrop-blur-xl rounded-2xl'

export default function About({ profile }) {
  const avatarUrl = getOptimizedImageUrl(profile?.avatar)
  
  return (
    <Section id="about">
      <SectionTitle sub="Who am I?">Profile</SectionTitle>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Bio & Photo */}
        <motion.div variants={fadeUp} className={`md:col-span-2 ${card} p-8`}>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {avatarUrl && (
              <div className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
                <img 
                  src={avatarUrl} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-white/70 leading-relaxed whitespace-pre-wrap text-base">
                {profile?.bio || 'No bio set yet. Add one from the admin panel!'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Info cards */}
        <motion.div variants={fadeUp} className="space-y-4">
          <div className={`${card} p-6`}>
            <div className="flex items-center gap-3 text-gray-400 dark:text-white/50 mb-1">
              <FiMapPin size={16} />
              <span className="text-xs uppercase tracking-wider font-medium">Location</span>
            </div>
            <p className="text-gray-900 dark:text-white font-semibold text-lg">
              {profile?.location || 'Remote'}
            </p>
          </div>

          <div className={`${card} p-6`}>
            <div className="flex items-center gap-3 text-gray-400 dark:text-white/50 mb-1">
              <Sparkles size={16} />
              <span className="text-xs uppercase tracking-wider font-medium">Status</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-gray-900 dark:text-white font-semibold text-lg">
                {profile?.status || 'Active'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
