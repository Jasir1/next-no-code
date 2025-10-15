'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export default function ColorProperties({ component, onUpdate }) {
  const [showTextPicker, setShowTextPicker] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [showBorderPicker, setShowBorderPicker] = useState(false);

  const handleChange = (property, value) => {
    onUpdate({
      styles: {
        ...component.styles,
        [property]: value,
      },
    });
  };

  const ColorInput = ({ label, property, showPicker, setShowPicker }) => {
    const value = component.styles?.[property] || '#000000';

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="flex gap-2">
          <div
            onClick={() => setShowPicker(!showPicker)}
            className="w-12 h-10 rounded-md border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition"
            style={{ backgroundColor: value }}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(property, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#000000"
          />
        </div>
        {showPicker && (
          <div className="relative mt-2">
            <div className="absolute z-50 p-3 bg-white rounded-lg shadow-xl border border-gray-200">
              <HexColorPicker color={value} onChange={(color) => handleChange(property, color)} />
              <button
                onClick={() => setShowPicker(false)}
                className="mt-3 w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Colors</h4>

      <ColorInput
        label="Text Color"
        property="color"
        showPicker={showTextPicker}
        setShowPicker={setShowTextPicker}
      />

      <ColorInput
        label="Background Color"
        property="backgroundColor"
        showPicker={showBgPicker}
        setShowPicker={setShowBgPicker}
      />

      <ColorInput
        label="Border Color"
        property="borderColor"
        showPicker={showBorderPicker}
        setShowPicker={setShowBorderPicker}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Opacity
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={component.styles?.opacity || 1}
          onChange={(e) => handleChange('opacity', e.target.value)}
          className="w-full"
        />
        <span className="text-sm text-gray-600">
          {component.styles?.opacity || 1}
        </span>
      </div>
    </div>
  );
}