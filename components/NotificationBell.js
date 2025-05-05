// client/components/NotificationBell.jsx
'use client'

import { useState, useEffect } from 'react'
import { useTasks } from '../contexts/TaskContext'
import { toast } from 'react-hot-toast'

export default function NotificationBell() {
  const { notifications, fetchNotifications, markNotificationAsRead } = useTasks()
  const [showNotifications, setShowNotifications] = useState(false)
  
  useEffect(() => {
    fetchNotifications()
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markNotificationAsRead(notification._id)
    }
    setShowNotifications(false)
    toast(notification.message)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 relative"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        )}
      </button>

      {showNotifications && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
            </div>
            {notifications.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">No notifications</div>
            ) : (
              <div className="max-h-60 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`px-4 py-3 text-sm cursor-pointer ${notification.read ? 'bg-white' : 'bg-blue-50'} hover:bg-gray-50`}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-2 w-2 mt-1 rounded-full ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                      <div className="ml-3">
                        <p className="text-gray-700">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}