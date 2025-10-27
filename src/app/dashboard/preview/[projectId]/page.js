'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Smartphone, Tablet, Monitor } from 'lucide-react';
import Link from 'next/link';

export default function PreviewPage() {
  const params = useParams();
  const [viewport, setViewport] = useState('desktop');
  const [components, setComponents] = useState([]);

  useEffect(() => {
    // Load project data from localStorage or API
    const savedData = localStorage.getItem(`project-${params.projectId}`);
    if (savedData) {
      const projectData = JSON.parse(savedData);
      setComponents(projectData.components || []);
    }
  }, [params.projectId]);

  const viewportSizes = {
    mobile: 'w-[375px]',
    tablet: 'w-[768px]',
    desktop: 'w-full',
  };

  const renderComponent = (component) => {
    const style = component.styles || {};

    switch (component.type) {
      case 'heading':
        const HeadingTag = component.tag || 'h2';
        return (
          <HeadingTag key={component.id} style={style}>
            {component.content}
          </HeadingTag>
        );

      case 'text':
        return (
          <p key={component.id} style={style}>
            {component.content}
          </p>
        );

      case 'button':
        return (
          <button key={component.id} style={style} type="button">
            {component.content}
          </button>
        );

      case 'image':
        return (
          <div key={component.id} style={style} className="relative">
            <Image
              src={component.src}
              alt={component.alt}
              fill
              className="object-cover"
            />
          </div>
        );

      case 'container':
        return (
          <div key={component.id} style={style}>
            {component.children?.map((child) => renderComponent(child))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/editor/${params.projectId}`}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
          >
            <X className="w-5 h-5 text-white" />
          </Link>
          <span className="text-white font-semibold">Preview Mode</span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setViewport('mobile')}
            className={`p-2 rounded ${
              viewport === 'mobile'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-2 rounded ${
              viewport === 'tablet'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Tablet className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewport('desktop')}
            className={`p-2 rounded ${
              viewport === 'desktop'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Monitor className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex items-start justify-center p-8 min-h-[calc(100vh-64px)] overflow-auto">
        <div
          className={`bg-white shadow-2xl transition-all duration-300 ${viewportSizes[viewport]}`}
        >
          {components.length === 0 ? (
            <div className="flex items-center justify-center h-96 text-gray-400">
              <p>No content to preview</p>
            </div>
          ) : (
            <div>{components.map((component) => renderComponent(component))}</div>
          )}
        </div>
      </div>
    </div>
  );
}