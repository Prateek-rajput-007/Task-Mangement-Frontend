'use client'

import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import NotificationBell from './NotificationBell'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-gray-900 shadow-sm text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold text-white">
          TaskMaster
        </Link>

        <div className="flex items-center space-x-4">
          {user && (
            <>
              <NotificationBell />
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1 text-sm text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
