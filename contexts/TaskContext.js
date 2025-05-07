// // client/contexts/TaskContext.jsx
// 'use client'

// import { createContext, useContext, useState, useEffect } from 'react'
// import { toast } from 'react-hot-toast' // Updated import
// import api from '../lib/api'

// const TaskContext = createContext()

// export function TaskProvider({ children }) {
//   const [tasks, setTasks] = useState([])
//   const [stats, setStats] = useState(null)
//   const [notifications, setNotifications] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [selectedTask, setSelectedTask] = useState(null)
//   const [error, setError] = useState(null)

//   // Format task data before sending to API
//   const formatTaskData = (taskData) => {
//     return {
//       ...taskData,
//       dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
//       // Ensure assignedTo is either a valid ID or null/undefined
//       assignedTo: taskData.assignedTo || undefined
//     }
//   }

//   const fetchTasks = async (params = {}) => {
//     try {
//       setLoading(true)
//       setError(null)
//       const { data } = await api.get('/tasks', { params })
//       setTasks(data)
//       return data
//     } catch (error) {
//       console.error('Fetch tasks error:', error)
//       setError(error.response?.data?.message || 'Failed to fetch tasks')
//       toast.error(error.response?.data?.message || 'Failed to fetch tasks') // Updated notification
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchTaskStats = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const { data } = await api.get('/tasks/stats')
//       setStats(data)
//       return data
//     } catch (error) {
//       console.error('Fetch stats error:', error)
//       setError(error.response?.data?.message || 'Failed to fetch stats')
//       toast.error(error.response?.data?.message || 'Failed to fetch stats') // Updated notification
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchNotifications = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const { data } = await api.get('/notifications')
//       setNotifications(data)
//       return data
//     } catch (error) {
//       console.error('Fetch notifications error:', error)
//       setError(error.response?.data?.message || 'Failed to fetch notifications')
//       toast.error(error.response?.data?.message || 'Failed to fetch notifications') // Updated notification
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const createTask = async (taskData) => {
//     try {
//       setLoading(true)
//       setError(null)
//       const formattedData = formatTaskData(taskData)
//       console.log('Creating task with data:', formattedData) // Debug log
      
//       const { data } = await api.post('/tasks', formattedData)
//       setTasks(prev => [data, ...prev])
      
//       // If task is assigned to someone other than creator, create notification
//       if (formattedData.assignedTo) {
//         await fetchNotifications()
//       }
      
//       toast.success('Task created successfully!') // Toast for task creation
//       return data
//     } catch (error) {
//       console.error('Create task error:', error)
//       console.error('Error details:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         headers: error.response?.headers
//       })
      
//       const errorMessage = error.response?.data?.message || 
//                          error.response?.data?.error || 
//                          'Failed to create task'
//       setError(errorMessage)
//       toast.error(errorMessage) // Toast for task creation failure
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const updateTask = async (id, taskData) => {
//     try {
//       setLoading(true)
//       setError(null)
//       const formattedData = formatTaskData(taskData)
//       console.log('Updating task with data:', formattedData) // Debug log
      
//       const { data } = await api.put(`/tasks/${id}`, formattedData)
//       setTasks(prev => prev.map(task => task._id === id ? data : task))
      
//       // If assignment changed, refresh notifications
//       if (formattedData.assignedTo !== tasks.find(t => t._id === id)?.assignedTo?._id) {
//         await fetchNotifications()
//       }
      
//       toast.success('Task updated successfully!') // Toast for task update
//       return data
//     } catch (error) {
//       console.error('Update task error:', error)
//       console.error('Error details:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         headers: error.response?.headers
//       })
      
//       const errorMessage = error.response?.data?.message || 
//                          error.response?.data?.error || 
//                          'Failed to update task'
//       setError(errorMessage)
//       toast.error(errorMessage) // Toast for task update failure
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteTask = async (id) => {
//     try {
//       setLoading(true)
//       setError(null)
//       await api.delete(`/tasks/${id}`)
//       setTasks(prev => prev.filter(task => task._id !== id))
//       toast.success('Task deleted successfully!') // Toast for task deletion
//     } catch (error) {
//       console.error('Delete task error:', error)
//       console.error('Error details:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         headers: error.response?.headers
//       })
      
//       const errorMessage = error.response?.data?.message || 
//                          error.response?.data?.error || 
//                          'Failed to delete task'
//       setError(errorMessage)
//       toast.error(errorMessage) // Toast for task deletion failure
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const markNotificationAsRead = async (id) => {
//     try {
//       setLoading(true)
//       setError(null)
//       const { data } = await api.put(`/notifications/${id}`, { read: true })
//       setNotifications(prev => prev.map(n => n._id === id ? data : n))
//     } catch (error) {
//       console.error('Mark notification read error:', error)
//       setError(error.response?.data?.message || 'Failed to update notification')
//       toast.error(error.response?.data?.message || 'Failed to update notification') // Updated notification
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <TaskContext.Provider value={{
//       tasks,
//       stats,
//       notifications,
//       loading,
//       error,
//       selectedTask,
//       setSelectedTask,
//       fetchTasks,
//       fetchTaskStats,
//       fetchNotifications,
//       createTask,
//       updateTask,
//       deleteTask,
//       markNotificationAsRead
//     }}>
//       {children}
//     </TaskContext.Provider>
//   )
// }

// export function useTasks() {
//   const context = useContext(TaskContext)
//   if (context === undefined) {
//     throw new Error('useTasks must be used within a TaskProvider')
//   }
//   return context
// }
'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const TaskContext = createContext();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://task-management-backend-2ifw.onrender.com/api';

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, overdue: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const retryWithBackoff = async (fn, retries = 3, baseDelay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err) {
        console.error(`Retry ${i + 1}/${retries} failed:`, {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data
        });
        if (i < retries - 1) {
          const delay = baseDelay * Math.pow(2, i);
          console.log(`Waiting ${delay}ms before retry ${i + 2}`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          throw err;
        }
      }
    }
  };

  const fetchTaskStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await retryWithBackoff(() =>
        axios.get(`${API_BASE_URL}/tasks/stats`, {
          headers: getAuthHeaders()
        })
      );
      console.log('Task stats fetched:', response.data);
      setStats(response.data);
    } catch (err) {
      console.error('Fetch stats error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      const errorMessage = err.response?.status === 401
        ? 'Unauthorized: Please log in again'
        : err.response?.data?.message || 'Failed to fetch task statistics';
      setError(errorMessage);
      setStats({ total: 0, completed: 0, overdue: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await retryWithBackoff(() =>
        axios.get(`${API_BASE_URL}/tasks`, {
          headers: getAuthHeaders()
        })
      );
      console.log('Tasks fetched:', response.data.length);
      setTasks(response.data);
    } catch (err) {
      console.error('Fetch tasks error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      const errorMessage = err.response?.status === 401
        ? 'Unauthorized: Please log in again'
        : err.response?.data?.message || 'Failed to fetch tasks';
      setError(errorMessage);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, taskData, {
        headers: getAuthHeaders()
      });
      console.log('Task created:', response.data);
      setTasks(prev => [...prev, response.data]);
      await fetchTaskStats();
    } catch (err) {
      console.error('Create task error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      const errorMessage = err.response?.data?.message || 'Failed to create task';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData, {
        headers: getAuthHeaders()
      });
      console.log('Task updated:', response.data);
      setTasks(prev => prev.map(task => (task._id === id ? response.data : task)));
      await fetchTaskStats();
    } catch (err) {
      console.error('Update task error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      const errorMessage = err.response?.data?.message || 'Failed to update task';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        headers: getAuthHeaders()
      });
      console.log('Task deleted:', id);
      setTasks(prev => prev.filter(task => task._id !== id));
      await fetchTaskStats();
    } catch (err) {
      console.error('Delete task error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      const errorMessage = err.response?.data?.message || 'Failed to delete task';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    tasks,
    stats,
    loading,
    error,
    fetchTasks,
    fetchTaskStats,
    createTask,
    updateTask,
    deleteTask
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export { TaskProvider, useTasks };
