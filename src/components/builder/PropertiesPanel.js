// components/builder/PropertiesPanel.jsx
'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { componentTypes } from '@/lib/utils/componentRegistry';

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

  const handlePropertyChange = (property, value) => {
    updateComponent(component.id, { [property]: value });
  };

  const handleArrayChange = (property, index, value) => {
    const array = component[property] || [];
    const newArray = [...array];
    newArray[index] = value;
    updateComponent(component.id, { [property]: newArray });
  };

  const addArrayItem = (property) => {
    const array = component[property] || [];
    updateComponent(component.id, { [property]: [...array, ''] });
  };

  const removeArrayItem = (property, index) => {
    const array = component[property] || [];
    const newArray = array.filter((_, i) => i !== index);
    updateComponent(component.id, { [property]: newArray });
  };

  return (
    <div className="p-4 space-y-6 max-h-screen overflow-y-auto">
      <h3 className="text-lg font-semibold">Properties</h3>
      
      {/* Component Type Display */}
      <div>
        <label className="block text-sm font-medium mb-2">Component Type</label>
        <div className="px-3 py-2 bg-gray-100 rounded text-sm capitalize">
          {component.type.replace('_', ' ')}
        </div>
      </div>

      {/* Content Editor - for text-based components */}
      {(component.content !== undefined) && (
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={component.content}
            onChange={(e) => handlePropertyChange('content', e.target.value)}
            className="w-full p-2 border rounded-md"
            rows="3"
          />
        </div>
      )}

      {/* Heading Tag Selector */}
      {component.type === componentTypes.HEADING && (
        <div>
          <label className="block text-sm font-medium mb-2">Heading Level</label>
          <select
            value={component.tag || 'h2'}
            onChange={(e) => handlePropertyChange('tag', e.target.value)}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="h4">H4</option>
            <option value="h5">H5</option>
            <option value="h6">H6</option>
          </select>
        </div>
      )}

      {/* Image Properties */}
      {component.type === componentTypes.IMAGE && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              value={component.src || ''}
              onChange={(e) => handlePropertyChange('src', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Alt Text</label>
            <input
              type="text"
              value={component.alt || ''}
              onChange={(e) => handlePropertyChange('alt', e.target.value)}
              placeholder="Describe the image"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
        </div>
      )}

      {/* Button Properties */}
      {component.type === componentTypes.BUTTON && (
        <div>
          <label className="block text-sm font-medium mb-2">Link URL</label>
          <input
            type="url"
            value={component.href || ''}
            onChange={(e) => handlePropertyChange('href', e.target.value)}
            placeholder="https://example.com"
            className="w-full p-2 border rounded text-sm"
          />
        </div>
      )}

      {/* Input Properties */}
      {component.type === componentTypes.INPUT && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Input Type</label>
            <select
              value={component.inputType || 'text'}
              onChange={(e) => handlePropertyChange('inputType', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
              <option value="number">Number</option>
              <option value="tel">Phone</option>
              <option value="url">URL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Placeholder</label>
            <input
              type="text"
              value={component.placeholder || ''}
              onChange={(e) => handlePropertyChange('placeholder', e.target.value)}
              placeholder="Enter placeholder text"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
        </div>
      )}

      {/* Video Properties */}
      {component.type === componentTypes.VIDEO && (
        <div>
          <label className="block text-sm font-medium mb-2">Video URL</label>
          <input
            type="url"
            value={component.src || ''}
            onChange={(e) => handlePropertyChange('src', e.target.value)}
            placeholder="https://example.com/video.mp4"
            className="w-full p-2 border rounded text-sm"
          />
        </div>
      )}

      {/* Navigation Properties */}
      {component.type === componentTypes.NAVIGATION && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Brand Name</label>
            <input
              type="text"
              value={component.brand || ''}
              onChange={(e) => handlePropertyChange('brand', e.target.value)}
              placeholder="Your Brand"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Navigation Links</label>
            {(component.links || []).map((link, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={link}
                  onChange={(e) => handleArrayChange('links', index, e.target.value)}
                  placeholder={`Link ${index + 1}`}
                  className="flex-1 p-2 border rounded text-sm"
                />
                <button
                  onClick={() => removeArrayItem('links', index)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('links')}
              className="w-full p-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Add Link
            </button>
          </div>
        </div>
      )}

      {/* Hero Properties */}
      {component.type === componentTypes.HERO && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={component.title || ''}
              onChange={(e) => handlePropertyChange('title', e.target.value)}
              placeholder="Hero title"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Subtitle</label>
            <input
              type="text"
              value={component.subtitle || ''}
              onChange={(e) => handlePropertyChange('subtitle', e.target.value)}
              placeholder="Hero subtitle"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Button Text</label>
            <input
              type="text"
              value={component.buttonText || ''}
              onChange={(e) => handlePropertyChange('buttonText', e.target.value)}
              placeholder="Call to action"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Background Image URL</label>
            <input
              type="url"
              value={component.backgroundImage || ''}
              onChange={(e) => handlePropertyChange('backgroundImage', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
        </div>
      )}

      {/* Card Properties */}
      {component.type === componentTypes.CARD && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Card Title</label>
            <input
              type="text"
              value={component.title || ''}
              onChange={(e) => handlePropertyChange('title', e.target.value)}
              placeholder="Card title"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Card Image URL</label>
            <input
              type="url"
              value={component.image || ''}
              onChange={(e) => handlePropertyChange('image', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
        </div>
      )}

      {/* List Properties */}
      {component.type === componentTypes.LIST && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">List Type</label>
            <select
              value={component.listType || 'unordered'}
              onChange={(e) => handlePropertyChange('listType', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="unordered">Unordered (bullets)</option>
              <option value="ordered">Ordered (numbers)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">List Items</label>
            {(component.items || []).map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('items', index, e.target.value)}
                  placeholder={`Item ${index + 1}`}
                  className="flex-1 p-2 border rounded text-sm"
                />
                <button
                  onClick={() => removeArrayItem('items', index)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('items')}
              className="w-full p-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Add Item
            </button>
          </div>
        </div>
      )}

      {/* Link Properties */}
      {component.type === componentTypes.LINK && (
        <div>
          <label className="block text-sm font-medium mb-2">Link URL</label>
          <input
            type="url"
            value={component.href || ''}
            onChange={(e) => handlePropertyChange('href', e.target.value)}
            placeholder="https://example.com"
            className="w-full p-2 border rounded text-sm"
          />
        </div>
      )}

      {/* Common Styling Properties */}
      <div>
        <h4 className="font-medium mb-3">Layout & Spacing</h4>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Width</label>
            <input
              type="text"
              value={component.styles.width || ''}
              onChange={(e) => handleStyleChange('width', e.target.value)}
              placeholder="auto"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Height</label>
            <input
              type="text"
              value={component.styles.height || ''}
              onChange={(e) => handleStyleChange('height', e.target.value)}
              placeholder="auto"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
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
            <label className="block text-xs text-gray-600 mb-1">Text Align</label>
            <select
              value={component.styles.textAlign || 'left'}
              onChange={(e) => handleStyleChange('textAlign', e.target.value)}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
              <option value="justify">Justify</option>
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

      {/* Border & Effects */}
      <div>
        <h4 className="font-medium mb-3">Border & Effects</h4>
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
          <div>
            <label className="block text-xs text-gray-600 mb-1">Box Shadow</label>
            <input
              type="text"
              value={component.styles.boxShadow || ''}
              onChange={(e) => handleStyleChange('boxShadow', e.target.value)}
              placeholder="0 2px 4px rgba(0,0,0,0.1)"
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