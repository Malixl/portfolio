import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const PortfolioContext = createContext()

export function PortfolioProvider({ children }) {
  const [data, setData] = useState({
    profile: null,
    skills: [],
    experience: [],
    education: [],
    projects: [],
    blogs: [],
    certificates: [],
    achievements: [],
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, skillsRes, expRes, eduRes, projRes, blogRes, certRes, achRes] = await Promise.allSettled([
          api.get('/profile'),
          api.get('/skills'),
          api.get('/experiences'),
          api.get('/educations'),
          api.get('/projects'),
          api.get('/blogs'),
          api.get('/certificates'),
          api.get('/achievements'),
        ])

        setData({
          profile: profileRes.status === 'fulfilled' ? profileRes.value.data.data : null,
          skills: skillsRes.status === 'fulfilled' ? skillsRes.value.data.data : [],
          experience: expRes.status === 'fulfilled' ? expRes.value.data.data : [],
          education: eduRes.status === 'fulfilled' ? eduRes.value.data.data : [],
          projects: projRes.status === 'fulfilled' ? projRes.value.data.data : [],
          blogs: blogRes.status === 'fulfilled' ? blogRes.value.data.data : [],
          certificates: certRes.status === 'fulfilled' ? certRes.value.data.data : [],
          achievements: achRes.status === 'fulfilled' ? achRes.value.data.data : [],
          loading: false,
        })
      } catch (error) {
        console.error('Error fetching portfolio data:', error)
        setData(prev => ({ ...prev, loading: false }))
      }
    }

    fetchData()
  }, [])

  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolioData() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolioData must be used within a PortfolioProvider')
  }
  return context
}
