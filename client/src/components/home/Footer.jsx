import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'
import { FaBehance } from 'react-icons/fa'

export default function Footer({ profile }) {
  const links = profile?.socialLinks || {}

  return (
    <footer className="border-t border-gray-200 dark:border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold gradient-text">{profile?.name || 'Portfolio'}</h3>
          <p className="text-gray-400 dark:text-white/30 text-sm mt-1">
            {profile?.headline || 'Developer'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {links.github && (
            <a href={links.github} target="_blank" rel="noreferrer"
              className="text-gray-400 dark:text-white/30 hover:text-gray-900 dark:hover:text-white transition-colors">
              <FiGithub size={18} />
            </a>
          )}
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noreferrer"
              className="text-gray-400 dark:text-white/30 hover:text-gray-900 dark:hover:text-white transition-colors">
              <FiLinkedin size={18} />
            </a>
          )}
          {links.instagram && (
            <a href={links.instagram} target="_blank" rel="noreferrer"
              className="text-gray-400 dark:text-white/30 hover:text-gray-900 dark:hover:text-white transition-colors">
              <FiInstagram size={18} />
            </a>
          )}
          {links.behance && (
            <a href={links.behance} target="_blank" rel="noreferrer"
              className="text-gray-400 dark:text-white/30 hover:text-gray-900 dark:hover:text-white transition-colors">
              <FaBehance size={18} />
            </a>
          )}
        </div>

        <p className="text-gray-300 dark:text-white/15 text-xs">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  )
}
