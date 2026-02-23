import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import CustomSelect from '@/components/admin/CustomSelect'
import SearchableMultiSelect from '@/components/admin/SearchableMultiSelect'
import RichTextEditor from '@/components/admin/RichTextEditor'
import api from '@/services/api'
import ImageUpload from '@/components/admin/ImageUpload'

const CATEGORIES = [
  { value: 'Multi Platform App', label: 'Multi Platform App' },
  { value: 'Mobile App', label: 'Mobile App' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Frontend Web', label: 'Frontend Web' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Game', label: 'Game' },
  { value: 'AI', label: 'AI' },
  { value: '3D', label: '3D' },
  { value: 'Video Editing', label: 'Video Editing' },
  { value: 'Motion Graphics', label: 'Motion Graphics' },
  { value: 'Logo Design', label: 'Logo Design' },
  { value: 'Product Design', label: 'Product Design' },
  { value: 'Redesign', label: 'Redesign' },
  { value: 'Graphic Design', label: 'Graphic Design' },
  { value: 'UI Design', label: 'UI Design' },
  { value: 'Other', label: 'Other' },
]

const STATIC_RELATED = [
  { value: 'Solo (Have Fun Project)', label: 'Solo (Have Fun Project)' },
  { value: 'Freelance', label: 'Freelance' },
]

