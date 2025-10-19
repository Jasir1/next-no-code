'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  FolderOpen, 
  Search, 
  Grid, 
  List, 
  ArrowRight, 
  Star, 
  Clock,
  FileText,
  MoreHorizontal,
  Users,
  Eye,
  Share2,
  Download,
  Trash2,
  FolderPlus,
  FolderInput,
  FolderSync,
  FolderSearch
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

// Sample project data
const projects = [
  {
    id: '1',
    name: 'Portfolio Website',
    updatedAt: '2024-01-15',
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
    category: 'Portfolio',
    pages: 5,
    lastEdited: '2 hours ago',
    status: 'active',
    views: '1.2k',
    starred: true
  },
  // Add more projects as needed
];

const categories = [
  { id: 'all', name: 'All Projects', icon: FolderOpen, count: 12 },
  { id: 'recent', name: 'Recent', icon: Clock, count: 5 },
  { id: 'starred', name: 'Starred', icon: Star, count: 3 },
  { id: 'templates', name: 'Templates', icon: FileText, count: 8 },
];

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
          <p className="text-gray-500">Create and manage your website projects</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link 
            href="/dashboard/editor/new"
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              whileHover={{ y: -5 }}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                selectedCategory === category.id 
                  ? 'bg-white shadow-lg border-2 border-blue-100' 
                  : 'bg-white hover:shadow-md'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                  {category.count}
                </span>
              </div>
              <h3 className="mt-3 font-medium text-gray-900">{category.name}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {selectedCategory === 'all' ? 'All Projects' : 
             selectedCategory === 'recent' ? 'Recent Projects' :
             selectedCategory === 'starred' ? 'Starred Projects' : 'Templates'}
          </h2>
          <div className="flex space-x-2 bg-white p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="relative h-40 bg-gray-100 overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex space-x-2">
                        <button className="p-2 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    {project.starred && (
                      <div className="absolute top-3 right-3 p-1.5 bg-yellow-100 text-yellow-600 rounded-full">
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{project.category}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> {project.lastEdited}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" /> {project.views}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Edited</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-16 rounded-md overflow-hidden bg-gray-100">
                          <img className="h-full w-full object-cover" src={project.thumbnail} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{project.name}</div>
                          <div className="text-sm text-gray-500">{project.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> {project.lastEdited}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" /> {project.views}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Share2 className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-colors">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <FolderPlus className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Create New Project</h4>
              <p className="text-sm text-gray-500">Start from scratch</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-colors">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
              <FolderInput className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Import Project</h4>
              <p className="text-sm text-gray-500">Upload existing project</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-colors">
            <div className="p-2 rounded-lg bg-green-100 text-green-600">
              <FolderSearch className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Browse Templates</h4>
              <p className="text-sm text-gray-500">Start with a template</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}