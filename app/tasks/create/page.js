'use client'

import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import TaskForm from '../../../components/TaskForm'

export default function CreateTaskPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 pb-8 md:ml-48">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <h1 className="text-2xl font-bold text-white">Create New Task</h1>
              <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow">
                <TaskForm />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
