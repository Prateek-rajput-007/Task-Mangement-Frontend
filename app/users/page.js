// client/app/users/page.jsx
'use client'

import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../lib/api'
import { toast } from 'react-hot-toast'

export default function UsersPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users')
        setUsers(data)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    if (user?.role === 'admin') {
      fetchUsers()
    }
  }, [user])

  if (user?.role !== 'admin') {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 pb-8 md:ml-64">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-6 text-center">
                <p>Unauthorized access</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 pb-8 md:ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : (
                <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 capitalize">{user.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}