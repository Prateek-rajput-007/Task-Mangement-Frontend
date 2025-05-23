'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTasks } from '../contexts/TaskContext'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { formatAPIDate } from '../lib/utils'

export default function TaskForm({ task = null }) {
  const { user } = useAuth()
  const { fetchTasks } = useTasks()
  const router = useRouter()

  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'todo',
    assignedTo: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        priority: ['low', 'medium', 'high'].includes(task.priority) ? task.priority : 'medium',
        status: ['todo', 'in-progress', 'completed'].includes(task.status) ? task.status : 'todo',
        assignedTo: task.assignedTo?._id || '',
      })
    }

    const fetchUsers = async () => {
      if (user?.role === 'admin') {
        try {
          const token = localStorage.getItem('token')
          if (!token) {
            console.error('No token found in localStorage')
            toast.error('Please log in to fetch users')
            router.push('/login')
            return
          }
          const response = await axios.get('https://task-management-backend-2ifw.onrender.com/api/users', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          })
          console.log('Users fetched:', response.data.length)
          setUsers(response.data)
        } catch (error) {
          console.error('Fetch users error:', {
            message: error.message,
            response: error.response ? {
              status: error.response.status,
              data: error.response.data,
            } : null,
          })
          if (error.response?.status === 401) {
            toast.error('Unauthorized: Please log in again')
            localStorage.removeItem('token')
            router.push('/login')
          } else {
            toast.error(error.response?.data?.message || 'Failed to fetch users')
          }
        }
      }
    }

    fetchUsers()
  }, [task, user, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log('Form input changed:', { name, value, previous: formData[name] })
    
    // Sanitize priority
    let sanitizedValue = value
    if (name === 'priority' && !['low', 'medium', 'high'].includes(value)) {
      console.warn('Invalid priority value detected:', value, 'Reverting to medium')
      sanitizedValue = 'medium'
      toast.error('Priority must be low, medium, or high')
    }

    setFormData(prev => ({ ...prev, [name]: sanitizedValue }))
  }

  const validateForm = () => {
    const { title, dueDate, priority, status, assignedTo } = formData
    console.log('Validating form:', formData)
    
    if (!title.trim()) {
      toast.error("Title is required")
      return false
    }
    if (!dueDate) {
      toast.error("Due Date is required")
      return false
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      toast.error("Due Date must be in YYYY-MM-DD format")
      return false
    }
    try {
      formatAPIDate(dueDate) // Throws if invalid
    } catch (error) {
      toast.error("Due Date is invalid")
      return false
    }
    if (!['low', 'medium', 'high'].includes(priority)) {
      toast.error("Priority must be low, medium, or high")
      return false
    }
    if (!['todo', 'in-progress', 'completed'].includes(status)) {
      toast.error("Status must be todo, in-progress, or completed")
      return false
    }
    if (user?.role === 'admin' && assignedTo && !/^[0-9a-fA-F]{24}$/.test(assignedTo)) {
      toast.error("Assigned To must be a valid user")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)

    const taskData = {
      title: formData.title.trim(),
      ...(formData.description.trim() && { description: formData.description.trim() }),
      dueDate: formatAPIDate(formData.dueDate), // Ensure YYYY-MM-DD
      priority: formData.priority,
      status: formData.status,
      ...(user?.role === 'admin' && formData.assignedTo && /^[0-9a-fA-F]{24}$/.test(formData.assignedTo) && { assignedTo: formData.assignedTo }),
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found in localStorage')
      }

      if (task && !task._id) {
        throw new Error('Task ID is missing')
      }

      console.log('Raw form data:', formData)
      console.log('Submitting task request:', {
        url: task ? `https://task-management-backend-2ifw.onrender.com/api/tasks/${task._id}` : 'https://task-management-backend-2ifw.onrender.com/api/tasks',
        method: task ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: taskData,
        token: token.substring(0, 20) + '...' // Log partial token for security
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }

      let response;
      if (task) {
        response = await axios.put(
          `https://task-management-backend-2ifw.onrender.com/api/tasks/${task._id}`,
          taskData,
          config
        )
        toast.success('Task updated successfully')
      } else {
        response = await axios.post(
          'https://task-management-backend-2ifw.onrender.com/api/tasks',
          taskData,
          config
        )
        toast.success('Task created successfully')
      }
      await fetchTasks()
      router.push('/tasks')
    } catch (error) {
      console.error('API Error Details:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data,
          errors: error.response.data.errors || null,
          headers: error.response.headers,
        } : null,
      })
      const validationErrors = error?.response?.data?.errors
      if (validationErrors) {
        console.log('Validation errors:', JSON.stringify(validationErrors, null, 2))
      } else {
        console.log('Raw response data:', JSON.stringify(error?.response?.data, null, 2))
      }
      const errorMessage =
        validationErrors?.[0]?.msg ||
        error?.response?.data?.message ||
        'Failed to save task'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 dark:text-white">
      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            autoComplete="off"
            className="mt-1 block w-full rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 sm:text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            autoComplete="off"
            className="mt-1 block w-full rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 sm:text-sm"
          />
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date *</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              required
              value={formData.dueDate}
              onChange={handleChange}
              autoComplete="off"
              className="mt-1 block w-full rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 sm:text-sm"
            />
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 sm:text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 sm:text-sm"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Assign To (Only Admin) */}
          {user?.role === 'admin' && (
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assign To</label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 sm:text-sm"
              >
                <option value="">Unassigned</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push('/tasks')}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-sm rounded-md text-white bg-primary-600 hover:bg-primary-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  )
}
