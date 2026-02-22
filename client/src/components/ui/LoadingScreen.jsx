import { motion } from "framer-motion";

const dots = [0, 1, 2, 3, 4];

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center gap-8 select-none">
      {/* Animated Logo Ring */}
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-500/20"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Spinning gradient arc */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <defs>
              <linearGradient
                id="loader-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="url(#loader-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="140 80"
            />
          </svg>
        </motion.div>
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-violet-600 bg-clip-text text-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            L
          </motion.span>
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex items-center gap-1.5">
        {dots.map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-purple-500"
            animate={{
              y: [0, -6, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle text */}
      <motion.p
        className="text-sm text-gray-400 dark:text-white/30 tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading
      </motion.p>
    </div>
  );
}
