'use client'

import Link from 'next/link'
import { formatDate, getPriorityColor, getStatusColor } from '../lib/utils'

export default function TaskCard({ task }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg hover:shadow-md transition-shadow duration-200 dark:text-white">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          <Link href={`/tasks/${task._id}`} className="hover:text-primary-600 dark:hover:text-primary-400">
            {task.title}
          </Link>
        </h3>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{task.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Due:</span> {task.dueDate ? formatDate(task.dueDate) : 'N/A'}
            </p>
            {task.assignedTo && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span className="font-medium">Assigned to:</span> {task.assignedTo.name}
              </p>
            )}
          </div>
          <Link
            href={`/tasks/${task._id}`}
            className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 focus:outline-none"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
