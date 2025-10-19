// src/components/dashboard/Sidebar.js
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FolderOpen, 
  Layout, 
  BarChart2, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderOpen,
    href: '/dashboard/projects',
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: Layout,
    href: '/dashboard/templates',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart2,
    href: '/dashboard/analytics',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-y-0 left-0 w-20 bg-white shadow-lg flex flex-col items-center py-6 z-50"
    >
      <div className="mb-10">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl flex items-center justify-center shadow-md">
          <Link href="/dashboard">
            <img src="/img/layers.png" alt="Logo" className="w-8 h-8" />
          </Link>
        </div>
      </div>

      <nav className="flex-1 space-y-6 w-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          
          return (
            <Link 
              key={item.id}
              href={item.href}
              className="block"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full flex flex-col items-center justify-center py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Icon
                  className={`w-6 h-6 mb-1 transition-transform ${
                    !isActive && 'group-hover:scale-110'
                  }`}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </motion.span>
            </Link>
          );
        })}
      </nav>

      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-auto"
      >
        <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}