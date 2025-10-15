'use client';

import { useDroppable } from '@dnd-kit/core';

export default function ContainerElement({ id, styles, children, renderChild }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `container-${id}`,
  });

  return (
    <div
      ref={setNodeRef}
      style={styles}
      className={`min-h-[100px] transition-all ${
        isOver ? 'ring-2 ring-blue-400' : ''
      }`}
    >
      {children && children.length > 0 ? (
        children.map((child) => renderChild(child))
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          Drop components here
        </div>
      )}
    </div>
  );
}