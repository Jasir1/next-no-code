'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Search, 
  Grid, 
  List, 
  Star, 
  Clock,
  Zap,
  LayoutGrid,
  Palette,
  Smartphone,
  Laptop,
  TabletSmartphone,
  ArrowRight,
  Plus,
  Filter,
  ChevronDown,
  Check,
  Briefcase,
  User,
  ShoppingCart,
  Newspaper,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

// Template categories
const categories = [
  { id: 'all', name: 'All Templates', count: 42 },
  { id: 'business', name: 'Business', count: 12, icon: <Briefcase className="w-4 h-4" /> },
  { id: 'portfolio', name: 'Portfolio', count: 8, icon: <User className="w-4 h-4" /> },
  { id: 'ecommerce', name: 'E-commerce', count: 10, icon: <ShoppingCart className="w-4 h-4" /> },
  { id: 'blog', name: 'Blog', count: 7, icon: <Newspaper className="w-4 h-4" /> },
  { id: 'landing', name: 'Landing Page', count: 5, icon: <LayoutGrid className="w-4 h-4" /> },
];

// Template data
const templates = [
  {
    id: '1',
    name: 'Minimal Portfolio',
    category: 'portfolio',
    preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    likes: 1243,
    isNew: true,
    isPopular: true,
    colorScheme: 'light',
    pages: 5,
    updated: '2 days ago'
  },
  {
    id: '2',
    name: 'Modern Business',
    category: 'business',
    preview: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    likes: 987,
    isNew: false,
    isPopular: true,
    colorScheme: 'dark',
    pages: 8,
    updated: '1 week ago'
  },
  // Add more templates as needed
];

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortTemplates = (a, b) => {
    if (sortBy === 'popular') return b.likes - a.likes;
    if (sortBy === 'newest') return new Date(b.updated) - new Date(a.updated);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  };

  const sortedTemplates = [...filteredTemplates].sort(sortTemplates);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-500">Choose from our professionally designed templates</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="pl-10 pr-4 py-2.5 w-full rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">Filters</span>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg p-4 z-10">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Sort by</h4>
                  {[
                    { id: 'popular', label: 'Most Popular' },
                    { id: 'newest', label: 'Newest' },
                    { id: 'name', label: 'Name (A-Z)' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSortBy(option.id);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between ${
                        sortBy === option.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                      {sortBy === option.id && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center space-x-3 mb-8 overflow-x-auto pb-2 -mx-2 px-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {category.icon && (
              <span className={selectedCategory === category.id ? 'text-white' : 'text-blue-500'}>
                {category.icon}
              </span>
            )}
            <span className="font-medium">{category.name}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {selectedCategory === 'all'
            ? 'All Templates'
            : `${categories.find(c => c.id === selectedCategory)?.name} Templates`}{' '}
          <span className="text-gray-500">({filteredTemplates.length})</span>
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

      {/* Templates Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {sortedTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={template.preview}
                    alt={template.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-colors">
                        <Star className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-colors">
                        <Zap className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {template.isNew && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                      New
                    </div>
                  )}
                  {template.isPopular && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full flex items-center">
                      <Star className="h-3 w-3 fill-current mr-1" />
                      Popular
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {template.name}
                      </h3>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                          {template.category}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {template.updated}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{template.likes.toLocaleString()}</span>
                    </div>
                    <Link
                      href={`/dashboard/editor/new?template=${template.id}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Use Template <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTemplates.map((template) => (
                <tr key={template.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-16 rounded-md overflow-hidden bg-gray-100 relative">
                        <Image className="object-cover" src={template.preview} alt="" fill />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{template.name}</div>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-500 ml-1">{template.likes.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {template.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {template.updated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        Preview
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        Use
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <LayoutGrid className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No templates found</h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            {searchQuery
              ? "No templates match your search. Try a different term."
              : "We couldn't find any templates in this category."}
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}