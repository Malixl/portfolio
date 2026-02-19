import { Trash2, Pencil, ExternalLink, Github, ImageOff } from 'lucide-react'

export default function ProjectTable({ projects = [], onDelete, onEdit }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl">
        <ImageOff size={40} className="text-gray-300 dark:text-white/10 mx-auto mb-3" />
        <p className="text-gray-500 dark:text-white/30 text-lg">No projects found</p>
        <p className="text-gray-400 dark:text-white/15 text-sm mt-1">Click "Add New" to create your first project</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/5">
              <th className="th-cell">Image</th>
              <th className="th-cell">Title</th>
              <th className="th-cell hidden md:table-cell">Category</th>
              <th className="th-cell hidden lg:table-cell">Stack</th>
              <th className="th-cell hidden md:table-cell">Links</th>
              <th className="th-cell text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project._id}
                className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
              >
                <td className="td-cell">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-12 h-12 rounded-lg object-cover"
                      onError={(e) => { e.target.style.display = 'none' }} />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                      <ImageOff size={16} className="text-gray-400 dark:text-white/20" />
                    </div>
                  )}
                </td>
                <td className="td-cell">
                  <p className="text-gray-900 dark:text-white font-medium text-sm">{project.title}</p>
                  <p className="text-gray-500 dark:text-white/30 text-xs line-clamp-1 mt-0.5 max-w-[200px]">{project.description}</p>
                </td>
                <td className="td-cell hidden md:table-cell">
                  <span className="px-2 py-0.5 text-[10px] font-medium bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300 rounded-full">
                    {project.category || 'General'}
                  </span>
                </td>
                <td className="td-cell hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {(project.techStack || []).slice(0, 3).map((tech) => (
                      <span key={tech} className="px-1.5 py-0.5 text-[10px] bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-white/40 rounded">{tech}</span>
                    ))}
                    {(project.techStack || []).length > 3 && (
                      <span className="text-gray-400 dark:text-white/20 text-[10px]">+{project.techStack.length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="td-cell hidden md:table-cell">
                  <div className="flex gap-2">
                    {/* Universal Links */}
                    {(project.links || []).map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-purple-600 dark:text-white/30 dark:hover:text-purple-400 transition-colors"
                        title={link.label}
                      >
                        {link.label.toLowerCase().includes('github') || link.url.includes('github.com') ? <Github size={14} /> : <ExternalLink size={14} />}
                      </a>
                    ))}
                    
                    {/* Fallback for old data if links array is empty */}
                    {(!project.links || project.links.length === 0) && (
                      <>
                        {project.demoLink && (
                          <a href={project.demoLink} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-purple-600 dark:text-white/30 dark:hover:text-purple-400 transition-colors" title="Demo">
                            <ExternalLink size={14} />
                          </a>
                        )}
                        {project.repoLink && (
                          <a href={project.repoLink} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-purple-600 dark:text-white/30 dark:hover:text-purple-400 transition-colors" title="Repo">
                            <Github size={14} />
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </td>
                <td className="td-cell text-right">
                  <div className="flex items-center justify-end gap-0.5">
                    <button
                      onClick={() => onEdit(project)}
                      className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/10 transition-all"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(project._id)}
                      className="p-2 rounded-lg text-red-400/70 hover:text-red-600 hover:bg-red-500/10 dark:text-red-400/70 dark:hover:text-red-400 dark:hover:bg-red-500/15 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
