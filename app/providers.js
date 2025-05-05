// client/app/providers.jsx
'use client'

import { AuthProvider } from '../contexts/AuthContext'
import { TaskProvider } from '../contexts/TaskContext'

export function Providers({ children }) {
  return (
    <AuthProvider>
      <TaskProvider>
        {children}
      </TaskProvider>
    </AuthProvider>
  )
}

export default Providers; 