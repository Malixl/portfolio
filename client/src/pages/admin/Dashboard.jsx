import { FolderKanban, Gamepad2, Briefcase, GraduationCap, BookOpen, Award } from 'lucide-react'
import { Link } from 'react-router-dom'

const MODULES = [
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban, color: 'text-red-400', bg: 'bg-red-500/10' },
  { to: '/admin/skills', label: 'Skills', icon: Gamepad2, color: 'text-green-400', bg: 'bg-green-500/10' },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { to: '/admin/education', label: 'Education', icon: GraduationCap, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { to: '/admin/blogs', label: 'Blogs', icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { to: '/admin/achievements', label: 'Certificates', icon: Award, color: 'text-orange-400', bg: 'bg-orange-500/10' },
]

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Manage your portfolio content</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {MODULES.map(({ to, label, icon: Icon, color, bg }) => (
          <Link
            key={to}
            to={to}
            className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl p-6 hover:border-purple-500/30 dark:hover:border-white/15 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none transition-all group"
          >
            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <Icon size={22} className={color} />
            </div>
            <h3 className="text-gray-900 dark:text-white font-semibold">{label}</h3>
            <p className="text-gray-500 dark:text-white/30 text-sm mt-1">Manage {label.toLowerCase()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
