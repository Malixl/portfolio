import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Section, SectionTitle } from './Section'
import { staggerContainer, scaleIn } from '../../utils/animations'
import { getOptimizedImageUrl } from '../../utils/imageUtils'
import SearchBar from '../ui/SearchBar'

const INITIAL_COUNT = 4

const card = 'bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] backdrop-blur-xl rounded-2xl overflow-hidden group hover:border-purple-400 dark:hover:border-purple-500/30 transition-all duration-300'

function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').slice(0, 150)
}

export default function Projects({ data }) {
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  const filtered = useMemo(() => {
    if (!data?.length) return []
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter(p => p.title?.toLowerCase().includes(q))
  }, [data, search])

  // When searching, show all results. Otherwise limit to INITIAL_COUNT
  const visible = search ? filtered : (showAll ? filtered : filtered.slice(0, INITIAL_COUNT))
  const hasMore = !search && filtered.length > INITIAL_COUNT

  if (!data?.length) return null

  return (
    <Section id="projects">
      <SectionTitle sub="What I've built">Projects</SectionTitle>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search projects by title..."
        resultCount={filtered.length}
        totalCount={data.length}
      />

      <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project._id}
              variants={scaleIn}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              whileHover={{ y: -6 }}
              className={card}
            >
              {/* Clickable Image Area */}
              <Link to={`/projects/${project._id}`} className="block">
                {project.image && (
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={getOptimizedImageUrl(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                )}
              </Link>

              <div className="p-6">
                <Link to={`/projects/${project._id}`} className="block">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 dark:text-white/50 text-sm line-clamp-2 mb-4">
                    {stripHtml(project.description)}
                  </p>
                </Link>
                
                {/* Universal Links */}
                <div className="flex flex-wrap gap-3">
                  {(project.links || []).map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white transition-all"
                    >
                      {link.label}
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                    </a>
                  ))}
                  
                  {/* Fallback for old data */}
                  {(!project.links || project.links.length === 0) && (
                     <>
                        {project.demoLink && (
                          <a href={project.demoLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-500/10 dark:text-purple-300 dark:hover:bg-purple-500/20 transition-all">
                            Live Demo
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                          </a>
                        )}
                        {project.repoLink && (
                          <a href={project.repoLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white transition-all">
                            GitHub
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0 3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                          </a>
                        )}
                     </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No results */}
      {search && filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <p className="text-gray-400 dark:text-white/30 text-lg">No projects match "<span className="text-purple-500">{search}</span>"</p>
        </motion.div>
      )}

      {/* See More / Less Button */}
      {hasMore && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] text-gray-700 dark:text-white/70 hover:border-purple-400 dark:hover:border-purple-500/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all text-sm font-medium"
          >
            {showAll ? (
              <><ChevronUp size={16} /> Show Less</>
            ) : (
              <><ChevronDown size={16} /> See More ({filtered.length - INITIAL_COUNT} more)</>
            )}
          </button>
        </motion.div>
      )}
    </Section>
  )
}
