'use client';

export default function LayoutProperties({ component, onUpdate }) {
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
      <h4 className="font-semibold text-gray-900">Layout</h4>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Display
        </label>
        <select
          value={component.styles?.display || 'block'}
          onChange={(e) => handleChange('display', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="block">Block</option>
          <option value="inline-block">Inline Block</option>
          <option value="flex">Flex</option>
          <option value="grid">Grid</option>
          <option value="none">None</option>
        </select>
      </div>

      {component.styles?.display === 'flex' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flex Direction
            </label>
            <select
              value={component.styles?.flexDirection || 'row'}
              onChange={(e) => handleChange('flexDirection', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="row">Row</option>
              <option value="column">Column</option>
              <option value="row-reverse">Row Reverse</option>
              <option value="column-reverse">Column Reverse</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Justify Content
            </label>
            <select
              value={component.styles?.justifyContent || 'flex-start'}
              onChange={(e) => handleChange('justifyContent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="flex-start">Start</option>
              <option value="center">Center</option>
              <option value="flex-end">End</option>
              <option value="space-between">Space Between</option>
              <option value="space-around">Space Around</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Align Items
            </label>
            <select
              value={component.styles?.alignItems || 'stretch'}
              onChange={(e) => handleChange('alignItems', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="stretch">Stretch</option>
              <option value="flex-start">Start</option>
              <option value="center">Center</option>
              <option value="flex-end">End</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gap
            </label>
            <input
              type="text"
              value={component.styles?.gap || ''}
              onChange={(e) => handleChange('gap', e.target.value)}
              placeholder="10px"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Width
        </label>
        <input
          type="text"
          value={component.styles?.width || ''}
          onChange={(e) => handleChange('width', e.target.value)}
          placeholder="auto"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Height
        </label>
        <input
          type="text"
          value={component.styles?.height || ''}
          onChange={(e) => handleChange('height', e.target.value)}
          placeholder="auto"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Position
        </label>
        <select
          value={component.styles?.position || 'static'}
          onChange={(e) => handleChange('position', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="static">Static</option>
          <option value="relative">Relative</option>
          <option value="absolute">Absolute</option>
          <option value="fixed">Fixed</option>
          <option value="sticky">Sticky</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Border Radius
        </label>
        <input
          type="text"
          value={component.styles?.borderRadius || ''}
          onChange={(e) => handleChange('borderRadius', e.target.value)}
          placeholder="0px"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Border Width
        </label>
        <input
          type="text"
          value={component.styles?.borderWidth || ''}
          onChange={(e) => handleChange('borderWidth', e.target.value)}
          placeholder="0px"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Border Style
        </label>
        <select
          value={component.styles?.borderStyle || 'solid'}
          onChange={(e) => handleChange('borderStyle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
  );
}