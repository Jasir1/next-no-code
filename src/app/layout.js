// src/app/dashboard/layout.js
'use client';

import { Inter } from 'next/font/google';
import Sidebar from '@/components/dashboard/Sidebar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}