// // client/contexts/AuthContext.jsx
// 'use client'

// import { createContext, useContext, useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { toast } from 'react-hot-toast'
// import api from '../lib/api'

// const AuthContext = createContext()

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const token = localStorage.getItem('token')
//         if (token) {
//           api.defaults.headers.common['Authorization'] = `Bearer ${token}`
//           const { data } = await api.get('/auth/me')
//           setUser(data)
//         }
//       } catch (error) {
//         console.error('Error loading user:', error)
//         localStorage.removeItem('token')
//         delete api.defaults.headers.common['Authorization']
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadUser()
//   }, [])

//   const login = async (email, password) => {
//     try {
//       const { data } = await api.post('/auth/login', { email, password })
//       localStorage.setItem('token', data.token)
//       api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
//       setUser(data.user)
//       toast.success('Login successful!')
//       router.push('/dashboard')
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Login failed')
//       throw error
//     }
//   }

//   const register = async (name, email, password, role) => {
//     try {
//       console.log('Registering user with data:', { name, email, password, role }); // Debugging log
//       const { data } = await api.post('/auth/register', { name, email, password, role });
//       localStorage.setItem('token', data.token);
//       api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
//       setUser(data.user);
//       toast.success('Registration successful!');
//       router.push('/dashboard');
//     } catch (error) {
//       console.error('Registration error:', error.response?.data || error.message); // Log server error
//       if (error.response?.data?.errors) {
//         error.response.data.errors.forEach((err) => toast.error(err.msg)); // Display validation errors
//       } else {
//         toast.error(error.response?.data?.message || 'Registration failed'); // Generic error message
//       }
//       throw error;
//     }
//   }

//   const logout = () => {
//     localStorage.removeItem('token')
//     delete api.defaults.headers.common['Authorization']
//     setUser(null)
//     router.push('/login')
//     toast.success('Logged out successfully')
//   }

//   return (
//     <AuthContext.Provider value={{ user, loading, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   return useContext(AuthContext)
// }


'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

const API_BASE_URL = 'https://task-management-backend-2ifw.onrender.com/api';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name, email, password, role = 'user') => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
        role
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      router.push('/dashboard');
    } catch (err) {
      console.error('Register error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (err) {
      console.error('Check auth error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
