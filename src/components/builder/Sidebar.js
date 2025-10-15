'use client';

import { useState } from 'react';
import { Box, Layers, Settings } from 'lucide-react';
import ComponentPanel from './ComponentPanel';
import LayersPanel from './LayersPanel';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('components');

  const tabs = [
    { id: 'components', label: 'Components', icon: Box },
    { id: 'layers', label: 'Layers', icon: Layers },
  ];

  return (
    <div className="w-64 bg-white border-r flex flex-col h-full">
      {/* Tab Navigation */}
      <div className="flex border-b">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 transition ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'components' && <ComponentPanel />}
        {activeTab === 'layers' && <LayersPanel />}
      </div>
    </div>
  );
}