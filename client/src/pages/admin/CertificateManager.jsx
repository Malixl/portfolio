import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Loader2, Trash2, Pencil, X, Award } from 'lucide-react'
import { useForm } from 'react-hook-form'
import useCrud from '@/hooks/useCrud'
import ImageUpload from '@/components/admin/ImageUpload'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

function CertificateForm({ onSubmit, onCancel, initial = null }) {
  const [submitting, setSubmitting] = useState(false)
  const isEdit = !!initial
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: initial ? {
      title: initial.title || '',
      issuer: initial.issuer || '',
      date: initial.date || '',
      credentialUrl: initial.credentialUrl || '',
      description: initial.description || '',
      image: initial.image || '',
    } : {},
  })

  const onForm = async (data) => {
    try { setSubmitting(true); await onSubmit(data); onCancel() }
    catch { setSubmitting(false) }
  }

  return (
    <motion.div className="fixed inset-0 z-100 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel} />
      <motion.div className="relative w-[90vw] max-w-md bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl dark:shadow-none" initial={{ y: 30, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.97 }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{isEdit ? 'Edit Certificate' : 'New Certificate'}</h2>
          <button onClick={onCancel} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center"><X size={16} className="text-gray-500 dark:text-white/50" /></button>
        </div>
        <form onSubmit={handleSubmit(onForm)} className="p-6 space-y-4">
          <div>
            <label className="admin-label">Title *</label>
            <input {...register('title', { required: 'Required' })} className="input-field" placeholder="AWS Certified Developer" />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="admin-label">Issuer *</label>
            <input {...register('issuer', { required: 'Required' })} className="input-field" placeholder="Amazon Web Services" />
            {errors.issuer && <p className="text-red-400 text-xs mt-1">{errors.issuer.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Date</label>
              <input {...register('date')} className="input-field" placeholder="Jan 2024" />
            </div>
            <div>
              <label className="admin-label">Credential URL</label>
              <input {...register('credentialUrl')} className="input-field" placeholder="https://..." />
            </div>
          </div>
          <div>
            <label className="admin-label">Description</label>
            <textarea {...register('description')} className="input-field min-h-[80px] resize-none" placeholder="Additional details..." rows={3} />
          </div>
          <ImageUpload
            value={watch('image')}
            onChange={(url) => setValue('image', url, { shouldDirty: true })}
            label="Certificate Image (Optional)"
          />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onCancel} className="px-4 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/50 dark:hover:text-white/80 dark:hover:bg-white/5 transition-all">Cancel</button>
            <button type="submit" disabled={submitting} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              {submitting ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : isEdit ? 'Save Changes' : 'Add Certificate'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function CertificateManager() {
  const { items, loading, addItem, updateItem, deleteItem } = useCrud('/certificates', 'Certificate')
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certificates</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">{items.length} certificat{items.length !== 1 ? 'es' : 'e'}</p>
        </div>
        <button onClick={openCreate} className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors w-full md:w-auto">
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-purple-500 animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl">
          <Award size={40} className="text-gray-300 dark:text-white/10 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-white/30 text-lg">No certificates yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((cert) => (
            <div key={cert._id} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl p-5 group hover:border-purple-500/30 dark:hover:border-white/10 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none transition-all">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Award size={18} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-900 dark:text-white font-semibold">{cert.title}</p>
                    <p className="text-purple-600 dark:text-purple-300 text-sm">{cert.issuer}</p>
                    <div className="flex gap-3 mt-1">
                      {cert.date && <span className="text-gray-400 dark:text-white/30 text-xs">{cert.date}</span>}
                      {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600 dark:text-blue-400/70 dark:text-xs dark:hover:text-blue-400 transition-colors">
                          View Credential ↗
                        </a>
                      )}
                    </div>
                    {cert.description && <p className="text-gray-500 dark:text-white/40 text-sm mt-2 leading-relaxed">{cert.description}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-3">
                  <button onClick={() => openEdit(cert)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/10 transition-all" title="Edit">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => handleDelete(cert._id)} className="p-1.5 rounded-lg text-red-500/70 hover:text-red-600 hover:bg-red-500/10 dark:text-red-400/70 dark:hover:text-red-400 dark:hover:bg-red-500/15 transition-all" title="Delete">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {formState.open && (
          <CertificateForm
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
        title="Delete Certificate"
        message="Are you sure you want to delete this certificate? This action cannot be undone."
      />
    </div>
  )
}
