// components/builder/PropertiesPanel.jsx
'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export default function PropertiesPanel() {
  const { components, selectedComponent, updateComponent } = useEditorStore();
  
  const component = components.find((c) => c.id === selectedComponent);

  if (!component) {
    return (
      <div className="p-4 text-gray-500">
        Select a component to edit properties
      </div>
    );
  }

  const handleStyleChange = (property, value) => {
    updateComponent(component.id, {
      styles: {
        ...component.styles,
        [property]: value,
      },
    });
  };

  const handleContentChange = (value) => {
    updateComponent(component.id, { content: value });
  };

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-lg font-semibold">Properties</h3>
      
      {/* Content Editor */}
      {(component.content !== undefined) && (
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={component.content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows="3"
          />
        </div>
      )}

      {/* Spacing */}
      <div>
        <h4 className="font-medium mb-3">Spacing</h4>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Padding</label>
            <input
              type="text"
              value={component.styles.padding || ''}
              onChange={(e) => handleStyleChange('padding', e.target.value)}
              placeholder="e.g., 20px"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Margin</label>
            <input
              type="text"
              value={component.styles.margin || ''}
              onChange={(e) => handleStyleChange('margin', e.target.value)}
              placeholder="e.g., 10px"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h4 className="font-medium mb-3">Typography</h4>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Font Size</label>
            <input
              type="text"
              value={component.styles.fontSize || ''}
              onChange={(e) => handleStyleChange('fontSize', e.target.value)}
              placeholder="16px"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Font Weight</label>
            <select
              value={component.styles.fontWeight || '400'}
              onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="300">Light</option>
              <option value="400">Normal</option>
              <option value="500">Medium</option>
              <option value="600">Semi Bold</option>
              <option value="700">Bold</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Text Color</label>
            <ColorInput
              value={component.styles.color || '#000000'}
              onChange={(color) => handleStyleChange('color', color)}
            />
          </div>
        </div>
      </div>

      {/* Background */}
      <div>
        <h4 className="font-medium mb-3">Background</h4>
        <ColorInput
          value={component.styles.backgroundColor || '#ffffff'}
          onChange={(color) => handleStyleChange('backgroundColor', color)}
        />
      </div>

      {/* Border */}
      <div>
        <h4 className="font-medium mb-3">Border</h4>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Border Radius</label>
            <input
              type="text"
              value={component.styles.borderRadius || ''}
              onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
              placeholder="0px"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Color Input Component
function ColorInput({ value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div
          onClick={() => setShowPicker(!showPicker)}
          className="w-10 h-10 rounded border-2 border-gray-300 cursor-pointer"
          style={{ backgroundColor: value }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 p-2 border rounded text-sm"
        />
      </div>
      {showPicker && (
        <div className="absolute top-12 left-0 z-50 p-3 bg-white rounded-lg shadow-xl">
          <HexColorPicker color={value} onChange={onChange} />
          <button
            onClick={() => setShowPicker(false)}
            className="mt-2 w-full px-3 py-1 bg-gray-200 rounded text-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}