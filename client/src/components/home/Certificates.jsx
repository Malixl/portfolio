import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { FiExternalLink } from 'react-icons/fi'
import { Section, SectionTitle } from './Section'
import { fadeUp, staggerContainer } from '../../utils/animations'
import { getOptimizedImageUrl } from '../../utils/imageUtils'
import { useState } from 'react'
import ImageModal from '../ui/ImageModal'

const card = 'bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] backdrop-blur-xl rounded-2xl p-6 hover:border-green-300 dark:hover:border-green-500/20 transition-colors duration-300'

export default function Certificates({ data }) {
  const [selectedImage, setSelectedImage] = useState(null)

  if (!data?.length) return null

  return (
    <Section id="certificates">
      <SectionTitle sub="Credentials & certifications">Certificates</SectionTitle>
      <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-4">
        {data.map((cert) => (
          <motion.div key={cert._id} variants={fadeUp} className={card}>
            <div className="flex items-start gap-4">
              {/* Image or Icon */}
              <div className="shrink-0">
                 {cert.image ? (
                   <div 
                    className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 cursor-zoom-in group"
                    onClick={() => setSelectedImage({ src: getOptimizedImageUrl(cert.image), alt: cert.title })}
                   >
                     <img 
                       src={getOptimizedImageUrl(cert.image)} 
                       alt={cert.title} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                     />
                   </div>
                 ) : (
                   <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/10 flex items-center justify-center">
                     <Award size={24} className="text-green-600 dark:text-green-400" />
                   </div>
                 )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">{cert.title}</h3>
                <p className="text-green-600 dark:text-green-400/80 text-sm font-medium">{cert.issuer}</p>
                {cert.date && (
                  <p className="text-gray-400 dark:text-white/30 text-xs mt-1 font-mono">
                    {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                )}
                {cert.description && (
                  <p className="text-gray-500 dark:text-white/50 text-sm mt-2 line-clamp-2">{cert.description}</p>
                )}
                
                {/* Support both credentialUrl (old) and proofLink (new) */}
                {(cert.credentialUrl || cert.proofLink) && (
                  <a
                    href={cert.credentialUrl || cert.proofLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400/70 hover:text-green-500 dark:hover:text-green-400 transition-colors mt-3"
                  >
                    <FiExternalLink size={13} /> View Credential
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <ImageModal 
         isOpen={!!selectedImage}
         onClose={() => setSelectedImage(null)}
         imageSrc={selectedImage?.src}
         altText={selectedImage?.alt}
      />
    </Section>
  )
}