export default function ProjectForm({ onSubmit, onCancel, initial = null }) {
  const [submitting, setSubmitting] = useState(false)
  const [skillOptions, setSkillOptions] = useState({ tech: [], hard: [], soft: [] })
  const [relatedOptions, setRelatedOptions] = useState(STATIC_RELATED)
  const isEdit = !!initial

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    defaultValues: initial
      ? {
          title: initial.title || '',
          description: initial.description || '',
          content: initial.content || '',
          image: initial.image || '',
          category: initial.category || '',
          relatedTo: initial.relatedTo || '',
          techStack: initial.techStack || [],
          hardSkills: initial.hardSkills || [],
          softSkills: initial.softSkills || [],
          // Auto-migrate old links if 'links' array is empty/missing
          links: initial.links && initial.links.length > 0
            ? initial.links
            : [
                ...(initial.demoLink ? [{ label: 'Live Demo', url: initial.demoLink }] : []),
                ...(initial.repoLink ? [{ label: 'GitHub', url: initial.repoLink }] : []),
              ],
        }
      : {
          techStack: [],
          hardSkills: [],
          softSkills: [],
          links: [],
        },
  })

  // Fetch skills + experiences + educations from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, expRes, eduRes] = await Promise.all([
          api.get('/skills'),
          api.get('/experiences'),
          api.get('/educations'),
        ])

        const skills = skillsRes.data.data || []
        setSkillOptions({
          tech: skills
            .filter((s) => s.type === 'tech')
            .map((s) => ({ value: s.name, label: s.name })),
          hard: skills
            .filter((s) => s.type === 'hardskill')
            .map((s) => ({ value: s.name, label: s.name })),
          soft: skills
            .filter((s) => s.type === 'softskill')
            .map((s) => ({ value: s.name, label: s.name })),
        })

        // Build relatedTo options from existing data
        const experiences = expRes.data.data || []
        const educations = eduRes.data.data || []

        const careerOpts = experiences.map((e) => ({
          value: `Career — ${e.role} di ${e.company}`,
          label: `Career — ${e.role} di ${e.company}`,
        }))

        const eduOpts = educations.map((e) => ({
          value: `Education — ${e.degree} di ${e.institution}`,
          label: `Education — ${e.degree} di ${e.institution}`,
        }))

        setRelatedOptions([...STATIC_RELATED, ...careerOpts, ...eduOpts])
      } catch {
        // silently fail — dropdowns will just show static options
      }
    }
    fetchData()
  }, [])

  const onForm = async (data) => {
    try {
      setSubmitting(true)
      await onSubmit(data)
      onCancel()
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel} />
      <motion.div
        className="relative w-[90vw] max-w-2xl bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-white/10 rounded-2xl max-h-[90vh] flex flex-col shadow-2xl shadow-black/20 dark:shadow-none"
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.97 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10 shrink-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {isEdit ? 'Edit Project' : 'New Project'}
          </h2>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-gray-500 dark:text-white/50" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onForm)} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 space-y-4 overflow-y-auto no-scrollbar flex-1">
          {/* Title */}
          <div>
            <label className="admin-label">Title *</label>
            <input
              {...register('title', { required: 'Required' })}
              className="input-field"
              placeholder="My Awesome Project"
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="admin-label">Description</label>
            <textarea
              {...register('description')}
              className="input-field min-h-[80px] resize-none"
              placeholder="A brief description of the project..."
              rows={3}
            />
            <p className="text-gray-400 dark:text-white/20 text-xs mt-1">Short summary shown on landing page</p>
          </div>

          {/* Content (TinyMCE) */}
          <div>
            <label className="admin-label">Content</label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write detailed project description..."
                  height={250}
                />
              )}
            />
          </div>

          {/* Image Upload */}
          <ImageUpload
            value={watch('image')}
            onChange={(url) => setValue('image', url, { shouldDirty: true })}
            label="Project Image"
          />

          {/* Category + Related To */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Category</label>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomSelect
                    options={CATEGORIES}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select category..."
                  />
                )}
              />
            </div>
            <div>
              <label className="admin-label">Related To</label>
              <Controller
                name="relatedTo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomSelect
                    options={relatedOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select..."
                  />
                )}
              />
            </div>
          </div>

          {/* Tech Stack — from existing skills data */}
          <div>
            <label className="admin-label">Tech Stack</label>
            <Controller
              name="techStack"
              control={control}
              render={({ field }) => (
                <SearchableMultiSelect
                  options={skillOptions.tech}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select technologies..."
                />
              )}
            />
            <p className="text-gray-400 dark:text-white/20 text-xs mt-1">
              Select from your added technologies
            </p>
          </div>

          {/* Hard Skills — from existing skills data */}
          <div>
            <label className="admin-label">Hard Skills</label>
            <Controller
              name="hardSkills"
              control={control}
              render={({ field }) => (
                <SearchableMultiSelect
                  options={skillOptions.hard}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select hard skills..."
                />
              )}
            />
          </div>

          {/* Soft Skills — from existing skills data */}
          <div>
            <label className="admin-label">Soft Skills</label>
            <Controller
              name="softSkills"
              control={control}
              render={({ field }) => (
                <SearchableMultiSelect
                  options={skillOptions.soft}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select soft skills..."
                />
              )}
            />
          </div>

          {/* Universal Links */}
          <div className="space-y-3">
             <div className="flex items-center justify-between">
              <label className="admin-label">Project Links</label>
              <button
                type="button"
                onClick={() => {
                  const currentLinks = watch('links') || []
                  setValue('links', [...currentLinks, { label: 'Live Demo', url: '' }])
                }}
                className="text-xs text-purple-600 font-medium hover:text-purple-700 dark:text-purple-400"
              >
                + Add Link
              </button>
             </div>
             
             <Controller
               name="links"
               control={control}
               render={({ field }) => (
                 <div className="space-y-3">
                   {(field.value || []).map((link, index) => (
                     <div key={index} className="flex gap-3 items-start">
                        <div className="w-1/3">
                          <input
                            placeholder="Label (e.g. GitHub)"
                            value={link.label}
                            onChange={(e) => {
                              const newLinks = [...field.value]
                              newLinks[index].label = e.target.value
                              field.onChange(newLinks)
                            }}
                            className="input-field text-sm"
                          />
                        </div>
                        <div className="flex-1">
                           <input
                            placeholder="https://..."
                            value={link.url}
                            onChange={(e) => {
                              const newLinks = [...field.value]
                              newLinks[index].url = e.target.value
                              field.onChange(newLinks)
                            }}
                            className="input-field text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                             const newLinks = field.value.filter((_, i) => i !== index)
                             field.onChange(newLinks)
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={16} />
                        </button>
                     </div>
                   ))}
                   <button
                     type="button"
                     onClick={() => field.onChange([...(field.value || []), { label: '', url: '' }])}
                     className="w-full py-2 border border-dashed border-gray-300 dark:border-white/20 rounded-lg text-sm text-gray-500 hover:text-purple-600 hover:border-purple-300 dark:text-white/40 dark:hover:text-purple-400 transition-all flex items-center justify-center gap-2"
                   >
                     + Add Link
                   </button>
                 </div>
               )}
             />
          </div>

          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-100 dark:border-white/10 shrink-0">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-white/50 dark:hover:text-white/80 dark:hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Saving...
                </>
              ) : isEdit ? (
                'Save Changes'
              ) : (
                'Create Project'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
