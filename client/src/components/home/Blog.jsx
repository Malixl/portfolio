import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Eye, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section, SectionTitle } from './Section'
import { fadeUp, staggerContainer } from '../../utils/animations'
import { getOptimizedImageUrl } from '../../utils/imageUtils'
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

      <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
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
                className="block bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] backdrop-blur-xl rounded-2xl overflow-hidden group hover:border-purple-400 dark:hover:border-purple-500/20 transition-all duration-300 h-full"
              >
                {/* Thumbnail */}
                {post.image ? (
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={getOptimizedImageUrl(post.image)}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 flex items-center justify-center">
                    <span className="text-4xl opacity-30">📝</span>
                  </div>
                )}

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 dark:text-white/40 text-sm line-clamp-2 mt-2">
                    {post.description || post.content?.replace(/<[^>]*>/g, '').slice(0, 120)}
                  </p>

                  {/* Footer: tags + views */}
                  <div className="flex items-center justify-between mt-4">
                    {post.tags?.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300/70 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    ) : <div />}

                    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-white/25 shrink-0">
                      {post.createdAt && (
                        <span>{new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Eye size={13} />
                        {formatViews(post.views)}
                      </span>
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
