import { usePortfolioData } from '../context/PortfolioContext'
import Hero from '../components/home/Hero'
import SEO from '../components/SEO'


export default function Home() {
  const { profile, loading } = usePortfolioData()

  if (loading) return <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center text-purple-600">Loading...</div>

  return (
    <>
      <SEO 
        title="Home"
        description={profile?.bio || "Portfolio of Malik, a passionate Full Stack Developer."}
        keywords="Full Stack Developer, Malik, Portfolio, Web Development"
      />
      {/* Landing Hero */}
      <Hero profile={profile} />
      
      {/* Optional: We could add a "Highlights" section here if requested, 
          but for now keeping it clean as per "page / (home alias root)" request which usually implies landing.
          The other pages hold the content. 
      */}
    </>
  )
}
