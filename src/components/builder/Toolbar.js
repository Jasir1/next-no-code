'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { Undo2, Redo2, Smartphone, Tablet, Monitor, Eye, Save, Download } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Toolbar() {
  const params = useParams();
  const { undo, redo, currentBreakpoint, setBreakpoint, components } = useEditorStore();

  const handleSave = () => {
    // Save to localStorage (temporary - will be API call)
    localStorage.setItem(
      `project-${params.projectId}`,
      JSON.stringify({ components })
    );
    alert('Project saved successfully!');
  };

  const handleExport = () => {
    const html = generateHTML(components);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website.html';
    a.click();
  };

  const generateHTML = (components) => {
    const componentToHTML = (comp) => {
      const styleString = Object.entries(comp.styles || {})
        .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
        .join('; ');

      switch (comp.type) {
        case 'heading':
          const tag = comp.tag || 'h2';
          return `<${tag} style="${styleString}">${comp.content}</${tag}>`;
        case 'text':
          return `<p style="${styleString}">${comp.content}</p>`;
        case 'button':
          return `<button style="${styleString}">${comp.content}</button>`;
        case 'image':
          return `<img src="${comp.src}" alt="${comp.alt}" style="${styleString}" />`;
        case 'container':
          const children = comp.children?.map(componentToHTML).join('') || '';
          return `<div style="${styleString}">${children}</div>`;
        default:
          return '';
      }
    };

    const body = components.map(componentToHTML).join('\n');
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
</head>
<body>
${body}
</body>
</html>`;
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-4 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold text-gray-900">WebBuilder</h1>
        
        <div className="flex items-center gap-2 border-l pl-4">
          <button
            onClick={undo}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Undo"
          >
            <Undo2 className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={redo}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Redo"
          >
            <Redo2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Center Section - Viewport Switcher */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setBreakpoint('desktop')}
          className={`p-2 rounded-lg transition ${
            currentBreakpoint === 'desktop'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title="Desktop"
        >
          <Monitor className="w-5 h-5" />
        </button>
        <button
          onClick={() => setBreakpoint('tablet')}
          className={`p-2 rounded-lg transition ${
            currentBreakpoint === 'tablet'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title="Tablet"
        >
          <Tablet className="w-5 h-5" />
        </button>
        <button
          onClick={() => setBreakpoint('mobile')}
          className={`p-2 rounded-lg transition ${
            currentBreakpoint === 'mobile'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title="Mobile"
        >
          <Smartphone className="w-5 h-5" />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
        
        <Link
          href={`/preview/${params.projectId}`}
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <Eye className="w-4 h-4" />
          Preview
        </Link>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>
    </div>
  );
}