import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import { PortfolioProvider } from "./context/PortfolioContext";
import ScrollToTop from "./components/layout/ScrollToTop";
import PublicLayout from "./components/layout/PublicLayout";

import { Suspense, lazy } from "react";
import LoadingScreen from "./components/ui/LoadingScreen";

// Pages (Lazy Loaded for better performance)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const CertificateDetail = lazy(() => import("./pages/CertificateDetail"));
import AdminLayout from "./components/admin/AdminLayout";

// Admin Pages (Lazy Loaded)
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ProjectManager = lazy(() => import("./pages/admin/ProjectManager"));
const SkillManager = lazy(() => import("./pages/admin/SkillManager"));
const ExperienceManager = lazy(() => import("./pages/admin/ExperienceManager"));
const EducationManager = lazy(() => import("./pages/admin/EducationManager"));
const BlogManager = lazy(() => import("./pages/admin/BlogManager"));
const AchievementManager = lazy(() => import("./pages/admin/AchievementManager"));
const CertificateManager = lazy(() => import("./pages/admin/CertificateManager"));
const ProfileManager = lazy(() => import("./pages/admin/ProfileManager"));

// Route Guard
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PortfolioProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#1a1a1a",
                  color: "#fff",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "14px",
                },
              }}
            />

            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                {/* Public */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/blogs/:id" element={<BlogDetail />} />
                </Route>

                {/* Certificate Preview — No Navbar/Footer */}
                <Route path="/experience/certificate/:id" element={<CertificateDetail />} />

                {/* Auth - No Navbar/Footer */}
                <Route path="/login" element={<Login />} />

                {/* Admin */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
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
            </Suspense>
          </BrowserRouter>
        </PortfolioProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
