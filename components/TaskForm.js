// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useTasks } from '../contexts/TaskContext'
// import { useAuth } from '../contexts/AuthContext'
// import api from '../lib/api'
// import { toast } from 'react-hot-toast'

// export default function TaskForm({ task = null }) {
//   const { user } = useAuth()
//   const { createTask, updateTask, fetchTasks } = useTasks()
//   const router = useRouter()

//   const [users, setUsers] = useState([])
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     dueDate: '',
//     priority: 'medium',
//     status: 'todo',
//     assignedTo: '',
//   })
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     if (task) {
//       setFormData({
//         title: task.title || '',
//         description: task.description || '',
//         dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
//         priority: task.priority || 'medium',
//         status: task.status || 'todo',
//         assignedTo: task.assignedTo?._id || '',
//       })
//     }

//     const fetchUsers = async () => {
//       if (user?.role === 'admin') {
//         try {
//           const { data } = await api.get('/users')
//           setUsers(data)
//         } catch {
//           toast.error('Failed to fetch users')
//         }
//       }
//     }

//     fetchUsers()
//   }, [task, user])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const validateForm = () => {
//     const { title, dueDate, priority, status } = formData
//     if (!title.trim()) {
//       toast.error("Title is required")
//       return false
//     }
//     if (!dueDate) {
//       toast.error("Due Date is required")
//       return false
//     }
//     if (!priority) {
//       toast.error("Priority must be selected")
//       return false
//     }
//     if (!status) {
//       toast.error("Status must be selected")
//       return false
//     }
//     return true
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validateForm()) return

//     setLoading(true)

//     const taskData = {
//       title: formData.title.trim(),
//       description: formData.description.trim(),
//       dueDate: new Date(formData.dueDate).toISOString(),
//       priority: formData.priority,
//       status: formData.status,
//       ...(user?.role === 'admin' && formData.assignedTo && {
//         assignedTo: formData.assignedTo,
//       }),
//     }

//     try {
//       if (task) {
//         await updateTask(task._id, taskData)
//         toast.success('Task updated successfully')
//       } else {
//         await createTask(taskData)
//         toast.success('Task created successfully')
//       }
//       await fetchTasks()
//       router.push('/tasks')
//     } catch (error) {
//       console.error('Submit error:', error)
//       const errorMessage =
//         error?.response?.data?.message ||
//         error?.response?.data?.errors?.[0]?.message ||
//         'Failed to save task'
//       toast.error(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 dark:text-white">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Title */}
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title *</label>
//           <input
//             id="title"
//             name="title"
//             type="text"
//             required
//             value={formData.title}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 sm:text-sm"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows={3}
//             value={formData.description}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 sm:text-sm"
//           />
//         </div>

//         {/* Fields Grid */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//           {/* Due Date */}
//           <div>
//             <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date *</label>
//             <input
//               id="dueDate"
//               name="dueDate"
//               type="date"
//               required
//               value={formData.dueDate}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 sm:text-sm"
//             />
//           </div>

//           {/* Priority */}
//           <div>
//             <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
//             <select
//               id="priority"
//               name="priority"
//               value={formData.priority}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 sm:text-sm"
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </div>

//           {/* Status */}
//           <div>
//             <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
//             <select
//               id="status"
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 sm:text-sm"
//             >
//               <option value="todo">To Do</option>
//               <option value="in-progress">In Progress</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           {/* Assign To (Only Admin) */}
//           {user?.role === 'admin' && (
//             <div>
//               <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assign To</label>
//               <select
//                 id="assignedTo"
//                 name="assignedTo"
//                 value={formData.assignedTo}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 sm:text-sm"
//               >
//                 <option value="">Unassigned</option>
//                 {users.map(user => (
//                   <option key={user._id} value={user._id}>{user.name}</option>
//                 ))}
//               </select>
//             </div>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-3">
//           <button
//             type="button"
//             onClick={() => router.push('/tasks')}
//             className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`px-4 py-2 text-sm rounded-md text-white bg-primary-600 hover:bg-primary-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

   
'use client'

