'use client';

export default function TextProperties({ component, onUpdate }) {
  const handleChange = (property, value) => {
    onUpdate({
      styles: {
        ...component.styles,
        [property]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Typography</h4>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Font Size
        </label>
        <input
          type="text"
          value={component.styles?.fontSize || '16px'}
          onChange={(e) => handleChange('fontSize', e.target.value)}
          placeholder="16px"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Font Weight
        </label>
        <select
          value={component.styles?.fontWeight || '400'}
          onChange={(e) => handleChange('fontWeight', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="300">Light (300)</option>
          <option value="400">Normal (400)</option>
          <option value="500">Medium (500)</option>
          <option value="600">Semi Bold (600)</option>
          <option value="700">Bold (700)</option>
          <option value="800">Extra Bold (800)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Line Height
        </label>
        <input
          type="text"
          value={component.styles?.lineHeight || '1.5'}
          onChange={(e) => handleChange('lineHeight', e.target.value)}
          placeholder="1.5"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text Align
        </label>
        <div className="grid grid-cols-4 gap-2">
          {['left', 'center', 'right', 'justify'].map((align) => (
            <button
              key={align}
              onClick={() => handleChange('textAlign', align)}
              className={`px-3 py-2 border rounded-md text-sm capitalize ${
                component.styles?.textAlign === align
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {align}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Letter Spacing
        </label>
        <input
          type="text"
          value={component.styles?.letterSpacing || 'normal'}
          onChange={(e) => handleChange('letterSpacing', e.target.value)}
          placeholder="normal"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}