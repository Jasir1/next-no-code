// app/editor/[projectId]/page.js
'use client';

import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';
import Canvas from '@/components/builder/Canvas';
import ComponentPanel from '@/components/builder/ComponentPanel';
import PropertiesPanel from '@/components/builder/PropertiesPanel';
import Toolbar from '@/components/builder/Toolbar';
import { Undo2, Redo2, Eye, Save, ArrowLeft, Smartphone, Tablet, Monitor, Download } from 'lucide-react';
import Link from 'next/link';

export default function EditorPage({ params }) {
  const { projectId } = params;
  const { addComponent, undo, redo } = useEditorStore();
  const [activeId, setActiveId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [device, setDevice] = useState('desktop'); // 'mobile', 'tablet', 'desktop'

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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Replace with actual API call
      // await saveProject(projectId, { components, history });
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    // This is a placeholder. In a real app, you would generate and download the project files
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify({ components, history }, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `project-${projectId}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-md">
              <button
                onClick={() => setDevice('mobile')}
                className={`p-2 rounded ${device === 'mobile' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                title="Mobile"
              >
                <Smartphone className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`p-2 rounded ${device === 'tablet' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                title="Tablet"
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDevice('desktop')}
                className={`p-2 rounded ${device === 'desktop' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                title="Desktop"
              >
                <Monitor className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              title="Download Project"
            >
              <Download className="h-4 w-4 mr-1" />
            </button>
            <Link
              href={`/dashboard/preview/${projectId}`}
              target="_blank"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Link>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Components */}
          <div className="w-64 bg-gray-50 border-r overflow-y-auto">
            <ComponentPanel />
          </div>

          {/* Canvas */}
          <div className={`flex-1 overflow-auto transition-all duration-200 ${
            device === 'mobile' ? 'max-w-md mx-auto border-x-8 border-gray-800 rounded-lg h-[90%] my-4' :
            device === 'tablet' ? 'max-w-3xl mx-auto border-x-8 border-gray-800 rounded-lg h-[90%] my-4' :
            'w-full h-full'}`}>
            <Canvas />
          </div>

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