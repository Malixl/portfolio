import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'

// Persistent subtle background pattern for all pages
function PageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: 0.04,
        }}
      />

      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="page-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#page-grid)" />
      </svg>

      {/* Top-right ambient glow */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-purple-400/[0.04] dark:bg-purple-500/[0.03] rounded-full blur-3xl" />

      {/* Bottom-left ambient glow */}
      <div className="absolute -bottom-48 -left-32 w-[400px] h-[400px] bg-blue-400/[0.04] dark:bg-blue-500/[0.03] rounded-full blur-3xl" />

      {/* Middle accent */}
      <div className="absolute top-1/2 right-0 w-[300px] h-[600px] bg-pink-400/[0.02] dark:bg-pink-500/[0.02] rounded-full blur-3xl -translate-y-1/2" />
    </div>
  )
}

export default function PublicLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className={`${isHome ? 'h-svh overflow-hidden' : 'min-h-svh pb-24'} bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300`}>
      {/* Only show persistent background on non-home pages (home has its own hero bg) */}
      {!isHome && <PageBackground />}
      <div className="relative z-10">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}
