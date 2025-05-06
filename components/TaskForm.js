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

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTasks } from '../contexts/TaskContext'
import { useAuth } from '../contexts/AuthContext'
import api from '../lib/api'
import { toast } from 'react-hot-toast'

export default function TaskForm({ task = null }) {
  const { user } = useAuth()
  const { createTask, updateTask, fetchTasks } = useTasks()
  const router = useRouter()

  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: task ? new Date(task.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    priority: 'medium',
    status: 'todo',
    assignedTo: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        priority: task.priority || 'medium',
        status: task.status || 'todo',
        assignedTo: task.assignedTo?._id || '',
      })
    }

    if (user?.role === 'admin') {
      const fetchUsers = async () => {
        try {
          console.log('Fetching users for admin') // Debug log
          const { data } = await api.get('/users')
          setUsers(data)
        } catch (error) {
          console.error('Fetch users error:', error)
          toast.error(error.response?.data?.message || 'Failed to fetch users')
        }
      }
      fetchUsers()
    }
  }, [task, user])

  const validateForm = () => {
    const errors = {}
    if (!formData.title.trim()) {
      errors.title = 'Title is required'
    }
    if (!formData.dueDate) {
      errors.dueDate = 'Due date is required'
    } else if (isNaN(new Date(formData.dueDate).getTime())) {
      errors.dueDate = 'Invalid due date'
    }
    if (user?.role === 'admin' && formData.assignedTo && !users.some(u => u._id === formData.assignedTo)) {
      errors.assignedTo = 'Invalid user selected'
    }
    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setFormErrors(prev => ({ ...prev, [name]: null })) // Clear error on change
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      toast.error('Please fix form errors')
      return
    }

    setLoading(true)
    try {
      const taskData = {
        title: formData.title,
        description: formData.description,
        dueDate: new Date(formData.dueDate).toISOString(),
        priority: formData.priority,
        status: formData.status,
        ...(user?.role === 'admin' && formData.assignedTo && { assignedTo: formData.assignedTo }),
      }
      console.log('Submitting task data:', taskData) // Debug log

      if (task) {
        await updateTask(task._id, taskData)
      } else {
        await createTask(taskData)
      }

      await fetchTasks()
      toast.success(task ? 'Task updated successfully!' : 'Task created successfully!')
      router.push('/tasks')
    } catch (error) {
      console.error('Submit error:', error)
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
      })
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to save task'
      const errors = error.response?.data?.errors?.map(err => err.msg || err) || []
      toast.error(errors.length > 0 ? errors.join(', ') : errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 dark:text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title *</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 sm:text-sm ${
              formErrors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {formErrors.title && <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date *</label>
            <input
              type="date"
              name="dueDate"
              required
              value={formData.dueDate}
              onChange={handleChange}
              className={`mt-1 block w-full border rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 sm:text-sm ${
                formErrors.dueDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {formErrors.dueDate && <p className="mt-1 text-sm text-red-500">{formErrors.dueDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 sm:text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 sm:text-sm"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {user?.role === 'admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assign To</label>
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 sm:text-sm ${
                  formErrors.assignedTo ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Unassigned</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
              {formErrors.assignedTo && <p className="mt-1 text-sm text-red-500">{formErrors.assignedTo}</p>}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push('/tasks')}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  )
}
