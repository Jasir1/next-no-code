'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart2,
  LineChart,
  PieChart,
  Users,
  Eye,
  MousePointer,
  Clock,
  Calendar,
  Download,
  Filter,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  Smartphone,
  Laptop,
  Tablet,
  Globe,
  Search,
  MoreHorizontal,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

// Sample data
const stats = [
  { name: 'Total Visitors', value: '12,845', change: '+12.5%', changeType: 'increase', icon: Users, color: 'text-blue-500 bg-blue-50' },
  { name: 'Page Views', value: '48,921', change: '+8.2%', changeType: 'increase', icon: Eye, color: 'text-purple-500 bg-purple-50' },
  { name: 'Unique Visitors', value: '8,742', change: '+5.7%', changeType: 'increase', icon: Users, color: 'text-green-500 bg-green-50' },
  { name: 'Bounce Rate', value: '42.3%', change: '-2.1%', changeType: 'decrease', icon: ArrowDown, color: 'text-red-500 bg-red-50' },
];

const trafficSources = [
  { name: 'Direct', value: 35, color: 'bg-blue-500' },
  { name: 'Social', value: 25, color: 'bg-purple-500' },
  { name: 'Referral', value: 20, color: 'bg-green-500' },
  { name: 'Search', value: 20, color: 'bg-yellow-500' },
];

const topPages = [
  { name: '/home', visitors: 5842, change: '+12.5%', changeType: 'increase' },
  { name: '/products', visitors: 4231, change: '+8.2%', changeType: 'increase' },
  { name: '/blog', visitors: 3210, change: '-2.1%', changeType: 'decrease' },
  { name: '/about', visitors: 2104, change: '+5.7%', changeType: 'increase' },
  { name: '/contact', visitors: 1892, change: '+3.4%', changeType: 'increase' },
];

const devices = [
  { name: 'Desktop', value: 62, icon: Laptop, color: 'text-blue-500' },
  { name: 'Mobile', value: 30, icon: Smartphone, color: 'text-purple-500' },
  { name: 'Tablet', value: 8, icon: Tablet, color: 'text-green-500' },
];

const countries = [
  { name: 'United States', visitors: 5842, change: '+12.5%', flag: '🇺🇸' },
  { name: 'United Kingdom', visitors: 4231, change: '+8.2%', flag: '🇬🇧' },
  { name: 'Canada', visitors: 3210, change: '-2.1%', flag: '🇨🇦' },
  { name: 'Australia', visitors: 2104, change: '+5.7%', flag: '🇦🇺' },
  { name: 'Germany', visitors: 1892, change: '+3.4%', flag: '🇩🇪' },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeRange]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500">Track and analyze your website performance</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <RefreshCw className={`h-5 w-5 text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center">
            <Download className="h-5 w-5 mr-1" />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <span
                      className={`ml-2 flex items-center text-sm font-medium ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stat.changeType === 'increase' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      <span className="ml-1">{stat.change}</span>
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.color.split(' ')[1]}`}>
                  <Icon className={`h-6 w-6 ${stat.color.split(' ')[0]}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Visitors Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Visitor Analytics</h2>
            <div className="flex space-x-2 mt-3 sm:mt-0">
              <button className="px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg">
                Visitors
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-lg">
                Page Views
              </button>
            </div>
          </div>
          <div className="h-80">
            {/* Replace with your actual chart component */}
            <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              <LineChart className="h-12 w-12" />
              <span className="ml-2">Visitor chart will be displayed here</span>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Traffic Sources</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-6">
            <div className="h-48">
              {/* Replace with your actual pie chart component */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-40 h-40">
                  {trafficSources.map((source, index) => (
                    <div
                      key={source.name}
                      className="absolute inset-0 rounded-full border-8 border-transparent"
                      style={{
                        borderTopColor: source.color.replace('bg-', ''),
                        transform: `rotate(${index * 90}deg)`,
                        clipPath: 'polygon(50% 50%, 0 0, 0 100%)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {trafficSources.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${source.color} mr-3`}></div>
                    <span className="text-sm font-medium text-gray-700">{source.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{source.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Pages</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topPages.map((page) => (
              <div key={page.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link
                    href="#"
                    className="text-sm font-medium text-gray-900 hover:text-blue-600"
                  >
                    {page.name}
                  </Link>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">
                    {page.visitors.toLocaleString()}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      page.changeType === 'increase'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {page.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Devices</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-6">
            <div className="h-40">
              {/* Replace with your actual chart component */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 relative">
                  {devices.map((device, index) => {
                    const Icon = device.icon;
                    return (
                      <div
                        key={device.name}
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        style={{
                          transform: `rotate(${index * 120}deg)`,
                        }}
                      >
                        <Icon className={`h-8 w-8 ${device.color} mb-1`} />
                        <span className="text-xs font-medium text-gray-700">
                          {device.value}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {devices.map((device) => (
                <div key={device.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-200 mr-3"></div>
                    <span className="text-sm font-medium text-gray-700">{device.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{device.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Countries</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {countries.map((country) => (
              <div key={country.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg mr-3" role="img" aria-label={country.name}>
                    {country.flag}
                  </span>
                  <span className="text-sm font-medium text-gray-700">{country.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">
                    {country.visitors.toLocaleString()}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      country.change.startsWith('+')
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {country.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}