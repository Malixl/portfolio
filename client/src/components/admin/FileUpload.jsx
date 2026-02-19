import { useState, useRef } from 'react'
import { Upload, X, Loader2, FileText, ExternalLink } from 'lucide-react'
import api from '@/services/api'

/**
 * Reusable file upload component for documents (PDF).
 * Uploads to Cloudinary via the server's /api/upload/document endpoint.
 * 
 * Props:
 *   value    — current file URL (or empty)
 *   onChange — callback with the new URL string
 *   label    — optional label text
 */
export default function FileUpload({ value, onChange, label = 'Document' }) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState(null)
  const [fileName, setFileName] = useState('')
  const inputRef = useRef(null)

  const handleFile = async (file) => {
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Max file size is 10MB')
      return
    }

    setError(null)
    setUploading(true)
    setFileName(file.name)

    try {
      const formData = new FormData()
      formData.append('document', file)

      const res = await api.post('/upload/document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      onChange(res.data.data.url)
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleRemove = () => {
    onChange('')
    setFileName('')
    if (inputRef.current) inputRef.current.value = ''
  }

  // Extract filename from URL
  const displayName = fileName || (value ? decodeURIComponent(value.split('/').pop()) : '')

  return (
    <div className="space-y-2">
      <label className="admin-label">{label}</label>

      {value ? (
        <div className="flex items-center justify-between gap-3 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center shrink-0">
              <FileText size={20} className="text-red-500" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{displayName}</p>
              <p className="text-xs text-gray-400 dark:text-white/30">PDF Document</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-50 dark:text-white/40 dark:hover:text-purple-400 dark:hover:bg-purple-500/10 transition-all"
              title="Open file"
            >
              <ExternalLink size={16} />
            </a>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
              title="Remove file"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`
            relative flex flex-col items-center justify-center gap-2 py-8 px-4
            border-2 border-dashed rounded-xl cursor-pointer transition-all
            ${dragOver
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/10'
              : 'border-gray-300 dark:border-white/15 hover:border-purple-400 dark:hover:border-purple-500/40 bg-gray-50 dark:bg-white/[0.02]'
            }
            ${uploading ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          {uploading ? (
            <>
              <Loader2 size={28} className="text-purple-500 animate-spin" />
              <p className="text-sm text-gray-500 dark:text-white/40">Uploading {fileName}...</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
                <FileText size={22} className="text-red-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 dark:text-white/60">
                  <span className="text-purple-600 dark:text-purple-400">Click to upload</span> or drag & drop
                </p>
                <p className="text-xs text-gray-400 dark:text-white/25 mt-1">PDF up to 10MB</p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs flex items-center gap-1">
          <X size={12} /> {error}
        </p>
      )}
    </div>
  )
}
