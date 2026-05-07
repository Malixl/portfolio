import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Award, Calendar, ExternalLink, Building2, Share2, Check, Download } from "lucide-react";
import { usePortfolioData } from "../context/PortfolioContext";
import { getOptimizedImageUrl } from "../utils/imageUtils";
import { useState, useEffect } from "react";
import api from "../services/api";

export default function CertificateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { certificates, achievements } = usePortfolioData();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      // 1. Optimistic load from context — check both certificates and achievements
      const allCerts = [...(certificates || []), ...(achievements || [])];
      const cached = allCerts.find((c) => c._id === id);
      if (cached) {
        setCert(cached);
        setLoading(false);
      }

      // 2. Fetch from API for fresh data
      try {
        const res = await api.get(`/certificates/${id}`);
        if (res.data.success) {
          setCert(res.data.data);
          setLoading(false);
          return;
        }
      } catch (err) {
        try {
          const res = await api.get(`/achievements/${id}`);
          if (res.data.success) {
            setCert(res.data.data);
            setLoading(false);
            return;
          }
        } catch {
          if (!cached) navigate("/experience");
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, certificates, achievements, navigate]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading || !cert) return null;

  const credentialUrl = cert.credentialUrl || cert.proofLink;
  const certDate = cert.date
    ? new Date(cert.date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-black/60 backdrop-blur-md border-b border-white/5 shrink-0">
        {/* Left: Certificate Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 shrink-0">
            <Award size={13} className="text-green-400" />
            <span className="text-[11px] font-semibold text-green-400 uppercase tracking-wider hidden sm:inline">
              Certificate
            </span>
          </div>
          <div className="min-w-0">
            <h1 className="text-sm md:text-base font-semibold text-white truncate">
              {cert.title}
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-white/40">
              {cert.issuer && (
                <span className="flex items-center gap-1">
                  <Building2 size={10} /> {cert.issuer}
                </span>
              )}
              {certDate && (
                <span className="flex items-center gap-1">
                  <Calendar size={10} /> {certDate}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 ml-3">
          {credentialUrl && (
            <a
              href={credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600 hover:bg-green-500 text-white text-xs font-medium transition-colors"
            >
              <ExternalLink size={12} /> Credential
            </a>
          )}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-medium transition-colors border border-white/10"
          >
            {copied ? (
              <>
                <Check size={12} className="text-green-400" /> Copied!
              </>
            ) : (
              <>
                <Share2 size={12} /> Share
              </>
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all border border-white/10 hover:border-white/20"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Certificate Image — Full Screen */}
      <div
        className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-auto"
        onClick={handleClose}
      >
        {cert.image ? (
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            src={getOptimizedImageUrl(cert.image)}
            alt={cert.title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className="flex flex-col items-center gap-4 text-white/30">
            <Award size={64} />
            <p className="text-lg font-medium">No certificate image available</p>
          </div>
        )}
      </div>

      {/* Bottom Bar — Mobile actions */}
      <div className="flex items-center justify-center gap-3 px-4 py-3 bg-black/60 backdrop-blur-md border-t border-white/5 shrink-0 sm:hidden">
        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-600 hover:bg-green-500 text-white text-xs font-medium transition-colors"
          >
            <ExternalLink size={12} /> View Credential
          </a>
        )}
      </div>
    </motion.div>
  );
}
