import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiSend } from 'react-icons/fi'
import { Section, SectionTitle } from './Section'
import { fadeUp } from '../../utils/animations'

const EMAIL = 'malikmatoha19052003@gmail.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Section id="contact">
      <SectionTitle sub="Let's work together">Contact</SectionTitle>
      <motion.div
        variants={fadeUp}
        className="bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] backdrop-blur-xl rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto"
      >
        <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
          <FiMail size={28} className="text-purple-600 dark:text-purple-400" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Get In Touch</h3>
        <p className="text-gray-500 dark:text-white/40 mb-8">
          Have a project in mind or just want to say hi? Feel free to reach out!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <FiSend size={16} /> Send Email
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all duration-300 text-sm font-medium"
          >
            {copied ? '✓ Copied!' : EMAIL}
          </button>
        </div>
      </motion.div>
    </Section>
  )
}
