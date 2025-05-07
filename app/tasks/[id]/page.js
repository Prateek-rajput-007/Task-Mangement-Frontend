// 'use client'

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter, useParams } from 'next/navigation';
// import Header from '../../../components/Header';
// import Sidebar from '../../../components/Sidebar';
// import TaskForm from '../../../components/TaskForm';
// import { useTasks } from '../../../contexts/TaskContext';
// import { useAuth } from '../../../contexts/AuthContext';
// import { toast } from 'react-hot-toast';

// export default function TaskDetailPage() {
//   const params = useParams();
//   const { id } = params;
//   const { user } = useAuth();
//   const { tasks, selectedTask, setSelectedTask, deleteTask, loading, error } = useTasks();
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     const task = tasks.find((t) => t._id === id);
//     setSelectedTask(task || null);
//   }, [id, tasks]);

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       try {
//         await deleteTask(id);

//         router.push('/tasks');
//       } catch (error) {
//         toast.error(error || 'Failed to delete task');
//       }
//     }
//   };

//   if (!isClient) {
//     return (
//       <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
//         <Header />
//         <div className="flex flex-1">
//           <Sidebar />
//           <main className="flex-1 pb-8 md:ml-48">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="py-6 text-center">
//                 <p>Loading...</p>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   if (loading && !selectedTask) {
//     return (
//       <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
//         <Header />
//         <div className="flex flex-1">
//           <Sidebar />
//           <main className="flex-1 pb-8 md:ml-48">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="py-6 text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mx-auto"></div>
//                 <p className="mt-2">Loading task details...</p>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
//         <Header />
//         <div className="flex flex-1">
//           <Sidebar />
//           <main className="flex-1 pb-8 md:ml-48">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="py-6 text-center">
//                 <div className="bg-red-600 text-white p-4 rounded-md inline-block">
//                   <p>{error}</p>
//                   <button
//                     onClick={() => router.push('/tasks')}
//                     className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
//                   >
//                     Back to Tasks
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   if (!selectedTask) {
//     return (
//       <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
//         <Header />
//         <div className="flex flex-1">
//           <Sidebar />
//           <main className="flex-1 pb-8 md:ml-48">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="py-6 text-center">
//                 <div className="bg-yellow-600 text-white p-4 rounded-md inline-block">
//                   <p>Task not found</p>
//                   <button
//                     onClick={() => router.push('/tasks')}
//                     className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
//                   >
//                     Back to Tasks
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
//       <Header />

//       <div className="flex flex-1">
//         <Sidebar />

//         <main className="flex-1 pb-8 md:ml-48">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="py-6">
//               <div className="flex justify-between items-center">
//                 <h1 className="text-2xl font-bold text-white">Task Details</h1>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={handleDelete}
//                     disabled={loading}
//                     className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
//                       loading ? 'opacity-70 cursor-not-allowed' : ''
//                     }`}
//                   >
//                     {loading ? 'Deleting...' : 'Delete'}
//                   </button>
//                   <Link
//                     href="/tasks"
//                     className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
//                   >
//                     Back to Tasks
//                   </Link>
//                 </div>
//               </div>

//               <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow">
//                 <TaskForm task={selectedTask} />
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import TaskForm from '../../../components/TaskForm';
import { useTasks } from '../../../contexts/TaskContext';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export default function TaskDetailPage() {
  const params = useParams();
  const { id } = params;
  const { user } = useAuth();
  const { tasks, selectedTask, setSelectedTask, deleteTask, loading, error } = useTasks();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const task = tasks.find((t) => t._id === id);
    setSelectedTask(task || null);
  }, [id, tasks, setSelectedTask]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        router.push('/tasks');
      } catch (error) {
        console.error('Delete task error:', error);
        const status = error.response?.status;
        const message = error.response?.data?.message || 'Failed to delete task';
        if (status === 404) {
          toast.error('Task not found');
        } else if (status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
        } else if (status === 403) {
          toast.error('Forbidden: You do not have permission to delete this task');
        } else {
          toast.error(`Server error: ${message}`);
        }
      }
    }
  };

  if (!isClient) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 pb-8 md:ml-48">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-6 text-center">
                <p>Loading...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (loading && !selectedTask) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 pb-8 md:ml-48">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mx-auto"></div>
                <p className="mt-2">Loading task details...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 pb-8 md:ml-48">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-6 text-center">
                <div className="bg-red-600 text-white p-4 rounded-md inline-block">
                  <p>{error}</p>
                  <button
                    onClick={() => router.push('/tasks')}
                    className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                  >
                    Back to Tasks
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!selectedTask) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 pb-8 md:ml-48">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-6 text-center">
                <div className="bg-yellow-600 text-white p-4 rounded-md inline-block">
                  <p>Task not found</p>
                  <button
                    onClick={() => router.push('/tasks')}
                    className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                  >
                    Back to Tasks
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 pb-8 md:ml-48">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Task Details</h1>
                <div className="flex space-x-2">
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                  <Link
                    href="/tasks"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                  >
                    Back to Tasks
                  </Link>
                </div>
              </div>

              <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow">
                <TaskForm task={selectedTask} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
