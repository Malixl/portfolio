import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function PageHero({ title, description, image, color = "purple" }) {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' })
  }

  const gradientColors = {
    purple: 'from-purple-500/20 via-transparent',
    blue: 'from-blue-500/20 via-transparent',
    green: 'from-green-500/20 via-transparent',
    orange: 'from-orange-500/20 via-transparent'
  }

  const accentColors = {
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/10',
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10',
    green: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/10',
    orange: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/10'
  }
  
  const selectedAccent = accentColors[color] || accentColors.purple

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Background Gradients */}
      <div className={`absolute top-0 left-0 right-0 h-full bg-gradient-to-b ${gradientColors[color] || gradientColors.purple} to-transparent z-0`} />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-black to-transparent z-10" />

      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl mx-auto"
        >
          {/* Optional Icon/Image Badge */}
          {image && (
             <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
                <div className={`w-16 h-16 rounded-2xl ${selectedAccent} flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-xl`}>
                    {image}
                </div>
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
