// app/editor/[projectId]/page.js
'use client';

import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';
import Canvas from '@/components/builder/Canvas';
import ComponentPanel from '@/components/builder/ComponentPanel';
import PropertiesPanel from '@/components/builder/PropertiesPanel';
import Toolbar from '@/components/builder/Toolbar';
import { Undo2, Redo2, Eye, Save } from 'lucide-react';

export default function EditorPage() {
  const { addComponent, undo, redo } = useEditorStore();
  const [activeId, setActiveId] = useState(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (over && over.id === 'canvas') {
      const componentData = active.data.current;
      addComponent({
        type: componentData.type,
        ...componentData.defaultProps,
      });
    }
    
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 bg-white border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Page Builder</h1>
            <div className="flex gap-2">
              <button
                onClick={undo}
                className="p-2 hover:bg-gray-100 rounded"
                title="Undo"
              >
                <Undo2 className="w-5 h-5" />
              </button>
              <button
                onClick={redo}
                className="p-2 hover:bg-gray-100 rounded"
                title="Redo"
              >
                <Redo2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Components */}
          <div className="w-64 bg-gray-50 border-r overflow-y-auto">
            <ComponentPanel />
          </div>

          {/* Canvas */}
          <Canvas />

          {/* Right Sidebar - Properties */}
          <div className="w-80 bg-gray-50 border-l overflow-y-auto">
            <PropertiesPanel />
          </div>
        </div>
      </div>
      
      <DragOverlay>
        {activeId ? <div className="bg-blue-100 p-4 rounded">Dragging...</div> : null}
      </DragOverlay>
    </DndContext>
  );
}