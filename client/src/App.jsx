import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

import { PortfolioProvider } from './context/PortfolioContext'
import ScrollToTop from './components/layout/ScrollToTop'
import PublicLayout from './components/layout/PublicLayout'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import Login from './pages/Login'
import ProjectDetail from './pages/ProjectDetail'
import BlogDetail from './pages/BlogDetail'
import AdminLayout from './components/admin/AdminLayout'

// Admin Pages
import Dashboard from './pages/admin/Dashboard'
import ProjectManager from './pages/admin/ProjectManager'
import SkillManager from './pages/admin/SkillManager'
import ExperienceManager from './pages/admin/ExperienceManager'
import EducationManager from './pages/admin/EducationManager'
import BlogManager from './pages/admin/BlogManager'
import AchievementManager from './pages/admin/AchievementManager'
import CertificateManager from './pages/admin/CertificateManager'
import ProfileManager from './pages/admin/ProfileManager'

// Route Guard
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster position="top-right" toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: '14px',
            },
          }} />

          <Routes>
            {/* Public */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
            </Route>

            {/* Admin */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectManager />} />
              <Route path="skills" element={<SkillManager />} />
              <Route path="experience" element={<ExperienceManager />} />
              <Route path="education" element={<EducationManager />} />
              <Route path="certificates" element={<CertificateManager />} />
              <Route path="blogs" element={<BlogManager />} />
              <Route path="achievements" element={<AchievementManager />} />
              <Route path="profile" element={<ProfileManager />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
    </ThemeProvider>
  )
}
