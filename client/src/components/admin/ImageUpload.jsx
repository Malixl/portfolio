import { useState, useRef } from 'react'
import { Upload, X, Loader2, ImageIcon } from 'lucide-react'
import api from '@/services/api'

/**
 * Reusable image upload component.
 * Uploads to Cloudinary via the server's /api/upload endpoint.
 * 
 * Props:
 *   value    — current image URL (or empty)
 *   onChange — callback with the new URL string
 *   label    — optional label text
 */
export default function ImageUpload({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  const handleFile = async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Max file size is 5MB')
      return
    }

    setError(null)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const res = await api.post('/upload', formData, {
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
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleRemove = () => {
    onChange('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="space-y-2">
      <label className="admin-label">{label}</label>

      {/* Preview or Upload Area */}
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
          <img
            src={value}
            alt="Preview"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="opacity-0 group-hover:opacity-100 transition-all bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
              title="Remove image"
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
              <p className="text-sm text-gray-500 dark:text-white/40">Uploading...</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center">
                <ImageIcon size={22} className="text-purple-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 dark:text-white/60">
                  <span className="text-purple-600 dark:text-purple-400">Click to upload</span> or drag & drop
                </p>
                <p className="text-xs text-gray-400 dark:text-white/25 mt-1">PNG, JPG, WEBP up to 5MB</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {/* Error */}
      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs flex items-center gap-1">
          <X size={12} /> {error}
        </p>
      )}
    </div>
  )
}
