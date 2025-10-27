"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  FolderOpen,
  Settings,
  LogOut,
  Search,
  Grid,
  List,
  ArrowRight,
  Sparkles,
  Zap,
  Layout,
  Palette,
  Code,
  Smartphone,
  Globe,
  Users,
  FileText,
  BarChart2,
  Clock,
  MoreHorizontal,
} from "lucide-react";

// Sample project thumbnails
const sampleThumbnails = [
  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
];

const getRandomThumbnail = () => {
  return sampleThumbnails[Math.floor(Math.random() * sampleThumbnails.length)];
};

export default function DashboardPage() {
  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "My First Website",
      updatedAt: "2024-01-15",
      thumbnail: getRandomThumbnail(),
      category: "Business",
      pages: 5,
      lastEdited: "2 hours ago",
      status: "active",
    },
    {
      id: "2",
      name: "Landing Page",
      updatedAt: "2024-01-14",
      thumbnail: getRandomThumbnail(),
      category: "Marketing",
      pages: 1,
      lastEdited: "1 day ago",
      status: "active",
    },
    {
      id: "3",
      name: "E-commerce Store",
      updatedAt: "2024-01-10",
      thumbnail: getRandomThumbnail(),
      category: "E-commerce",
      pages: 12,
      lastEdited: "3 days ago",
      status: "draft",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeTab === "all" || project.status === activeTab)
  );

  const stats = [
    {
      name: "Total Projects",
      value: projects.length,
      icon: FolderOpen,
      change: "+2 from last month",
    },
    {
      name: "Active Users",
      value: "1,234",
      icon: Users,
      change: "+12.5% from last month",
    },
    {
      name: "Pages Created",
      value: "42",
      icon: FileText,
      change: "+8 from last month",
    },
    {
      name: "Templates Used",
      value: "7",
      icon: Palette,
      change: "3 new this month",
    },
  ];

  const quickActions = [
    {
      name: "New Project",
      icon: Plus,
      color: "from-blue-500 to-cyan-400",
      href: "#",
    },
    {
      name: "Use Template",
      icon: Code,
      color: "from-purple-500 to-pink-500",
      href: "#",
    },
    {
      name: "Mobile Preview",
      icon: Smartphone,
      color: "from-green-500 to-emerald-400",
      href: "#",
    },
    {
      name: "Publish",
      icon: Globe,
      color: "from-amber-500 to-orange-400",
      href: "#",
    },
  ];

  const tabs = [
    { id: "all", name: "All Projects", count: projects.length },
    {
      id: "active",
      name: "Active",
      count: projects.filter((p) => p.status === "active").length,
    },
    {
      id: "draft",
      name: "Drafts",
      count: projects.filter((p) => p.status === "draft").length,
    },
    { id: "archived", name: "Archived", count: 0 },
  ];

  const navItems = [
    {
      id: "projects",
      label: "Projects",
      icon: FolderOpen,
      href: "/dashboard/projects",
      active: true,
    },
    {
      id: "templates",
      label: "Templates",
      icon: Layout,
      href: "/dashboard/templates",
      active: false,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart2,
      href: "/dashboard/analytics",
      active: false,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: false,
    },
  ];

  const handleCreateProject = () => {
    // Add your project creation logic here
    const newProject = {
      id: Date.now().toString(),
      name: `New Project ${projects.length + 1}`,
      updatedAt: new Date().toISOString().split("T")[0],
      thumbnail: getRandomThumbnail(),
      category: "New",
      pages: 1,
      lastEdited: "Just now",
      status: "draft",
    };
    setProjects([newProject, ...projects]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Main Content */}
      <div className="ml-20 p-8">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">
              Welcome back! Here&apos;s what&apos;s happening with your projects.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white/50 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreateProject}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-100 hover:scale-[1.02] transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>New Project</span>
            </motion.button>
          </div>
        </motion.header>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.name}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.name}
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-green-600">{stat.change}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.name}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                  className={`bg-gradient-to-r ${action.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-left`}
                >
                  <div className="flex items-center justify-between h-full">
                    <div>
                      <p className="text-sm font-medium">{action.name}</p>
                      <p className="text-xs opacity-80 mt-1">
                        Click to get started
                      </p>
                    </div>
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                My Projects
              </h2>

              <div className="flex items-center gap-4">
                <div className="flex rounded-lg bg-gray-100 p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        activeTab === tab.id
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{tab.name}</span>
                        {tab.count > 0 && (
                          <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {tab.count}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex bg-white rounded-xl p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${
                      viewMode === "grid"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${
                      viewMode === "list"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-500">Loading your projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FolderOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No projects found
              </h3>
              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                {searchTerm
                  ? "No projects match your search. Try a different term."
                  : "Get started by creating a new project."}
              </p>
              <div className="mt-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateProject}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  New Project
                </motion.button>
              </div>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{
                      y: -5,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-100 transition-all duration-300"
                  >
                    <div className="h-48 bg-gray-100 relative group">
                      <Image
                        src={project.thumbnail}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex space-x-2">
                          <button className="p-2 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-colors">
                            <Settings className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-colors">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button className="p-2 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-colors">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {project.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                              {project.category}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <FileText className="w-3 h-3 mr-1" />{" "}
                              {project.pages} pages
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />{" "}
                            {project.lastEdited}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <Link
                          href={`/editor/${project.id}`}
                          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 group transition-colors"
                        >
                          Open Project
                          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                              style={{ zIndex: 3 - i }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Add New Project Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreateProject}
                className="h-full min-h-[300px] border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-6 text-center hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-200 transition-colors">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  New Project
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Start from scratch or use a template
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Create Project
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Project Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Edited
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProjects.map((project) => (
                      <motion.tr
                        key={project.id}
                        className="hover:bg-gray-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-16 rounded-md overflow-hidden bg-gray-100 relative">
                              <Image
                                className="object-cover"
                                src={project.thumbnail}
                                alt=""
                                fill
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {project.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {project.pages} pages
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {project.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />{" "}
                            {project.lastEdited}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              project.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {project.status === "active" ? "Active" : "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={`/editor/${project.id}`}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <span>Edit</span>
                              <ArrowRight className="ml-1 w-4 h-4" />
                            </Link>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              {
                id: 1,
                user: "You",
                action: "created",
                project: "Portfolio Website",
                time: "2 hours ago",
                avatar: "Y",
              },
              {
                id: 2,
                user: "Alex Johnson",
                action: "updated",
                project: "Landing Page",
                time: "5 hours ago",
                avatar: "A",
              },
              {
                id: 3,
                user: "Sam Wilson",
                action: "commented on",
                project: "E-commerce Store",
                time: "1 day ago",
                avatar: "S",
              },
              {
                id: 4,
                user: "You",
                action: "published",
                project: "Blog Template",
                time: "2 days ago",
                avatar: "Y",
              },
            ].map((activity) => (
              <div
                key={activity.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {activity.avatar}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-gray-900">
                        {activity.user}
                      </span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium text-gray-900">
                        {activity.project}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="fixed -z-10 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>
    </div>
  );
}
