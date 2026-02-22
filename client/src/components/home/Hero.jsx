import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiArrowRight,
  FiChevronDown,
  FiDownload,
} from "react-icons/fi";
import { FaBehance } from "react-icons/fa";

const socialButton =
  "w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300";

export default function Hero({ profile }) {
  const links = profile?.socialLinks || {};

  // Handle headlines (array or legacy string)
  const headlines = Array.isArray(profile?.headline)
    ? profile.headline
    : [profile?.headline || "Full Stack Developer"];

  const [index, setIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (headlines.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [headlines.length]);

  const handleDownloadCV = useCallback(
    async (e) => {
      e.preventDefault();
      const url = profile?.resumeLink;
      if (!url) return;

      setDownloading(true);
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `${profile?.name || "CV"}_ATS_Resume.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      } catch {
        // Fallback: open in new tab if download fails
        window.open(url, "_blank");
      } finally {
        setDownloading(false);
      }
    },
    [profile],
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-white dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-purple-900/20 dark:via-black dark:to-black" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-200/50 dark:bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-200/50 dark:bg-pink-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-500 dark:text-white/60 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {profile?.status || "Available for work"}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-4">
            {profile?.name || "Developer"}
          </h1>

          <div className="h-12 md:h-16 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-3xl text-purple-600 dark:text-purple-400 font-medium"
              >
                {headlines[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Bio removed as per request */}

          {/* Actions */}
          {/* Actions */}
          <div className="flex flex-col items-center gap-8 mt-12">
            <button
              onClick={handleDownloadCV}
              disabled={!profile?.resumeLink || downloading}
              className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
            >
              {downloading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Downloading...
                </>
              ) : (
                <>
                  Download CV ATS <FiDownload size={20} />
                </>
              )}
            </button>

            <div className="flex items-center gap-6">
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  className={socialButton}
                >
                  <FiGithub size={20} />
                </a>
              )}
              {links.linkedin && (
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={socialButton}
                >
                  <FiLinkedin size={20} />
                </a>
              )}
              {links.instagram && (
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className={socialButton}
                >
                  <FiInstagram size={20} />
                </a>
              )}
              {links.behance && (
                <a
                  href={links.behance}
                  target="_blank"
                  rel="noreferrer"
                  className={socialButton}
                >
                  <FaBehance size={20} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
