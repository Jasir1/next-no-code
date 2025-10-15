'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { Eye, EyeOff, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function LayersPanel() {
  const { components, selectedComponent, selectComponent, deleteComponent } =
    useEditorStore();
  const [expandedLayers, setExpandedLayers] = useState({});

  const toggleExpand = (id) => {
    setExpandedLayers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const LayerItem = ({ component, depth = 0 }) => {
    const isSelected = selectedComponent === component.id;
    const hasChildren = component.children && component.children.length > 0;
    const isExpanded = expandedLayers[component.id];

    return (
      <div>
        <div
          onClick={() => selectComponent(component.id)}
          className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition ${
            isSelected ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
          }`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(component.id);
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}

          <div className="flex-1 flex items-center gap-2">
            <span className="text-sm font-medium truncate">
              {component.type}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteComponent(component.id);
            }}
            className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded transition"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {component.children.map((child) => (
              <LayerItem key={child.id} component={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Layers</h3>
      {components.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No layers yet
        </p>
      ) : (
        <div className="space-y-1">
          {components.map((component) => (
            <div key={component.id} className="group">
              <LayerItem component={component} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}