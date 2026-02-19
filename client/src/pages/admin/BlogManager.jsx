import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Loader2, Trash2, Pencil, X, FileText } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import useCrud from '@/hooks/useCrud'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ImageUpload from '@/components/admin/ImageUpload'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

function BlogForm({ onSubmit, onCancel, initial = null }) {
  const [submitting, setSubmitting] = useState(false)
  const isEdit = !!initial
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    defaultValues: initial ? {
      title: initial.title || '',
      description: initial.description || '',
      content: initial.content || '',
      image: initial.image || '',
      tags: (initial.tags || []).join(', '),
    } : {},
  })

  // ... (keep onForm)
  const onForm = async (data) => {
    try {
      setSubmitting(true)
      const payload = {
        ...data,
        tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      }
      await onSubmit(payload)
      onCancel()
    } catch { setSubmitting(false) }
  }

  return (
    <motion.div className="fixed inset-0 z-100 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* ... (keep modal structure) ... */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel} />
      <motion.div className="relative w-[90vw] max-w-2xl bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-white/10 rounded-2xl max-h-[90vh] flex flex-col shadow-2xl dark:shadow-none" initial={{ y: 30, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.97 }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10 shrink-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{isEdit ? 'Edit Post' : 'New Blog Post'}</h2>
          <button onClick={onCancel} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center"><X size={16} className="text-gray-500 dark:text-white/50" /></button>
        </div>
        <form onSubmit={handleSubmit(onForm)} className="p-6 space-y-4 overflow-y-auto">
          {/* ... (keep fields up to image) ... */}
          {/* Title */}
          <div>
            <label className="admin-label">Title *</label>
            <input {...register('title', { required: 'Required' })} className="input-field" placeholder="My Awesome Blog Post" />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Description (short summary) */}
          <div>
            <label className="admin-label">Description</label>
            <textarea {...register('description')} className="input-field min-h-[60px] resize-none" placeholder="A brief summary of this post..." rows={2} />
            <p className="text-gray-400 dark:text-white/20 text-xs mt-1">Short summary shown on landing page</p>
          </div>

          {/* Content (TinyMCE) */}
          <div>
            <label className="admin-label">Content *</label>
            <Controller
              name="content"
              control={control}
              rules={{ required: 'Content is required' }}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write your blog post..."
                  height={300}
                />
              )}
            />
            {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content.message}</p>}
          </div>

          {/* Cover Image */}
          <ImageUpload
            value={watch('image')}
            onChange={(url) => setValue('image', url, { shouldDirty: true })}
            label="Cover Image"
          />
          
          {/* Tags */}
          <div>
            <label className="admin-label">Tags</label>
            <input {...register('tags')} className="input-field" placeholder="React, Tutorial, Web Dev" />
            <p className="text-gray-400 dark:text-white/20 text-xs mt-1">Comma separated</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onCancel} className="px-4 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/50 dark:hover:text-white/80 dark:hover:bg-white/5 transition-all">Cancel</button>
            <button type="submit" disabled={submitting} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              {submitting ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : isEdit ? 'Save Changes' : 'Publish Post'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function BlogManager() {
  const { items, loading, addItem, updateItem, deleteItem } = useCrud('/blogs', 'Blog')
  const [formState, setFormState] = useState({ open: false, editing: null })

  const openCreate = () => setFormState({ open: true, editing: null })
  const openEdit = (item) => setFormState({ open: true, editing: item })
  const closeForm = () => setFormState({ open: false, editing: null })

  const handleSubmit = async (data) => {
    if (formState.editing) {
      await updateItem(formState.editing._id, data)
    } else {
      await addItem(data)
    }
  }

  const [deleteTarget, setDeleteTarget] = useState(null)
  const handleDelete = (id) => setDeleteTarget(id)
  const confirmDelete = async () => {
    if (deleteTarget) await deleteItem(deleteTarget)
    setDeleteTarget(null)
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">{items.length} post{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate} className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors w-full md:w-auto">
          <Plus size={16} /> New Post
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-purple-500 animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl">
          <FileText size={40} className="text-gray-300 dark:text-white/10 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-white/30 text-lg">No blog posts yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((blog) => (
            <div key={blog._id} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden group hover:border-purple-500/30 dark:hover:border-white/10 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none transition-all">
              {blog.image && (
                <div className="h-36 bg-gray-100 dark:bg-white/5 overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <h3 className="text-gray-900 dark:text-white font-semibold line-clamp-1 min-w-0">{blog.title}</h3>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-2">
                    <button onClick={() => openEdit(blog)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/10 transition-all" title="Edit">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => handleDelete(blog._id)} className="p-1.5 rounded-lg text-red-500/70 hover:text-red-600 hover:bg-red-500/10 dark:text-red-400/70 dark:hover:text-red-400 dark:hover:bg-red-500/15 transition-all" title="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-white/40 text-sm mt-1.5 line-clamp-2 leading-relaxed">{blog.description || blog.content?.replace(/<[^>]*>/g, '').slice(0, 120)}</p>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {blog.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-300 rounded-full">#{tag}</span>
                    ))}
                  </div>
                )}
                <p className="text-gray-400 dark:text-white/15 text-[10px] mt-3">{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {formState.open && (
          <BlogForm
            key={formState.editing?._id || 'new'}
            onSubmit={handleSubmit}
            onCancel={closeForm}
            initial={formState.editing}
          />
        )}
      </AnimatePresence>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Blog Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />
    </div>
  )
}
