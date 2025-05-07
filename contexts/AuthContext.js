// client/contexts/AuthContext.jsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import api from '../lib/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const { data } = await api.get('/auth/me')
          setUser(data)
        }
      } catch (error) {
        console.error('Error loading user:', error)
        localStorage.removeItem('token')
        delete api.defaults.headers.common['Authorization']
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      setUser(data.user)
      toast.success('Login successful!')
      router.push('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      throw error
    }
  }

  const register = async (name, email, password, role) => {
    try {
      console.log('Registering user with data:', { name, email, password, role }); // Debugging log
      const { data } = await api.post('/auth/register', { name, email, password, role });
      localStorage.setItem('token', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      toast.success('Registration successful!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message); // Log server error
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err.msg)); // Display validation errors
      } else {
        toast.error(error.response?.data?.message || 'Registration failed'); // Generic error message
      }
      throw error;
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    router.push('/login')
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
