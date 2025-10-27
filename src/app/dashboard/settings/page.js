'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Globe,
  Bell,
  CreditCard,
  Users as Team,
  Database,
  Code,
  Zap,
  Moon,
  Sun,
  LogOut,
  Check,
  X,
  ChevronRight,
  ArrowLeft,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Palette,
  Layout,
  FileText,
  Download,
  HardDrive,
  Shield,
  AlertTriangle,
  Settings as SettingsIcon,
  UserCog,
  ShieldCheck,
  BellRing,
  CreditCard as BillingIcon,
  Network,
  Cpu,
  ArrowRight,
  Plus,
  MoreVertical,
  CheckCircle,
  XCircle,
  ExternalLink,
  HelpCircle,
  Info
} from 'lucide-react';
import Link from 'next/link';

// Gradient background component
const GradientBg = () => (
  <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-10 -z-10" />
);

// Card component
const Card = ({ children, className = '', ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

// Toggle component
const Toggle = ({ enabled, setEnabled, label, description }) => (
  <div className="flex items-center justify-between py-3 px-1">
    <div>
      <div className="text-sm font-medium text-gray-800">{label}</div>
      {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
    </div>
    <button
      type="button"
      className={`${
        enabled ? 'bg-blue-500' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      onClick={() => setEnabled(!enabled)}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  </div>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newsletter: false,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

 // Handle scroll for header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const settingsTabs = [
    { 
      id: 'general', 
      name: 'General', 
      icon: <UserCog className="h-5 w-5" />,
      color: 'text-blue-500'
    },
    { 
      id: 'security', 
      name: 'Security', 
      icon: <ShieldCheck className="h-5 w-5" />,
      color: 'text-emerald-500',
      badge: 'Recommended'
    },
    { 
      id: 'appearance', 
      name: 'Appearance', 
      icon: <Palette className="h-5 w-5" />,
      color: 'text-purple-500'
    },
    { 
      id: 'notifications', 
      name: 'Notifications', 
      icon: <BellRing className="h-5 w-5" />,
      color: 'text-amber-500'
    },
    { 
      id: 'billing', 
      name: 'Billing', 
      icon: <BillingIcon className="h-5 w-5" />,
      color: 'text-pink-500'
    },
    { 
      id: 'team', 
      name: 'Team', 
      icon: <Team className="h-5 w-5" />,
      color: 'text-indigo-500'
    },
    { 
      id: 'integrations', 
      name: 'Integrations', 
      icon: <Network className="h-5 w-5" />,
      color: 'text-cyan-500'
    },
    { 
      id: 'advanced', 
      name: 'Advanced', 
      icon: <Cpu className="h-5 w-5" />,
      color: 'text-gray-500'
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'security':
        return (
          <SecuritySettings
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            showCurrentPassword={showCurrentPassword}
            setShowCurrentPassword={setShowCurrentPassword}
            showNewPassword={showNewPassword}
            setShowNewPassword={setShowNewPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        );
      case 'appearance':
        return <AppearanceSettings darkMode={darkMode} setDarkMode={setDarkMode} />;
      case 'notifications':
        return <NotificationSettings notifications={notifications} setNotifications={setNotifications} />;
      case 'billing':
        return <BillingSettings />;
      case 'team':
        return <TeamSettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      case 'advanced':
        return <AdvancedSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <GradientBg />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-100/30"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Sticky Header */}
      <header className={`sticky top-0 z-20 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Settings
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all hover:shadow"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg transition-all"
              >
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent'
                  } group flex items-center px-4 py-3 text-sm font-medium border-l-2 w-full text-left`}
                >
                  <span className={`mr-3 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`}>
                    {tab.icon}
                  </span>
                  {tab.name}
                  {tab.id === 'security' && (
                    <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Recommended
                    </span>
                  )}
                </button>
              ))}
              <button
                className="mt-8 group flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 w-full"
              >
                <LogOut className="h-5 w-5 mr-3 text-red-400" />
                Sign out
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white shadow overflow-hidden rounded-xl">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  {settingsTabs.find(tab => tab.id === activeTab)?.name} Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {activeTab === 'general' && 'Update your account information and settings'}
                  {activeTab === 'security' && 'Manage your password and security settings'}
                  {activeTab === 'appearance' && 'Customize the look and feel of the application'}
                  {activeTab === 'notifications' && 'Configure how you receive notifications'}
                  {activeTab === 'billing' && 'Manage your subscription and payment methods'}
                  {activeTab === 'team' && 'Manage team members and permissions'}
                  {activeTab === 'integrations' && 'Connect with third-party services'}
                  {activeTab === 'advanced' && 'Advanced settings for power users'}
                </p>
              </div>
              <div className="px-6 py-6">
                {renderTabContent()}
              </div>
            </div>

            {/* Danger Zone */}
            {activeTab === 'general' && (
              <div className="mt-8 bg-white shadow overflow-hidden rounded-xl border border-red-100">
                <div className="px-6 py-5">
                  <h3 className="text-lg font-medium text-red-700">Danger Zone</h3>
                  <p className="mt-1 text-sm text-red-600">
                    These actions are irreversible. Please proceed with caution.
                  </p>
                </div>
                <div className="px-6 py-4 bg-red-50 border-t border-red-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-800">Delete Account</h4>
                      <p className="text-sm text-red-600">
                        Permanently delete your account and all associated data.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete account</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete your account? All of your data will be permanently removed
                        from our servers forever. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // Handle account deletion
                    setShowDeleteModal(false);
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-components for each settings section
function GeneralSettings() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Inc',
    timezone: 'America/New_York',
  });

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Profile</h3>
        <p className="mt-1 text-sm text-gray-500">
          This information will be displayed publicly so be careful what you share.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
            Timezone
          </label>
          <select
            id="timezone"
            name="timezone"
            value={formData.timezone}
            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <div className="mt-2 flex items-center">
            <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <button
              type="button"
              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecuritySettings({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
        <p className="mt-1 text-sm text-gray-500">
          Update your password associated with your account.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
            Current password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="current-password"
              name="current-password"
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="text-gray-400 hover:text-gray-500"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
            New password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="new-password"
              name="new-password"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="text-gray-400 hover:text-gray-500"
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Confirm new password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="confirm-password"
              name="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function AppearanceSettings({ darkMode, setDarkMode }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [density, setDensity] = useState('comfortable');

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Theme</h3>
        <p className="mt-1 text-sm text-gray-500">
          Customize how the application looks on your device.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Color Theme</label>
          <div className="mt-2 flex space-x-4">
            <div
              onClick={() => setTheme('light')}
              className={`p-4 border-2 rounded-lg cursor-pointer ${
                theme === 'light' ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <div className="bg-white rounded-md shadow overflow-hidden">
                <div className="h-4 bg-gray-100"></div>
                <div className="h-4 bg-white"></div>
                <div className="h-4 bg-blue-500"></div>
              </div>
              <p className="mt-2 text-sm font-medium text-center">Light</p>
            </div>
            <div
              onClick={() => setTheme('dark')}
              className={`p-4 border-2 rounded-lg cursor-pointer ${
                theme === 'dark' ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <div className="bg-gray-800 rounded-md shadow overflow-hidden">
                <div className="h-4 bg-gray-700"></div>
                <div className="h-4 bg-gray-800"></div>
                <div className="h-4 bg-blue-600"></div>
              </div>
              <p className="mt-2 text-sm font-medium text-center">Dark</p>
            </div>
            <div
              onClick={() => setTheme('system')}
              className={`p-4 border-2 rounded-lg cursor-pointer ${
                theme === 'system' ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <div className="bg-white rounded-md shadow overflow-hidden border border-gray-200">
                <div className="h-4 bg-gray-100"></div>
                <div className="h-4 bg-white"></div>
                <div className="h-4 bg-blue-500"></div>
              </div>
              <p className="mt-2 text-sm font-medium text-center">System</p>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="font-size" className="block text-sm font-medium text-gray-700">
            Font Size
          </label>
          <select
            id="font-size"
            name="font-size"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Density</label>
          <div className="mt-2 space-y-2">
            {['compact', 'comfortable', 'spacious'].map((size) => (
              <div key={size} className="flex items-center">
                <input
                  id={`density-${size}`}
                  name="density"
                  type="radio"
                  checked={density === size}
                  onChange={() => setDensity(size)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label
                  htmlFor={`density-${size}`}
                  className="ml-3 block text-sm font-medium text-gray-700 capitalize"
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings({ notifications, setNotifications }) {
  const toggleNotification = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage when you&apos;ll receive email notifications from us.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Account activity</h4>
            <p className="text-sm text-gray-500">Important notifications about your account</p>
          </div>
          <button
            type="button"
            onClick={() => toggleNotification('account')}
            className={`${
              notifications.account ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            role="switch"
            aria-checked={notifications.account}
          >
            <span
              className={`${
                notifications.account ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Product updates</h4>
            <p className="text-sm text-gray-500">News and announcements</p>
          </div>
          <button
            type="button"
            onClick={() => toggleNotification('updates')}
            className={`${
              notifications.updates ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            role="switch"
            aria-checked={notifications.updates}
          >
            <span
              className={`${
                notifications.updates ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Marketing emails</h4>
            <p className="text-sm text-gray-500">Special offers and promotions</p>
          </div>
          <button
            type="button"
            onClick={() => toggleNotification('marketing')}
            className={`${
              notifications.marketing ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            role="switch"
            aria-checked={notifications.marketing}
          >
            <span
              className={`${
                notifications.marketing ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function BillingSettings() {
  const [billingInfo, setBillingInfo] = useState({
    name: 'John Doe',
    card: '•••• •••• •••• 4242',
    expiry: '12/24',
    cvc: '•••',
  });

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Billing Information</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage your billing information and view invoices.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Current Plan</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Pro Plan - $29/month</p>
          </div>
          <div className="px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Billing cycle</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Monthly</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Next billing date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">January 15, 2024</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Payment method</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Visa ending in 4242
                </dd>
              </div>
            </dl>
          </div>
          <div className="px-4 py-4 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update payment method
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Billing History</h3>
          </div>
          <div className="px-4 py-5 sm:p-0">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      id: 1,
                      date: 'Dec 15, 2023',
                      description: 'Pro Plan - Monthly',
                      amount: '$29.00',
                      status: 'Paid',
                    },
                    {
                      id: 2,
                      date: 'Nov 15, 2023',
                      description: 'Pro Plan - Monthly',
                      amount: '$29.00',
                      status: 'Paid',
                    },
                    {
                      id: 3,
                      date: 'Oct 15, 2023',
                      description: 'Pro Plan - Monthly',
                      amount: '$29.00',
                      status: 'Paid',
                    },
                  ].map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{invoice.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamSettings() {
  const [teamMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Owner',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '2h ago',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Admin',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '5h ago',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Member',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastActive: '1d ago',
    },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage who has access to your organization.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Invite team member
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {teamMembers.map((person) => (
            <li key={person.email}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 relative">
                      <Image
                        className="rounded-full"
                        src={person.image}
                        alt=""
                        fill
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{person.name}</div>
                      <div className="text-sm text-gray-500">{person.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {person.role}
                    </span>
                    <button
                      type="button"
                      className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function IntegrationsSettings() {
  const [integrations] = useState([
    {
      id: 1,
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior',
      icon: '📊',
      connected: true,
    },
    {
      id: 2,
      name: 'Slack',
      description: 'Get notifications in your Slack workspace',
      icon: '💬',
      connected: false,
    },
    {
      id: 3,
      name: 'Zapier',
      description: 'Connect with 3,000+ apps via Zapier',
      icon: '⚡',
      connected: false,
    },
    {
      id: 4,
      name: 'Mailchimp',
      description: 'Sync with your email marketing campaigns',
      icon: '✉️',
      connected: false,
    },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Connected Apps</h3>
        <p className="mt-1 text-sm text-gray-500">
          Connect third-party services to enhance your workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white overflow-hidden shadow rounded-lg border border-gray-200"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <span className="text-2xl">{integration.icon}</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {integration.name}
                    </dt>
                    <dd>
                      <div className="text-sm text-gray-900">{integration.description}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                {integration.connected ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Check className="h-3 w-3 mr-1" />
                    Connected
                  </span>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdvancedSettings() {
  const [exportFormat, setExportFormat] = useState('json');
  const [apiKey, setApiKey] = useState('sk_test_51NlYt4SJ8vL...');
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Advanced Settings</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure advanced settings for your account.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Export Data</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Export your account data in a standard format.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div>
              <label htmlFor="export-format" className="block text-sm font-medium text-gray-700">
                Export format
              </label>
              <select
                id="export-format"
                name="export-format"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
                <option value="xml">XML</option>
              </select>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">API Access</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage your API keys and access.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div>
              <label htmlFor="api-key" className="block text-sm font-medium text-gray-700">
                API Key
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  name="api-key"
                  id="api-key"
                  value={apiKey}
                  readOnly
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span>{showApiKey ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Keep your API key secure and don&apos;t share it with anyone.
              </p>
            </div>
            <div className="mt-5 space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Regenerate Key
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Documentation
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Danger Zone</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Irreversible and destructive actions.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-red-700">Delete Account</h4>
                <p className="text-sm text-gray-500">
                  Permanently delete your account and all of your data.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}