import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import api from '../services/api'

/**
 * Generic CRUD hook factory.
 * @param {string} endpoint - API path, e.g. '/skills'
 * @param {string} label    - Human label for toasts, e.g. 'Skill'
 */
export default function useCrud(endpoint, label = 'Item') {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchItems = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await api.get(endpoint)
            setItems(res.data.data)
        } catch (err) {
            const msg = err.response?.data?.message || `Failed to fetch ${label.toLowerCase()}s`
            setError(msg)
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }, [endpoint, label])

    const addItem = useCallback(async (data) => {
        const res = await api.post(endpoint, data)
        toast.success(`${label} created!`)
        await fetchItems()
        return res.data
    }, [endpoint, label, fetchItems])

    const updateItem = useCallback(async (id, data) => {
        const res = await api.put(`${endpoint}/${id}`, data)
        toast.success(`${label} updated!`)
        await fetchItems()
        return res.data
    }, [endpoint, label, fetchItems])

    const deleteItem = useCallback(async (id) => {
        await api.delete(`${endpoint}/${id}`)
        toast.success(`${label} deleted`)
        await fetchItems()
    }, [endpoint, label, fetchItems])

    useEffect(() => { fetchItems() }, [fetchItems])

    return { items, loading, error, fetchItems, addItem, updateItem, deleteItem }
}
