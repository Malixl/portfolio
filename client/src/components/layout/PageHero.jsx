import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useMemo } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

// Dot grid pattern background
function DotGrid({ color }) {
  const dotColor = {
    purple: 'bg-purple-400/20 dark:bg-purple-400/10',
    blue: 'bg-blue-400/20 dark:bg-blue-400/10',
    green: 'bg-green-400/20 dark:bg-green-400/10',
    orange: 'bg-orange-400/20 dark:bg-orange-400/10',
  }
  const selectedDot = dotColor[color] || dotColor.purple

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        opacity: 0.06,
      }} />
      {/* Larger accent dots scattered */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full ${selectedDot}`}
          style={{
            left: `${10 + (i * 37) % 80}%`,
            top: `${5 + (i * 53) % 85}%`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Floating geometric shapes
function FloatingShapes({ color }) {
  const shapeColors = {
    purple: { border: 'border-purple-300/30 dark:border-purple-500/20', fill: 'bg-purple-400/10 dark:bg-purple-500/5' },
    blue: { border: 'border-blue-300/30 dark:border-blue-500/20', fill: 'bg-blue-400/10 dark:bg-blue-500/5' },
    green: { border: 'border-green-300/30 dark:border-green-500/20', fill: 'bg-green-400/10 dark:bg-green-500/5' },
    orange: { border: 'border-orange-300/30 dark:border-orange-500/20', fill: 'bg-orange-400/10 dark:bg-orange-500/5' },
  }
  const sc = shapeColors[color] || shapeColors.purple

  const shapes = useMemo(() => [
    // Rotating squares
    { type: 'square', size: 'w-8 h-8', left: '8%', top: '20%', rotate: 45, duration: 18 },
    { type: 'square', size: 'w-5 h-5', left: '85%', top: '35%', rotate: -30, duration: 22 },
    // Circles
    { type: 'circle', size: 'w-10 h-10', left: '75%', top: '15%', duration: 14 },
    { type: 'circle', size: 'w-4 h-4', left: '15%', top: '70%', duration: 20 },
    // Diamonds
    { type: 'diamond', size: 'w-6 h-6', left: '90%', top: '65%', duration: 16 },
    { type: 'diamond', size: 'w-4 h-4', left: '5%', top: '45%', duration: 24 },
    // Triangles (via border)
    { type: 'ring', size: 'w-12 h-12', left: '70%', top: '70%', duration: 25 },
    { type: 'ring', size: 'w-6 h-6', left: '25%', top: '30%', duration: 19 },
  ], [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute ${s.size} ${
            s.type === 'circle' || s.type === 'ring' ? 'rounded-full' : 
            s.type === 'diamond' ? 'rotate-45' : 'rounded-sm'
          } ${s.type === 'ring' ? `border-2 ${sc.border}` : `${sc.fill} border ${sc.border}`}`}
          style={{ left: s.left, top: s.top }}
          animate={{
            y: [0, -15, 0, 10, 0],
            x: [0, 8, 0, -8, 0],
            rotate: s.type === 'ring' ? [0, 360] : [s.rotate || 0, (s.rotate || 0) + 90, (s.rotate || 0) + 180, (s.rotate || 0) + 270, (s.rotate || 0) + 360],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Animated icon badge with orbital rings + glow
function AnimatedIconBadge({ children, color }) {
  const ringColors = {
    purple: 'border-purple-400/40 dark:border-purple-400/30',
    blue: 'border-blue-400/40 dark:border-blue-400/30',
    green: 'border-green-400/40 dark:border-green-400/30',
    orange: 'border-orange-400/40 dark:border-orange-400/30',
  }
  const glowColors = {
    purple: 'shadow-purple-500/30 dark:shadow-purple-500/20',
    blue: 'shadow-blue-500/30 dark:shadow-blue-500/20',
    green: 'shadow-green-500/30 dark:shadow-green-500/20',
    orange: 'shadow-orange-500/30 dark:shadow-orange-500/20',
  }
  const bgColors = {
    purple: 'from-purple-500/15 to-purple-600/5 dark:from-purple-500/20 dark:to-purple-600/5',
    blue: 'from-blue-500/15 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/5',
    green: 'from-green-500/15 to-green-600/5 dark:from-green-500/20 dark:to-green-600/5',
    orange: 'from-orange-500/15 to-orange-600/5 dark:from-orange-500/20 dark:to-orange-600/5',
  }

  const ring = ringColors[color] || ringColors.purple
  const glow = glowColors[color] || glowColors.purple
  const bg = bgColors[color] || bgColors.purple

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      {/* Outer orbital ring — slow spin */}
      <motion.div
        className={`absolute w-28 h-28 rounded-full border ${ring}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        {/* Orbiting dot */}
        <motion.div
          className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-gradient-to-br ${bg.replace('/15', '/60').replace('/5', '/40')}`}
          style={{ filter: 'blur(0.5px)' }}
        />
      </motion.div>

      {/* Middle orbital ring — reverse spin */}
      <motion.div
        className={`absolute w-20 h-20 rounded-full border border-dashed ${ring}`}
        style={{ opacity: 0.5 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${bg.replace('/15', '/50').replace('/5', '/30')}`}
        />
      </motion.div>

      {/* Center icon container with glow */}
      <motion.div
        className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${bg} backdrop-blur-xl border border-white/30 dark:border-white/10 flex items-center justify-center shadow-lg ${glow}`}
        animate={{
          boxShadow: [
            `0 0 20px 0 var(--tw-shadow-color)`,
            `0 0 40px 5px var(--tw-shadow-color)`,
            `0 0 20px 0 var(--tw-shadow-color)`,
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Breathing scale on the icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </motion.div>

      {/* Particle sparkles around the icon */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: color === 'purple' ? '#a855f7' : color === 'blue' ? '#3b82f6' : color === 'green' ? '#22c55e' : '#f97316',
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos((i * 60 * Math.PI) / 180) * 50, 0],
            y: [0, Math.sin((i * 60 * Math.PI) / 180) * 50, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// Cross-hatch / grid lines overlay
function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] dark:opacity-[0.04]" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
    </div>
  )
}

export default function PageHero({ title, description, image, color = "purple" }) {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' })
  }

  const gradientColors = {
    purple: 'from-purple-500/20 via-purple-200/10 dark:via-purple-900/10',
    blue: 'from-blue-500/20 via-blue-200/10 dark:via-blue-900/10',
    green: 'from-green-500/20 via-green-200/10 dark:via-green-900/10',
    orange: 'from-orange-500/20 via-orange-200/10 dark:via-orange-900/10'
  }

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute top-0 left-0 right-0 h-full bg-gradient-to-b ${gradientColors[color] || gradientColors.purple} to-transparent z-0`} />

      {/* Ambient blurred blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl opacity-40" />

      {/* Grid line overlay */}
      <GridLines />

      {/* Dot grid pattern */}
      <DotGrid color={color} />

      {/* Floating geometric shapes */}
      <FloatingShapes color={color} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-black to-transparent z-10" />

      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl mx-auto"
        >
          {/* Animated Icon Badge */}
          {image && (
             <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
                <AnimatedIconBadge color={color}>
                  {image}
                </AnimatedIconBadge>
             </motion.div>
          )}

          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            {title}
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-500 dark:text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
          
          <motion.button
            variants={fadeInUp}
            onClick={scrollToContent}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 shadow-lg shadow-gray-200/50 dark:shadow-none transition-all duration-300 backdrop-blur-sm"
          >
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Explore {title}</span>
            <ArrowDown size={16} className="text-gray-900 dark:text-white group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
