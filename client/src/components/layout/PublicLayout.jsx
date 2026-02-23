import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function PublicLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className={`${isHome ? 'h-svh overflow-hidden' : 'min-h-svh pb-24'} bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300`}>
      <Outlet />
      <BottomNav />
    </div>
  )
}
