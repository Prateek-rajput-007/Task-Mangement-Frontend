import axios from 'axios'

const api = axios.create({
  baseURL: 'https://task-management-backend-2ifw.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('API request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: JSON.stringify(config.data, null, 2),
    }) // Debug log
    return config
  },
  (error) => {
    console.error('API request error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API response error:', {
      status: error.response?.status,
      data: JSON.stringify(error.response?.data, null, 2),
      url: error.config?.url,
      headers: error.config?.headers,
    })
    return Promise.reject(error)
  }
)

export default api
