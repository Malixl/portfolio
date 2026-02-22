import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, BookOpen, Eye } from "lucide-react";
import { usePortfolioData } from "../context/PortfolioContext";
import { getOptimizedImageUrl } from "../utils/imageUtils";
import { useState, useEffect, useRef } from "react";
import ImageModal from "../components/ui/ImageModal";
import LoadingScreen from "../components/ui/LoadingScreen";
import SEO from "../components/SEO";

import api from "../services/api";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs } = usePortfolioData();
  const [post, setPost] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchedId = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      // 1. Optimistic load from context (if available)
      const cached = blogs.find((b) => b._id === id);
      if (cached) {
        setPost(cached);
        setLoading(false);
      }

      // Only fetch from API if we haven't fetched this ID yet (prevents double counting)
      if (fetchedId.current === id) return;
      fetchedId.current = id;

      try {
        // 2. Fetch fresh data (triggers view increment)
        const res = await api.get(`/blogs/${id}`);
        if (res.data.success) {
          setPost(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        if (!cached) navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, blogs, navigate]);

  if (loading || !post) {
    return <LoadingScreen />;
  }

  const readTime = Math.ceil((post.content?.length || 0) / 1000) || 5;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pb-24">
      <SEO
        title={post.title}
        description={post.description}
        image={getOptimizedImageUrl(post.image)}
        keywords={post.tags?.join(", ")}
        type="article"
      />

      {/* Hero Image — full bleed */}
      {post.image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-72 md:h-[28rem] relative group cursor-zoom-in overflow-hidden bg-gray-100 dark:bg-white/5"
          onClick={() => setIsImageOpen(true)}
        >
          <img
            src={getOptimizedImageUrl(post.image)}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md">
              View Image
            </span>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-3xl mx-auto px-5 md:px-8"
      >
        {/* Back Button */}
        <div className={`${post.image ? "pt-10" : "pt-28"} mb-6`}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-purple-600 dark:text-white/40 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap gap-5 items-center text-sm text-gray-500 dark:text-white/50 mb-8">
          {post.createdAt && (
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-purple-500" />
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <BookOpen size={15} className="text-purple-500" />
            <span>{readTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={15} className="text-purple-500" />
            <span>{post.views || 0} views</span>
          </div>
        </div>

        {/* Description / Summary */}
        {post.description && (
          <p className="text-lg text-gray-600 dark:text-white/60 leading-relaxed mb-8 italic border-l-4 border-purple-500 pl-5">
            {post.description}
          </p>
        )}

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-white/5 mb-10" />

        {/* Content */}
        <div
          className="prose dark:prose-invert max-w-none prose-lg prose-purple prose-img:rounded-2xl prose-headings:font-bold"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags — below content */}
        {post.tags?.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/5">
            <h2 className="text-lg font-bold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 text-sm font-medium"
                >
                  <Tag size={13} /> {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.article>

      <ImageModal
        isOpen={isImageOpen}
        onClose={() => setIsImageOpen(false)}
        imageSrc={getOptimizedImageUrl(post.image)}
        altText={post.title}
      />
    </div>
  );
}
