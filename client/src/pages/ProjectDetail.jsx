import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, Layers } from "lucide-react";
import { usePortfolioData } from "../context/PortfolioContext";
import { getOptimizedImageUrl } from "../utils/imageUtils";
import { useState, useEffect } from "react";
import ImageModal from "../components/ui/ImageModal";
import LoadingScreen from "../components/ui/LoadingScreen";
import SEO from "../components/SEO";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, loading } = usePortfolioData();
  const [project, setProject] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    if (projects.length > 0) {
      const found = projects.find((p) => p._id === id);
      if (found) {
        setProject(found);
      } else {
        navigate("/");
      }
    }
  }, [id, projects, navigate]);

  if (loading || !project) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pb-24 pt-24 px-4 md:px-8">
      <SEO
        title={project.title}
        description={project.description || `Project: ${project.title}`}
        image={project.image}
        url={`/projects/${project._id}`}
        type="article"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-purple-600 dark:text-white/40 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* Project Image — above title */}
        {project.image && (
          <div
            className="mb-8 rounded-2xl overflow-hidden cursor-zoom-in group border border-gray-100 dark:border-white/5"
            onClick={() => setIsImageOpen(true)}
          >
            <img
              src={getOptimizedImageUrl(project.image)}
              alt={project.title}
              className="w-full h-auto max-h-[24rem] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Title & Meta */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          {project.title}
        </h1>

        <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500 dark:text-white/50 mb-6">
          {project.createdAt && (
            <div className="flex items-center gap-1.5">
              <Calendar size={15} className="text-purple-500" />
              <span>
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
          {project.category && (
            <div className="flex items-center gap-1.5">
              <Layers size={15} className="text-purple-500" />
              <span>{project.category}</span>
            </div>
          )}
        </div>

        {/* Links */}
        {(project.links?.length > 0 ||
          project.demoLink ||
          project.repoLink) && (
          <div className="flex flex-wrap gap-3 mb-8">
            {(project.links || []).map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 hover:bg-purple-50 hover:text-purple-600 dark:bg-white/5 dark:hover:bg-purple-500/15 dark:hover:text-purple-300 transition-all font-medium text-sm"
              >
                <ExternalLink size={15} />
                {link.label}
              </a>
            ))}
            {!project.links?.length && (
              <>
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-all font-medium text-sm"
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
                {project.repoLink && (
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all font-medium text-sm"
                  >
                    Source Code
                  </a>
                )}
              </>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-white/5 mb-10" />

        {/* About Project */}
        <div className="prose dark:prose-invert max-w-none prose-lg prose-purple prose-headings:font-bold">
          <h2 className="text-2xl font-bold mb-4">About Project</h2>
          <div dangerouslySetInnerHTML={{ __html: project.description }} />
        </div>

        {/* Tech Stack — below About Project */}
        {project.techStack?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Technologies I Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-200/50 dark:border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Extended Content */}
        {project.content && (
          <div className="mt-12 pt-10 border-t border-gray-100 dark:border-white/5">
            <div
              className="prose dark:prose-invert max-w-none prose-lg prose-purple prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>
        )}
      </motion.div>

      <ImageModal
        isOpen={isImageOpen}
        onClose={() => setIsImageOpen(false)}
        imageSrc={getOptimizedImageUrl(project.image)}
        altText={project.title}
      />
    </div>
  );
}
