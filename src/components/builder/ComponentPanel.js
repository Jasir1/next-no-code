// components/builder/ComponentPanel.jsx
'use client';

import { useDraggable } from '@dnd-kit/core';
import { defaultComponents } from '@/lib/utils/componentRegistry';
import * as Icons from 'lucide-react';

function DraggableComponent({ component }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `draggable-${component.type}`,
    data: component,
  });

  const Icon = Icons[component.icon];

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-gray-200 rounded-lg cursor-move hover:border-blue-500 hover:shadow-md transition-all"
    >
      {Icon && <Icon className="w-6 h-6 text-gray-600" />}
      <span className="text-sm font-medium text-gray-700">{component.label}</span>
    </div>
  );
}

export default function ComponentPanel() {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Components</h3>
      <div className="grid grid-cols-2 gap-3">
        {defaultComponents.map((component) => (
          <DraggableComponent key={component.type} component={component} />
        ))}
      </div>
    </div>
  );
}