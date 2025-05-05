// // client/app/dashboard/page.jsx
// 'use client'

// import { useEffect } from 'react'
// import Header from '../../components/Header'
// import Sidebar from '../../components/Sidebar'
// import TaskStats from '../../components/TaskStats'
// import { useTasks } from '../../contexts/TaskContext'
// import { useAuth } from '../../contexts/AuthContext'

// export default function DashboardPage() {
//   const { user } = useAuth()
//   const { tasks, stats, fetchTasks, fetchTaskStats } = useTasks()

//   useEffect(() => {
//     fetchTasks()
//     fetchTaskStats()
//   }, [])

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
      
//       <div className="flex flex-1">
//         <Sidebar />
        
//         <main className="flex-1 pb-8 md:ml-64">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="py-6">
//               <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              
//               <div className="mt-6">
//                 <TaskStats />
//               </div>
              
//               <div className="mt-8">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-lg font-medium text-gray-900">Recent Tasks</h2>
//                   <a
//                     href="/tasks"
//                     className="text-sm font-medium text-primary-600 hover:text-primary-500"
//                   >
//                     View all
//                   </a>
//                 </div>
                
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                   {tasks.slice(0, 6).map((task) => (
//                     <div key={task._id} className="bg-white shadow overflow-hidden rounded-lg">
//                       <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
//                         <h3 className="text-lg leading-6 font-medium text-gray-900">
//                           <a href={`/tasks/${task._id}`} className="hover:text-primary-600">
//                             {task.title}
//                           </a>
//                         </h3>
//                         <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                           task.status === 'completed' 
//                             ? 'bg-green-100 text-green-800' 
//                             : task.status === 'in-progress' 
//                               ? 'bg-blue-100 text-blue-800' 
//                               : 'bg-gray-100 text-gray-800'
//                         }`}>
//                           {task.status}
//                         </span>
//                       </div>
//                       <div className="px-4 py-5 sm:p-6">
//                         <p className="text-gray-600 mb-4">{task.description}</p>
//                         <div className="flex justify-between items-center">
//                           <p className="text-sm text-gray-500">
//                             Due: {new Date(task.dueDate).toLocaleDateString()}
//                           </p>
//                           {task.assignedTo && (
//                             <p className="text-xs text-gray-500">
//                               Assigned to: {task.assignedTo.name}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

'use client'

import { useEffect } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import TaskStats from '../../components/TaskStats'
import { useTasks } from '../../contexts/TaskContext'
import { useAuth } from '../../contexts/AuthContext'

export default function DashboardPage() {
  const { user } = useAuth()
  const { tasks, stats, fetchTasks, fetchTaskStats } = useTasks()

  useEffect(() => {
    fetchTasks()
    fetchTaskStats()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A] text-gray-200">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 pb-8 md:ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>

              <div className="mt-6">
                <TaskStats />
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-100">Recent Tasks</h2>
                  <a
                    href="/tasks"
                    className="text-sm font-medium text-blue-400 hover:text-blue-300"
                  >
                    View all
                  </a>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tasks.slice(0, 6).map((task) => (
                    <div key={task._id} className="bg-gray-800 shadow rounded-lg overflow-hidden">
                      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-700">
                        <h3 className="text-lg font-medium text-gray-100">
                          <a href={`/tasks/${task._id}`} className="hover:text-blue-400">
                            {task.title}
                          </a>
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          task.status === 'completed' 
                            ? 'bg-green-600 text-green-100' 
                            : task.status === 'in-progress' 
                              ? 'bg-blue-600 text-blue-100' 
                              : 'bg-gray-600 text-gray-100'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                      <div className="px-4 py-5 sm:p-6">
                        <p className="text-gray-300 mb-4">{task.description}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-400">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                          {task.assignedTo && (
                            <p className="text-xs text-gray-400">
                              Assigned to: {task.assignedTo.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
