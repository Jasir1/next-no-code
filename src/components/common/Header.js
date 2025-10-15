'use client';

import Link from 'next/link';
import { Layout, User, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Layout className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">WebBuilder</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition">
              Dashboard
            </Link>
            <Link href="/templates" className="text-gray-600 hover:text-gray-900 transition">
              Templates
            </Link>
            <Link href="/docs" className="text-gray-600 hover:text-gray-900 transition">
              Documentation
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}