import { createContext, useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import api from '../lib/api'

const TaskContext = createContext()

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [error, setError] = useState(null)

  const formatTaskData = (taskData) => {
    const formattedData = {
      title: taskData.title?.trim() || '',
      description: taskData.description?.trim() || '',
      dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : new Date().toISOString(),
      priority: ['low', 'medium', 'high'].includes(taskData.priority) ? taskData.priority : 'medium',
      status: ['todo', 'in-progress', 'completed'].includes(taskData.status) ? taskData.status : 'todo',
      assignedTo: taskData.assignedTo && taskData.assignedTo !== '' ? taskData.assignedTo : null,
    }
    if (!['low', 'medium', 'high'].includes(formattedData.priority)) {
      console.error('Invalid priority detected:', taskData.priority);
    }
    console.log('Formatted task data:', JSON.stringify(formattedData, null, 2))
    return formattedData
  }

  const fetchTasks = async (params = {}) => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching tasks with params:', params)
      const { data } = await api.get('/tasks', { params })
      setTasks(data)
      return data
    } catch (error) {
      console.error('Fetch tasks error:', error)
      console.error('Error details:', {
        status: error.response?.status,
        data: JSON.stringify(error.response?.data, null, 2),
      })
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to fetch tasks'
      const errors = error.response?.data?.errors?.map(err => err.msg || err) || []
      setError(errors.length > 0 ? errors.join(', ') : errorMessage)
      toast.error(errors.length > 0 ? errors.join(', ') : errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const fetchTaskStats = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching task stats')
      const { data } = await api.get('/tasks/stats')
      setStats(data)
      return data
    } catch (error) {
      console.error('Fetch stats error:', error)
      console.error('Error details:', {
        status: error.response?.status,
        data: JSON.stringify(error.response?.data, null, 2),
      })
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to fetch stats'
      const errors = error.response?.data?.errors?.map(err => err.msg || err) || []
      setError(errors.length > 0 ? errors.join(', ') : errorMessage)
      toast.error(errors.length > 0 ? errors.join(', ') : errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching notifications')
      const { data } = await api.get('/notifications')
      setNotifications(data)
      return data
    } catch (error) {
      console.error('Fetch notifications error:', error)
      console.error('Error details:', {
        status: error.response?.status,
        data: JSON.stringify(error.response?.data, null, 2),
      })
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to fetch notifications'
      const errors = error.response?.data?.errors?.map(err => err.msg || err) || []
      setError(errors.length > 0 ? errors.join(', ') : errorMessage)
      toast.error(errors.length > 0 ? errors.join(', ') : errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (taskData) => {
    try {
      setLoading(true)
      setError(null)
      const formattedData = formatTaskData(taskData)
      console.log('Creating task with data:', JSON.stringify(formattedData, null, 2))
      const { data } = await api.post('/tasks', formattedData)
      setTasks(prev => [data, ...prev])
      
      if (formattedData.assignedTo) {
        await fetchNotifications()
      }
      
      toast.success('Task created successfully!')
      return data
    } catch (error) {
      console.error('Create task error:', error)
      console.error('Error details:', {
        status: error.response?.status,
        data: JSON.stringify(error.response?.data, null, 2),
      })
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to create task'
      const errors = error.response?.data?.errors?.map(err => err.msg || err) || []
      setError(errors.length > 0 ? errors.join(', ') : errorMessage)
      toast.error(errors.length > 0 ? errors.join(', ') : errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateTask = async (id, taskData) => {
    try {
      setLoading(true)
      setError(null)
      const formattedData = formatTaskData(taskData)
      console.log('Updating task with ID:', id, 'and data:', JSON.stringify(formattedData, null, 2))
      const { data } = await api.put(`/tasks/${id}`, formattedData)
      setTasks(prev => prev.map(task => task._id === id ? data : task))
      
      const originalTask = tasks.find(t => t._id === id)
      if (formattedData.assignedTo !== originalTask?.assignedTo?._id) {
        await fetchNotifications()
      }
      
      toast.success('Task updated successfully!')
      return data
    } catch (error) {
      console.error('Update task error:', error)
      console.error('Error details:', {
        status: error.response?.status,
        data: JSON.stringify(error.response?.data, null, 2),
      })
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to update task'
      const errors = error.response?.data?.errors?.map(err => err.msg || err) || []
      setError(errors.length > 0 ? errors.join(', ') : errorMessage)
      toast.error(errors.length > 0 ? errors.join(', ') : errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteTask = async (id) => {
    try {
      setLoading(true)
      setError(null)
      console.log('Deleting task with ID:', id)
      await api.delete(`/tasks/${id}`)
      setTasks(prev => prev.filter(task => task._id !== id))
      toast.success('Task deleted successfully!')
    } catch (error) {
      console.error('Delete task error:', error)
      console.error('Error details:', {
        status: error.response?.status,
        data: JSON.stringify(error.response?.data, null, 2),
      })
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to delete task'
      const errors = error.response?.data?.errors?.map(err => err.msg || err) || []
      setError(errors.length > 0 ? errors.join(', ') : errorMessage)
      toast.error(errors.length > 0 ? errors.join(', ') : errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const markNotificationAsRead = async (id) => {
    try {
      setLoading(true)
      setError(null)
      console.log('Marking notification as read with ID:', id)
      const { data } = await api.put(`/notifications/${id}`, { read: true })
      setNotifications(prev => prev.map(n => n._id === id ? data : n))
      toast.success('Notification marked as read!')
    } catch (error) {
      console.error('Mark notification read error:', error)
      console.error('Error details:', {
        status: error.response?.status,
        data: JSON.stringify(error.response?.data, null, 2),
      })
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to update notification'
      const errors = error.response?.data?.errors?.map(err => err.msg || err) || []
      setError(errors.length > 0 ? errors.join(', ') : errorMessage)
      toast.error(errors.length > 0 ? errors.join(', ') : errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <TaskContext.Provider value={{
      tasks,
      stats,
      notifications,
      loading,
      error,
      selectedTask,
      setSelectedTask,
      fetchTasks,
      fetchTaskStats,
      fetchNotifications,
      createTask,
      updateTask,
      deleteTask,
      markNotificationAsRead
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}
