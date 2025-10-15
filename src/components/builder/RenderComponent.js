// components/builder/RenderComponent.jsx
'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditorStore } from '@/lib/store/editorStore';
import { componentTypes } from '@/lib/utils/componentRegistry';

export default function RenderComponent({ component }) {
  const { selectedComponent, selectComponent } = useEditorStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...component.styles,
  };

  const isSelected = selectedComponent === component.id;

  const handleClick = (e) => {
    e.stopPropagation();
    selectComponent(component.id);
  };

  const renderElement = () => {
    switch (component.type) {
      case componentTypes.HEADING:
        const Tag = component.tag || 'h2';
        return <Tag>{component.content}</Tag>;
      
      case componentTypes.TEXT:
        return <p>{component.content}</p>;
      
      case componentTypes.BUTTON:
        return (
          <button type="button">
            {component.content}
          </button>
        );
      
      case componentTypes.IMAGE:
        return (
          <img
            src={component.src}
            alt={component.alt}
            className="max-w-full h-auto"
          />
        );
      
      case componentTypes.CONTAINER:
        return (
          <div className="min-h-[100px]">
            {component.children?.map((child) => (
              <RenderComponent key={child.id} component={child} />
            ))}
          </div>
        );
      
      default:
        return <div>Unknown component</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className={`relative cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
    >
      {renderElement()}
      {isSelected && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 -translate-y-full">
          {component.type}
        </div>
      )}
    </div>
  );
}