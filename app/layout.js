// client/app/layout.jsx
import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast'; // Updated import

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Task Management System',
  description: 'Manage your tasks efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            {children}
            <Toaster /> {/* Updated component */}
          </div>
        </Providers>
      </body>
    </html>
  );
}