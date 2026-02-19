import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Save, User, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import api from '@/services/api'
import toast from 'react-hot-toast'
import ImageUpload from '@/components/admin/ImageUpload'
import FileUpload from '@/components/admin/FileUpload'

export default function ProfileManager() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm()
  const watchedAvatar = watch('avatar')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile')
        if (res.data.data) {
          reset(res.data.data)
        }
      } catch (error) {
        toast.error('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [reset])

  const onSubmit = async (data) => {
    try {
      setSaving(true)
      await api.put('/profile', data)
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 lg:px-8 px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <User className="text-purple-600 dark:text-purple-500" /> User Profile
        </h1>
      </div>

      <motion.div
        className="bg-white dark:bg-[#111]/40 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-gray-200 dark:border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-white/60">Full Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="e.g. Malik"
              />
              {errors.name && <span className="text-red-500 dark:text-red-400 text-xs">{errors.name.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-white/60">Headline (Roles)</label>
              <input
                {...register('headline')}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="e.g. Developer, Designer, Creator (Separate with comma)"
              />
              <p className="text-xs text-gray-400">Separate multiple roles with commas (e.g. "Dev, Designer")</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-white/60">Location</label>
              <input
                {...register('location')}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="e.g. Indonesia 🇮🇩"
              />
            </div>

             <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-white/60">Status</label>
              <input
                {...register('status')}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="e.g. Open to Create"
              />
            </div>
          </div>



          <ImageUpload
            value={watchedAvatar}
            onChange={(url) => setValue('avatar', url, { shouldDirty: true })}
            label="Profile Photo"
          />

          <div className="space-y-2">
            <label className="text-sm text-gray-500 dark:text-white/60">Bio</label>
            <textarea
              {...register('bio')}
              rows={4}
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* CV / Resume */}
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-white/10">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/80">CV / Resume</h3>
            <FileUpload
              value={watch('resumeLink')}
              onChange={(url) => setValue('resumeLink', url, { shouldDirty: true })}
              label="CV ATS (PDF)"
            />
          </div>

          {/* Social Links */}
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-white/10">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/80">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-500 dark:text-white/60">GitHub URL</label>
                <input
                  {...register('socialLinks.github')}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500 dark:text-white/60">LinkedIn URL</label>
                <input
                  {...register('socialLinks.linkedin')}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500 dark:text-white/60">Instagram URL</label>
                <input
                  {...register('socialLinks.instagram')}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500 dark:text-white/60">Behance URL</label>
                <input
                  {...register('socialLinks.behance')}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="https://behance.net/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500 dark:text-white/60">Email</label>
                <input
                  {...register('socialLinks.email')}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
             <button
              type="submit"
              disabled={saving}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  )
}
