// components/editor/BlockPatterns.jsx
'use client';

import { useState } from 'react';
import { 
  LayoutGrid, 
  LayoutList, 
  Columns, 
  Rows, 
  PanelTop, 
  PanelBottom,
  PanelLeft,
  PanelRight,
  GalleryVertical,
  Container
} from 'lucide-react';

const PATTERN_CATEGORIES = [
  { id: 'all', label: 'All', icon: <LayoutGrid size={16} /> },
  { id: 'sections', label: 'Sections', icon: <LayoutList size={16} /> },
  { id: 'headers', label: 'Headers', icon: <PanelTop size={16} /> },
  { id: 'footers', label: 'Footers', icon: <PanelBottom size={16} /> },
  { id: 'sidebars', label: 'Sidebars', icon: <PanelRight size={16} /> },
];

const PATTERNS = [
  {
    id: 'hero',
    title: 'Hero Section',
    description: 'A full-width hero section with heading, text, and call-to-action',
    category: 'sections',
    icon: <Container size={20} />,
    preview: (
      <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
        Hero Section
      </div>
    ),
    content: {
      type: 'section',
      props: { 
        className: 'py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white',
      },
      children: [
        {
          type: 'heading',
          props: {
            level: 1,
            content: 'Welcome to Our Website',
            className: 'text-4xl font-bold mb-4',
          },
        },
        {
          type: 'paragraph',
          props: {
            content: 'Create beautiful websites with our powerful page builder and stunning templates.',
            className: 'text-xl mb-8 max-w-2xl',
          },
        },
        {
          type: 'button',
          props: {
            text: 'Get Started',
            url: '#',
            variant: 'secondary',
          },
        },
      ],
    },
  },
  // Add more patterns...
];

export function BlockPatterns({ onInsert }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatterns = PATTERNS.filter(pattern => 
    (selectedCategory === 'all' || pattern.category === selectedCategory) &&
    (pattern.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     pattern.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
        {PATTERN_CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm ${
              selectedCategory === category.id
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-blue-500">{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search patterns..."
          className="w-full p-2 pl-8 border rounded-md mb-4 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg
          className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatterns.map((pattern) => (
          <div
            key={pattern.id}
            className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onInsert(pattern.content)}
          >
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{pattern.title}</h3>
                {pattern.icon}
              </div>
              <p className="text-sm text-gray-500 mt-1">{pattern.description}</p>
            </div>
            <div className="p-2 bg-white">
              {pattern.preview || (
                <div className="h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                  Preview
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}