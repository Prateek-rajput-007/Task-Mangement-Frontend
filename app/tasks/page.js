// // client/app/tasks/page.jsx
// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import Header from '../../components/Header'
// import Sidebar from '../../components/Sidebar'
// import TaskCard from '../../components/TaskCard'
// import { useTasks } from '../../contexts/TaskContext'
// import { useAuth } from '../../contexts/AuthContext'

// export default function TasksPage() {
//   const { user } = useAuth()
//   const { tasks, loading, fetchTasks } = useTasks()
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [priorityFilter, setPriorityFilter] = useState('')

//   useEffect(() => {
//     fetchTasks({
//       search: searchTerm,
//       status: statusFilter,
//       priority: priorityFilter
//     })
//   }, [searchTerm, statusFilter, priorityFilter])

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
//       <Header />
      
//       <div className="flex flex-1">
//         <Sidebar />
        
//         <main className="flex-1 pb-8 md:ml-48">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="py-6">
//               <div className="flex justify-between items-center">
//                 <h1 className="text-2xl font-bold text-white">Tasks</h1>
//                 <Link
//                   href="/tasks/create"
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
//                 >
//                   Create Task
//                 </Link>
//               </div>
              
//               <div className="mt-6 bg-gray-800 shadow rounded-lg p-4">
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//                   <div>
//                     <label htmlFor="search" className="block text-sm font-medium text-gray-300">
//                       Search
//                     </label>
//                     <input
//                       type="text"
//                       id="search"
//                       placeholder="Search tasks..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-gray-200 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="status" className="block text-sm font-medium text-gray-300">
//                       Status
//                     </label>
//                     <select
//                       id="status"
//                       value={statusFilter}
//                       onChange={(e) => setStatusFilter(e.target.value)}
//                       className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-gray-200 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
//                     >
//                       <option value="">All Statuses</option>
//                       <option value="todo">To Do</option>
//                       <option value="in-progress">In Progress</option>
//                       <option value="completed">Completed</option>
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label htmlFor="priority" className="block text-sm font-medium text-gray-300">
//                       Priority
//                     </label>
//                     <select
//                       id="priority"
//                       value={priorityFilter}
//                       onChange={(e) => setPriorityFilter(e.target.value)}
//                       className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-gray-200 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
//                     >
//                       <option value="">All Priorities</option>
//                       <option value="high">High</option>
//                       <option value="medium">Medium</option>
//                       <option value="low">Low</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mt-6">
//                 {loading ? (
//                   <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
//                   </div>
//                 ) : tasks.length === 0 ? (
//                   <div className="text-center py-12">
//                     <svg
//                       className="mx-auto h-12 w-12 text-gray-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       aria-hidden="true"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                       />
//                     </svg>
//                     <h3 className="mt-2 text-sm font-medium text-gray-300">No tasks</h3>
//                     <p className="mt-1 text-sm text-gray-400">
//                       Get started by creating a new task.
//                     </p>
//                     <div className="mt-6">
//                       <Link
//                         href="/tasks/create"
//                         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
//                       >
//                         New Task
//                       </Link>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                     {tasks.map((task) => (
//                       <TaskCard key={task._id} task={task} />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import TaskCard from '../../components/TaskCard'
import { useTasks } from '../../contexts/TaskContext'
import { useAuth } from '../../contexts/AuthContext'

export default function TasksPage() {
  const { user } = useAuth()
  const { tasks, loading, fetchTasks } = useTasks()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  useEffect(() => {
    fetchTasks({
      search: searchTerm,
      status: statusFilter,
      priority: priorityFilter
    })
  }, [searchTerm, statusFilter, priorityFilter])

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 pb-8 md:ml-48">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Tasks</h1>
                <Link
                  href="/tasks/create"
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-md shadow-sm"
                >
                  Create Task
                </Link>
              </div>

              <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm text-gray-300">Search</label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search tasks..."
                      className="mt-1 w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="mt-1 w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md"
                    >
                      <option value="">All</option>
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300">Priority</label>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="mt-1 w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md"
                    >
                      <option value="">All</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {loading ? (
                  <div className="flex justify-center h-40 items-center">
                    <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-blue-400 rounded-full" />
                  </div>
                ) : tasks.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-gray-300 text-lg">No tasks found</h3>
                    <p className="text-gray-400 mt-2">Start by creating a new task.</p>
                    <Link href="/tasks/create">
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow">
                        New Task
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.map(task => (
                      <TaskCard key={task._id} task={task} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
