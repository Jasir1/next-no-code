'use client';

export default function SpacingProperties({ component, onUpdate }) {
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
      <h4 className="font-semibold text-gray-900">Spacing</h4>

      {/* Padding */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Padding
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Top"
            value={component.styles?.paddingTop || ''}
            onChange={(e) => handleChange('paddingTop', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Right"
            value={component.styles?.paddingRight || ''}
            onChange={(e) => handleChange('paddingRight', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Bottom"
            value={component.styles?.paddingBottom || ''}
            onChange={(e) => handleChange('paddingBottom', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Left"
            value={component.styles?.paddingLeft || ''}
            onChange={(e) => handleChange('paddingLeft', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          type="text"
          placeholder="All sides (e.g., 20px)"
          value={component.styles?.padding || ''}
          onChange={(e) => handleChange('padding', e.target.value)}
          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Margin */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Margin
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Top"
            value={component.styles?.marginTop || ''}
            onChange={(e) => handleChange('marginTop', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Right"
            value={component.styles?.marginRight || ''}
            onChange={(e) => handleChange('marginRight', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Bottom"
            value={component.styles?.marginBottom || ''}
            onChange={(e) => handleChange('marginBottom', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Left"
            value={component.styles?.marginLeft || ''}
            onChange={(e) => handleChange('marginLeft', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          type="text"
          placeholder="All sides (e.g., 10px)"
          value={component.styles?.margin || ''}
          onChange={(e) => handleChange('margin', e.target.value)}
          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}