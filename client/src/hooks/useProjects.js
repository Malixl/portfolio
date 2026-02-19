import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import api from '../services/api'

export default function useProjects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await api.get('/projects')
            setProjects(res.data.data)
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to fetch projects'
            setError(msg)
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }, [])

    const addProject = useCallback(async (data) => {
        const payload = {
            ...data,
            techStack: data.techStack
                ? data.techStack.split(',').map((t) => t.trim()).filter(Boolean)
                : [],
        }
        const res = await api.post('/projects', payload)
        toast.success('Project created!')
        await fetchProjects()
        return res.data
    }, [fetchProjects])

    const deleteProject = useCallback(async (id) => {
        await api.delete(`/projects/${id}`)
        toast.success('Project deleted')
        await fetchProjects()
    }, [fetchProjects])

    // Auto-fetch on mount
    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    return { projects, loading, error, fetchProjects, addProject, deleteProject }
}
