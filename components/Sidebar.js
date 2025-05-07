// 'use client'

// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useAuth } from '../contexts/AuthContext'

// const navigation = [
//   { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
//   { name: 'Tasks', href: '/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
// ]

// export default function Sidebar() {
//   const pathname = usePathname()
//   const { user } = useAuth()

//   return (
//     <div className="hidden md:flex md:w-48 md:flex-col md:fixed md:inset-y-0 bg-gray-900 text-white">
//       <div className="flex-1 flex flex-col min-h-0 border-r border-gray-700">
//         <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
//           <div className="flex items-center flex-shrink-0 px-4">
//             <h1 className="text-xl font-bold text-white">TaskMaster</h1>
//           </div>
//           <nav className="mt-5 flex-1 px-2 space-y-1">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
//                   pathname === item.href
//                     ? 'bg-gray-800 text-white'
//                     : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//                 }`}
//               >
//                 <svg
//                   className={`mr-3 h-5 w-5 ${
//                     pathname === item.href
//                       ? 'text-white'
//                       : 'text-gray-400 group-hover:text-white'
//                   }`}
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
//                 </svg>
//                 {item.name}
//               </Link>
//             ))}
//             {user?.role === 'admin' && (
//               <Link
//                 href="/users"
//                 className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
//                   pathname === '/users'
//                     ? 'bg-gray-800 text-white'
//                     : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//                 }`}
//               >
//                 <svg
//                   className={`mr-3 h-5 w-5 ${
//                     pathname === '/users'
//                       ? 'text-white'
//                       : 'text-gray-400 group-hover:text-white'
//                   }`}
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                 </svg>
//                 Users
//               </Link>
//             )}
//           </nav>
//         </div>
//         <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
//           <div className="flex items-center">
//             <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
//               <span className="text-white font-medium">
//                 {user?.name?.charAt(0).toUpperCase()}
//               </span>
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-white">{user?.name}</p>
//               <p className="text-xs font-medium text-gray-400 capitalize">{user?.role}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gray-900 shadow-md md:block hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white">Menu</h2>
        <nav className="mt-4 space-y-2">
          <Link href="/dashboard" className="block text-gray-300 hover:text-blue-400">
            Dashboard
          </Link>
          <Link href="/tasks" className="block text-gray-300 hover:text-blue-400">
            Tasks
          </Link>
        </nav>
      </div>
    </aside>
  );
}
