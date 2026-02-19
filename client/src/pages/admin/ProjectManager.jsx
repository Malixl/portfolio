import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Plus, Loader2 } from 'lucide-react'
import useCrud from '@/hooks/useCrud'
import ProjectTable from '@/components/admin/ProjectTable'
import ProjectForm from '@/components/admin/ProjectForm'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

export default function ProjectManager() {
  const { items: projects, loading, addItem, updateItem, deleteItem } = useCrud('/projects', 'Project')
  const [formState, setFormState] = useState({ open: false, editing: null })
  const [deleteTarget, setDeleteTarget] = useState(null)

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

  const handleDelete = (id) => setDeleteTarget(id)
  const confirmDelete = async () => {
    if (deleteTarget) await deleteItem(deleteTarget)
    setDeleteTarget(null)
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Projects</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''} total</p>
        </div>
        <button onClick={openCreate} className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors w-full md:w-auto">
          <Plus size={16} /> Add New
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-purple-600 dark:text-purple-500 animate-spin" />
        </div>
      ) : (
        <ProjectTable projects={projects} onDelete={handleDelete} onEdit={openEdit} />
      )}

      <AnimatePresence>
        {formState.open && (
          <ProjectForm
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
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  )
}
