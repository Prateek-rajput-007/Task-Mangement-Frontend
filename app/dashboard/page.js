
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
//     <div className="flex flex-col min-h-screen bg-[#0F172A] text-gray-200">
//       <Header />

//       <div className="flex flex-1">
//         <Sidebar />

//         <main className="flex-1 pb-8 md:ml-64">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="py-6">
//               <h1 className="text-2xl font-bold text-white">Dashboard</h1>

//               <div className="mt-6">
//                 <TaskStats />
//               </div>

//               <div className="mt-8">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-lg font-medium text-gray-100">Recent Tasks</h2>
//                   <a
//                     href="/tasks"
//                     className="text-sm font-medium text-blue-400 hover:text-blue-300"
//                   >
//                     View all
//                   </a>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                   {tasks.slice(0, 6).map((task) => (
//                     <div key={task._id} className="bg-gray-800 shadow rounded-lg overflow-hidden">
//                       <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-700">
//                         <h3 className="text-lg font-medium text-gray-100">
//                           <a href={`/tasks/${task._id}`} className="hover:text-blue-400">
//                             {task.title}
//                           </a>
//                         </h3>
//                         <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                           task.status === 'completed' 
//                             ? 'bg-green-600 text-green-100' 
//                             : task.status === 'in-progress' 
//                               ? 'bg-blue-600 text-blue-100' 
//                               : 'bg-gray-600 text-gray-100'
//                         }`}>
//                           {task.status}
//                         </span>
//                       </div>
//                       <div className="px-4 py-5 sm:p-6">
//                         <p className="text-gray-300 mb-4">{task.description}</p>
//                         <div className="flex justify-between items-center">
//                           <p className="text-sm text-gray-400">
//                             Due: {new Date(task.dueDate).toLocaleDateString()}
//                           </p>
//                           {task.assignedTo && (
//                             <p className="text-xs text-gray-400">
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


'use client';

import { useEffect } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import TaskStats from '../../components/TaskStats'
import { useTasks } from '../../contexts/TaskContext'
import { useAuth } from '../../contexts/AuthContext'
export default function DashboardPage() {
  const { user } = useAuth();
  const { tasks, stats, loading, error, fetchTasks, fetchTaskStats } = useTasks();

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchTaskStats();
    }
  }, [user, fetchTasks, fetchTaskStats]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A] text-gray-200">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 pb-8 md:ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>

              {loading && <p className="mt-4 text-blue-400">Loading tasks and statistics...</p>}
              {error && (
                <p className="mt-4 text-red-400">
                  Error: {error}
                  {error.includes('Unauthorized') && (
                    <span>
                      {' '}
                      <a href="/login" className="underline hover:text-red-300">Log in</a>
                    </span>
                  )}
                </p>
              )}

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

                {tasks.length === 0 && !loading && !error && (
                  <p className="text-gray-400">No tasks available.</p>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tasks.slice(0, 6).map((task) => (
                    <div key={task._id} className="bg-gray-800 shadow rounded-lg overflow-hidden">
                      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-700">
                        <h3 className="text-lg font-medium text-gray-100">
                          <a href={`/tasks/${task._id}`} className="hover:text-blue-400">
                            {task.title}
                          </a>
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            task.status === 'completed'
                              ? 'bg-green-600 text-green-100'
                              : task.status === 'in-progress'
                              ? 'bg-blue-600 text-blue-100'
                              : 'bg-gray-600 text-gray-100'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                      <div className="px-4 py-5 sm:p-6">
                        <p className="text-gray-300 mb-4">
                          {task.description || 'No description'}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-400">
                            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
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
  );
}
