import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Wrench, Users } from 'lucide-react'
import { Section, SectionTitle } from './Section'
import { fadeUp, staggerContainer, scaleIn } from '../../utils/animations'

const TYPE_CONFIG = {
  tech: { title: 'Technologies', sub: 'Tech stack I work with', icon: Code2 },
  hardskill: { title: 'Hard Skills', sub: 'Professional capabilities', icon: Wrench },
  softskill: { title: 'Soft Skills', sub: 'Interpersonal strengths', icon: Users },
}

function groupByCategory(skills) {
  return skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})
}

/* ── Tech Skills ── */
function TechGroup({ skills }) {
  if (!skills?.length) return null
  const config = TYPE_CONFIG.tech
  const grouped = groupByCategory(skills)

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'from-blue-400 to-blue-600'
      case 'Intermediate': return 'from-purple-400 to-purple-600'
      case 'Advanced': return 'from-pink-400 to-pink-600'
      case 'Expert': return 'from-orange-400 to-orange-600'
      default: return 'from-purple-400 to-purple-600'
    }
  }

  const getLevelWidth = (level) => {
     switch(level) {
      case 'Beginner': return '25%'
      case 'Intermediate': return '50%'
      case 'Advanced': return '75%'
      case 'Expert': return '100%'
      default: return '50%'
    }
  }

  return (
    <div className="mb-14">
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
          <config.icon size={16} className="text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{config.title}</h3>
          <p className="text-gray-400 dark:text-white/30 text-xs">{config.sub}</p>
        </div>
      </motion.div>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-6 last:mb-0">
          <motion.p variants={fadeUp} className="text-gray-400 dark:text-white/40 text-xs font-medium uppercase tracking-wider mb-3">
            {category}
          </motion.p>
          <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {items.map((skill) => (
              <motion.div
                key={skill._id}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] backdrop-blur-xl rounded-xl p-4 text-center group hover:border-purple-400 dark:hover:border-purple-500/30 transition-all duration-300 cursor-default"
              >
                {skill.icon && (
                  skill.icon.startsWith('http') ? (
                    <img src={skill.icon} alt={skill.name} className="w-10 h-10 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  ) : (
                    <span className="text-3xl block mb-2">{skill.icon}</span>
                  )
                )}
                <p className="text-gray-800 dark:text-white font-medium text-sm">{skill.name}</p>
                
                {/* Level Bar */}
                {/* Level Badge */}
                <div className="mt-3">
                  <span className={`text-[10px] px-2 py-1 rounded-full ${
                    skill.level === 'Beginner' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300' :
                    skill.level === 'Intermediate' ? 'bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300' :
                    skill.level === 'Advanced' ? 'bg-pink-100 text-pink-600 dark:bg-pink-500/15 dark:text-pink-300' :
                    'bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300' // Expert
                  }`}>
                    {skill.level || 'Intermediate'}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  )
}

/* ── Flip Card for Hard/Soft Skills ── */
function FlipCard({ skill, color }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      variants={scaleIn}
      className="perspective-1000 cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped((f) => !f)}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full h-44 sm:h-48"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── Front ── */}
        <div
          className={`absolute inset-0 rounded-2xl border backdrop-blur-xl flex flex-col items-center justify-center p-6 backface-hidden ${
            color === 'blue'
              ? 'bg-blue-50 dark:bg-blue-500/[0.06] border-blue-200 dark:border-blue-500/20'
              : 'bg-green-50 dark:bg-green-500/[0.06] border-green-200 dark:border-green-500/20'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white text-center leading-tight">
            {skill.name}
          </h4>
          {skill.year && (
            <span className={`mt-3 text-xs font-medium px-2.5 py-1 rounded-full ${
              color === 'blue'
                ? 'bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400'
                : 'bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400'
            }`}>
              Since {skill.year}
            </span>
          )}
        </div>

        {/* ── Back ── */}
        <div
          className={`absolute inset-0 rounded-2xl border backdrop-blur-xl flex flex-col items-center justify-center p-6 ${
            color === 'blue'
              ? 'bg-blue-100 dark:bg-blue-500/[0.1] border-blue-300 dark:border-blue-500/30'
              : 'bg-green-100 dark:bg-green-500/[0.1] border-green-300 dark:border-green-500/30'
          }`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-gray-600 dark:text-white/70 text-sm text-center leading-relaxed line-clamp-5">
            {skill.description || 'No description yet.'}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Hard/Soft Skills Group: large flip cards 3-col ── */
function SkillCardGroup({ type, skills }) {
  if (!skills?.length) return null
  const config = TYPE_CONFIG[type]
  const color = type === 'hardskill' ? 'blue' : 'green'

  return (
    <div className="mb-14 last:mb-0">
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          color === 'blue' ? 'bg-blue-100 dark:bg-blue-500/10' : 'bg-green-100 dark:bg-green-500/10'
        }`}>
          <config.icon size={16} className={color === 'blue' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{config.title}</h3>
          <p className="text-gray-400 dark:text-white/30 text-xs">{config.sub}</p>
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <FlipCard key={skill._id} skill={skill} color={color} />
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills({ data }) {
  if (!data?.length) return null

  const publicData = data.filter((s) => s.visibility !== "private");

  const byType = {
    tech: publicData.filter((s) => (s.type || "tech") === "tech"),
    hardskill: publicData.filter((s) => s.type === "hardskill"),
    softskill: publicData.filter((s) => s.type === "softskill"),
  };

  return (
    <Section id="skills">
      <SectionTitle sub="Technologies I work with">Skills</SectionTitle>
      <TechGroup skills={byType.tech} />
      <SkillCardGroup type="hardskill" skills={byType.hardskill} />
      <SkillCardGroup type="softskill" skills={byType.softskill} />
    </Section>
  )
}
