// components/builder/RenderComponent.jsx
'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditorStore } from '@/lib/store/editorStore';
import { componentTypes } from '@/lib/utils/componentRegistry';
import { useState } from 'react';
import { BlockControls } from '@/components/editor/BlockControls';

export default function RenderComponent({ component }) {
  const { selectedComponent, selectComponent, updateComponent, deleteComponent, reorderComponents, components } = useEditorStore();
  const [isHovered, setIsHovered] = useState(false);
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Block controls handlers
  const handleMoveUp = () => {
    const currentIndex = components.findIndex(c => c.id === component.id);
    if (currentIndex > 0) {
      const newComponents = [...components];
      [newComponents[currentIndex - 1], newComponents[currentIndex]] = [newComponents[currentIndex], newComponents[currentIndex - 1]];
      reorderComponents(newComponents);
    }
  };

  const handleMoveDown = () => {
    const currentIndex = components.findIndex(c => c.id === component.id);
    if (currentIndex < components.length - 1) {
      const newComponents = [...components];
      [newComponents[currentIndex], newComponents[currentIndex + 1]] = [newComponents[currentIndex + 1], newComponents[currentIndex]];
      reorderComponents(newComponents);
    }
  };

  const handleDuplicate = () => {
    const newComponent = {
      ...component,
      id: Date.now().toString(),
    };
    updateComponent(component.id, { ...component, duplicate: true });
    // Note: In a real implementation, you'd add the duplicated component to the store
  };

  const handleDelete = () => {
    deleteComponent(component.id);
  };

  const handleConvertTo = (id, newType) => {
    updateComponent(id, { type: newType });
  };

  const currentIndex = components.findIndex(c => c.id === component.id);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === components.length - 1;

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

      case componentTypes.INPUT:
        return (
          <input
            type={component.type || 'text'}
            placeholder={component.placeholder}
            className="w-full"
          />
        );

      case componentTypes.FORM:
        return (
          <form className="space-y-4">
            {component.children?.map((child) => (
              <RenderComponent key={child.id} component={child} />
            ))}
          </form>
        );

      case componentTypes.VIDEO:
        return (
          <video
            src={component.src}
            controls
            className="max-w-full h-auto"
          >
            Your browser does not support the video tag.
          </video>
        );

      case componentTypes.NAVIGATION:
        return (
          <nav className="flex items-center justify-between">
            <div className="font-bold text-xl">{component.brand}</div>
            <ul className="flex space-x-6">
              {component.links?.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        );

      case componentTypes.HERO:
        return (
          <div
            className="text-center py-20"
            style={{
              backgroundImage: component.backgroundImage ? `url(${component.backgroundImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <h1 className="text-4xl font-bold mb-4">{component.title}</h1>
            <p className="text-xl mb-8">{component.subtitle}</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              {component.buttonText}
            </button>
          </div>
        );

      case componentTypes.CARD:
        return (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {component.image && (
              <img
                src={component.image}
                alt={component.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{component.title}</h3>
              <p className="text-gray-600">{component.content}</p>
            </div>
          </div>
        );

      case componentTypes.LIST:
        const ListTag = component.type === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag className={component.type === 'ordered' ? 'list-decimal' : 'list-disc'}>
            {component.items?.map((item, index) => (
              <li key={index} className="ml-6 py-1">{item}</li>
            ))}
          </ListTag>
        );

      case componentTypes.DIVIDER:
        return <hr />;

      case componentTypes.ICON:
        // For now, just render a placeholder. In a real app, you'd use an icon library
        return <span className="inline-block">⭐</span>;

      case componentTypes.LINK:
        return (
          <a href={component.href} className="hover:underline">
            {component.content}
          </a>
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer transition-all group ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
    >
      {renderElement()}
      {isSelected && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 -translate-y-full z-10">
          {component.type}
        </div>
      )}
      {(isHovered || isSelected) && (
        <BlockControls
          blockId={component.id}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          onConvertTo={handleConvertTo}
          isFirst={isFirst}
          isLast={isLast}
          blockType={component.type}
        />
      )}
    </div>
  );
}