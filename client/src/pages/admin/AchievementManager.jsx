import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Loader2, Trash2, Pencil, X, Trophy, ExternalLink } from 'lucide-react'
import { useForm } from 'react-hook-form'
import useCrud from '@/hooks/useCrud'
import ImageUpload from '@/components/admin/ImageUpload'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

function AchievementForm({ onSubmit, onCancel, initial = null }) {
  const [submitting, setSubmitting] = useState(false)
  const isEdit = !!initial
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: initial ? {
      title: initial.title || '',
      issuer: initial.issuer || '',
      date: initial.date ? new Date(initial.date).toISOString().split('T')[0] : '',
      proofLink: initial.proofLink || '',
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
      <motion.div className="relative w-[90vw] max-w-md bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl dark:shadow-none max-h-[90vh] flex flex-col overflow-hidden" initial={{ y: 30, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.97 }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10 shrink-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{isEdit ? 'Edit Achievement' : 'New Achievement'}</h2>
          <button onClick={onCancel} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center"><X size={16} className="text-gray-500 dark:text-white/50" /></button>
        </div>
        <form onSubmit={handleSubmit(onForm)} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 space-y-4 overflow-y-auto flex-1 no-scrollbar">
          <div>
            <label className="admin-label">Title *</label>
            <input {...register('title', { required: 'Required' })} className="input-field" placeholder="AWS Certified Developer" />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="admin-label">Issuer</label>
            <input {...register('issuer')} className="input-field" placeholder="Amazon Web Services" />
          </div>
          <div>
            <label className="admin-label">Date</label>
            <input type="date" {...register('date')} className="input-field" />
          </div>
          <div>
            <label className="admin-label">Proof Link</label>
            <input {...register('proofLink')} className="input-field" placeholder="https://credential.example.com" />
          </div>
          <ImageUpload
            value={watch('image')}
            onChange={(url) => setValue('image', url, { shouldDirty: true })}
            label="Certificate Image"
          />
          </div>
          <div className="flex justify-end gap-3 p-6 border-t border-gray-100 dark:border-white/10 shrink-0">
            <button type="button" onClick={onCancel} className="px-4 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/50 dark:hover:text-white/80 dark:hover:bg-white/5 transition-all">Cancel</button>
            <button type="submit" disabled={submitting} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              {submitting ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : isEdit ? 'Save Changes' : 'Add Achievement'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function AchievementManager() {
  const { items, loading, addItem, updateItem, deleteItem } = useCrud('/achievements', 'Achievement')
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate} className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-500/10 w-full sm:w-auto">
          <Plus size={18} /> Add Achievement
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-purple-500 animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl">
          <Trophy size={40} className="text-gray-300 dark:text-white/10 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-white/30 text-lg">No achievements yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((ach) => (
            <div key={ach._id} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden group hover:border-purple-500/30 dark:hover:border-white/10 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none transition-all">
              {ach.image && (
                <div className="h-36 bg-gray-100 dark:bg-white/5 overflow-hidden">
                  <img src={ach.image} alt={ach.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" onError={(e) => { e.target.parentElement.style.display = 'none' }} />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
                      <Trophy size={18} className="text-amber-500 dark:text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-900 dark:text-white font-semibold text-sm truncate">{ach.title}</p>
                      {ach.issuer && <p className="text-purple-600 dark:text-purple-300 text-xs mt-0.5 truncate">{ach.issuer}</p>}
                      {ach.date && <p className="text-gray-400 dark:text-white/25 text-[10px] mt-1">{new Date(ach.date).toLocaleDateString()}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-2">
                    <button onClick={() => openEdit(ach)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/10 transition-all" title="Edit">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => handleDelete(ach._id)} className="p-1.5 rounded-lg text-red-500/70 hover:text-red-600 hover:bg-red-500/10 dark:text-red-400/70 dark:hover:text-red-400 dark:hover:bg-red-500/15 transition-all" title="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                {ach.proofLink && (
                  <a href={ach.proofLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:text-xs mt-3 dark:hover:text-purple-300 transition-colors">
                    <ExternalLink size={11} /> View Credential
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {formState.open && (
          <AchievementForm
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
