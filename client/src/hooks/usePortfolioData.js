import { useState, useEffect } from 'react'
import api from '../services/api'

export default function usePortfolioData() {
    const [data, setData] = useState({
        profile: null,
        skills: [],
        experience: [],
        education: [],
        projects: [],
        blogs: [],
        certificates: [],
        loading: true,
    })

    useEffect(() => {
        Promise.allSettled([
            api.get('/profile'),
            api.get('/skills'),
            api.get('/experiences'),
            api.get('/educations'),
            api.get('/projects'),
            api.get('/blogs'),
            api.get('/certificates'),
        ]).then(([profileRes, skillsRes, expRes, eduRes, projRes, blogRes, certRes]) => {
            setData({
                profile: profileRes.status === 'fulfilled' ? profileRes.value.data.data : null,
                skills: skillsRes.status === 'fulfilled' ? skillsRes.value.data.data : [],
                experience: expRes.status === 'fulfilled' ? expRes.value.data.data : [],
                education: eduRes.status === 'fulfilled' ? eduRes.value.data.data : [],
                projects: projRes.status === 'fulfilled' ? projRes.value.data.data : [],
                blogs: blogRes.status === 'fulfilled' ? blogRes.value.data.data : [],
                certificates: certRes.status === 'fulfilled' ? certRes.value.data.data : [],
                loading: false,
            })
        })
    }, [])

    return data
}
