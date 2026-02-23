import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Eye, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section, SectionTitle } from './Section'
import { fadeUp, staggerContainer } from '../../utils/animations'
import SearchBar from '../ui/SearchBar'

const INITIAL_COUNT = 4

function formatViews(n) {
  if (!n || n === 0) return '0'
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return n.toString()
}

export default function Blog({ data }) {
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  const filtered = useMemo(() => {
    if (!data?.length) return []
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter(p => p.title?.toLowerCase().includes(q))
  }, [data, search])

  const visible = search ? filtered : (showAll ? filtered : filtered.slice(0, INITIAL_COUNT))
  const hasMore = !search && filtered.length > INITIAL_COUNT

  if (!data?.length) return null

  return (
    <Section id="blog">
      <SectionTitle sub="Recent thoughts and writings">Blog</SectionTitle>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search articles by title..."
        resultCount={filtered.length}
        totalCount={data.length}
      />

      <motion.div variants={staggerContainer} className="space-y-4">
        <AnimatePresence mode="popLayout">
          {visible.map((post) => (
            <motion.div
              key={post._id}
              variants={fadeUp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              layout
            >
              <Link 
                to={`/blogs/${post._id}`}
                className="block bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden group hover:border-purple-500/30 dark:hover:border-purple-500/20 transition-all duration-300"
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-medium text-gray-400 dark:text-white/30 uppercase tracking-wider">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-gray-200 dark:text-white/10 text-[10px]">•</span>
                      <span className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 dark:text-white/30 uppercase tracking-wider">
                        <Eye size={12} className="text-purple-500" />
                        {formatViews(post.views)} Views
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 dark:text-white/40 text-sm mt-3 line-clamp-1 md:line-clamp-2 max-w-2xl">
                      {post.description || post.content?.replace(/<[^>]*>/g, '').slice(0, 150)}
                    </p>

                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center shrink-0 md:border-l border-gray-100 dark:border-white/5 pt-4 md:pt-0 md:pl-8">
                    <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm shadow-purple-500/10">
                      <ArrowUpRight size={22} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No results */}
      {search && filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <p className="text-gray-400 dark:text-white/30 text-lg">No articles match "<span className="text-purple-500">{search}</span>"</p>
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
