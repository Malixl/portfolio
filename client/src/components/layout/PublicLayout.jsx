import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 pb-24">
      <Outlet />
      <BottomNav />
    </div>
  )
}
