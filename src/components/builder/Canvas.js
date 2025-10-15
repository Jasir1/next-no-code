// components/builder/Canvas.jsx
'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEditorStore } from '@/lib/store/editorStore';
import RenderComponent from './RenderComponent';

export default function Canvas() {
  const { components, currentBreakpoint } = useEditorStore();
  const { setNodeRef } = useDroppable({ id: 'canvas' });
  
  const breakpointClasses = {
    desktop: 'w-full',
    tablet: 'w-[768px] mx-auto',
    mobile: 'w-[375px] mx-auto',
  };

  return (
    <div className="flex-1 bg-gray-100 p-8 overflow-auto">
      <div
        ref={setNodeRef}
        className={`bg-white min-h-[calc(100vh-4rem)] shadow-lg transition-all ${breakpointClasses[currentBreakpoint]}`}
      >
        <SortableContext
          items={components.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {components.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400">
              Drag components here to start building
            </div>
          ) : (
            components.map((component) => (
              <RenderComponent key={component.id} component={component} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}