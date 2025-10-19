// src/components/dashboard/TopBar.js
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
  User,
  CreditCard,
  Zap,
  Shield,
  ArrowRight,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TopBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3); // Example notification count
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get current page title from pathname
  const getPageTitle = () => {
    const path = pathname.split('/').pop();
    if (path === 'dashboard') return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    plan: 'Pro',
    planExpires: '2024-12-31'
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
    }`}>
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Page title */}
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back, {user.name.split(' ')[0]}! 
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                {user.plan} Plan
              </span>
            </p>
          </div>

          {/* Right side - Search and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Search anything..."
              />
            </div>

            {/* Notifications */}
            <button
              type="button"
              className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* User Menu */}
            <div className="relative ml-2">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                id="user-menu"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.avatar}
                  alt={user.name}
                />
                <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="hidden md:block h-4 w-4 text-gray-500" />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="origin-top-right absolute right-0 mt-2 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div className="py-3 px-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.avatar}
                          alt={user.name}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Plan</span>
                          <div className="flex items-center">
                            <span className="font-medium text-blue-600">{user.plan} Plan</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-gray-500">Expires {user.planExpires}</span>
                          </div>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full"
                            style={{ width: '75%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="py-1" role="none">
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <User className="h-4 w-4 mr-3 text-gray-500" />
                        Your Profile
                      </Link>
                      <Link
                        href="/dashboard/billing"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <CreditCard className="h-4 w-4 mr-3 text-gray-500" />
                        Billing
                      </Link>
                      <Link
                        href="/dashboard/settings/notifications"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <Bell className="h-4 w-4 mr-3 text-gray-500" />
                        Notifications
                        <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          {notifications} new
                        </span>
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <Link
                        href="/help"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <HelpCircle className="h-4 w-4 mr-3 text-gray-500" />
                        Help & Support
                      </Link>
                      <Link
                        href="/api/auth/signout"
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        role="menuitem"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign out
                      </Link>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-xs text-center border-t border-gray-100">
                      <p className="text-gray-500">
                        v{process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;