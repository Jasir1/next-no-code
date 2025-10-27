# Step-by-Step Guide: Building a No-Code Website Builder

## Overview

This guide walks you through building a professional no-code website builder using Next.js, React, and modern web technologies. The builder features drag-and-drop functionality, visual editing, component library, and responsive design capabilities.

## Prerequisites

- Node.js 18+
- Basic knowledge of React and JavaScript
- Understanding of modern web development concepts

## Step 1: Project Setup

### 1.1 Create Next.js Project

```bash
npx create-next-app@latest website-builder
# Choose:
# ❌ TypeScript: No
# ✅ Tailwind CSS: Yes
# ✅ App Router: Yes
# ❌ src directory: No
cd website-builder
```

### 1.2 Install Dependencies

```bash
npm install zustand @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities react-colorful framer-motion lucide-react axios uuid lodash html2canvas
```

### 1.3 Install Dev Dependencies

```bash
npm install -D @eslint/eslintrc eslint-config-next
```

### 1.4 Project Structure

Create the following folder structure:

```
src/
├── app/
│   ├── dashboard/
│   │   ├── editor/[projectId]/
│   │   │   └── page.js
│   │   └── page.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── builder/
│   ├── common/
│   ├── dashboard/
│   ├── editor/
│   ├── elements/
│   ├── properties/
│   └── ui/
├── lib/
│   ├── store/
│   ├── utils/
│   └── api/
└── public/
```

## Step 2: Core Architecture

### 2.1 Component Registry System

Create `src/lib/utils/componentRegistry.js`:

```javascript
export const componentTypes = {
  TEXT: 'text',
  HEADING: 'heading',
  IMAGE: 'image',
  BUTTON: 'button',
  CONTAINER: 'container',
  // Add more component types
};

export const defaultComponents = [
  {
    type: componentTypes.HEADING,
    label: 'Heading',
    icon: 'Type',
    defaultProps: {
      content: 'Heading Text',
      tag: 'h2',
      styles: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#000000',
      }
    }
  },
  // Add more default components
];
```

### 2.2 State Management with Zustand

Create `src/lib/store/editorStore.js`:

```javascript
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const useEditorStore = create((set, get) => ({
  components: [],
  selectedComponent: null,
  history: [],
  historyIndex: -1,
  currentBreakpoint: 'desktop',

  addComponent: (component) => {
    const newComponent = {
      id: uuidv4(),
      ...component,
      styles: component.styles || {},
      children: []
    };

    set((state) => ({
      components: [...state.components, newComponent],
      selectedComponent: newComponent.id,
    }));

    get().saveHistory();
  },

  updateComponent: (id, updates) => {
    set((state) => ({
      components: state.components.map((comp) =>
        comp.id === id ? { ...comp, ...updates } : comp
      ),
    }));
    get().saveHistory();
  },

  selectComponent: (id) => {
    set({ selectedComponent: id });
  },

  saveHistory: () => {
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(state.components);
      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex > 0) {
        return {
          historyIndex: state.historyIndex - 1,
          components: state.history[state.historyIndex - 1],
        };
      }
      return state;
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        return {
          historyIndex: state.historyIndex + 1,
          components: state.history[state.historyIndex + 1],
        };
      }
      return state;
    });
  },
}));
```

## Step 3: Core Components

### 3.1 Canvas Component

Create `src/components/builder/Canvas.js`:

```javascript
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
```

### 3.2 Component Panel

Create `src/components/builder/ComponentPanel.js`:

```javascript
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
```

### 3.3 Render Component

Create `src/components/builder/RenderComponent.js`:

```javascript
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
          <Image
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
```

### 3.4 Properties Panel

Create `src/components/builder/PropertiesPanel.js`:

```javascript
'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export default function PropertiesPanel() {
  const { components, selectedComponent, updateComponent } = useEditorStore();

  const component = components.find((c) => c.id === selectedComponent);

  if (!component) {
    return (
      <div className="p-4 text-gray-500">
        Select a component to edit properties
      </div>
    );
  }

  const handleStyleChange = (property, value) => {
    updateComponent(component.id, {
      styles: {
        ...component.styles,
        [property]: value,
      },
    });
  };

  const handleContentChange = (value) => {
    updateComponent(component.id, { content: value });
  };

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-lg font-semibold">Properties</h3>

      {/* Content Editor */}
      {(component.content !== undefined) && (
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={component.content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows="3"
          />
        </div>
      )}

      {/* Typography */}
      <div>
        <h4 className="font-medium mb-3">Typography</h4>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Font Size</label>
            <input
              type="text"
              value={component.styles.fontSize || ''}
              onChange={(e) => handleStyleChange('fontSize', e.target.value)}
              placeholder="16px"
              className="w-full p-2 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Text Color</label>
            <ColorInput
              value={component.styles.color || '#000000'}
              onChange={(color) => handleStyleChange('color', color)}
            />
          </div>
        </div>
      </div>

      {/* Background */}
      <div>
        <h4 className="font-medium mb-3">Background</h4>
        <ColorInput
          value={component.styles.backgroundColor || '#ffffff'}
          onChange={(color) => handleStyleChange('backgroundColor', color)}
        />
      </div>
    </div>
  );
}

function ColorInput({ value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div
          onClick={() => setShowPicker(!showPicker)}
          className="w-10 h-10 rounded border-2 border-gray-300 cursor-pointer"
          style={{ backgroundColor: value }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 p-2 border rounded text-sm"
        />
      </div>
      {showPicker && (
        <div className="absolute top-12 left-0 z-50 p-3 bg-white rounded-lg shadow-xl">
          <HexColorPicker color={value} onChange={onChange} />
          <button
            onClick={() => setShowPicker(false)}
            className="mt-2 w-full px-3 py-1 bg-gray-200 rounded text-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
```

## Step 4: Main Editor Page

### 4.1 Create Editor Page

Create `src/app/dashboard/editor/[projectId]/page.js`:

```javascript
'use client';

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState, useEffect } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';
import Canvas from '@/components/builder/Canvas';
import ComponentPanel from '@/components/builder/ComponentPanel';
import PropertiesPanel from '@/components/builder/PropertiesPanel';

export default function EditorPage({ params }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const { addComponent, components } = useEditorStore();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id === 'canvas' && active.data.current) {
      addComponent(active.data.current);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Website Builder</h1>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Export
          </button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {/* Component Panel */}
          <div className="w-64 bg-white border-r border-gray-200">
            <ComponentPanel />
          </div>

          {/* Canvas */}
          <Canvas />

          {/* Properties Panel */}
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <PropertiesPanel />
          </div>
        </DndContext>
      </div>
    </div>
  );
}
```

## Step 5: Advanced Features

### 5.1 Add Responsive Breakpoints

Update the editor store to include breakpoint management:

```javascript
// In editorStore.js
currentBreakpoint: 'desktop', // desktop, tablet, mobile

setBreakpoint: (breakpoint) => {
  set({ currentBreakpoint: breakpoint });
},
```

Add breakpoint controls to the editor:

```javascript
// In the editor page
const { currentBreakpoint, setBreakpoint } = useEditorStore();

const breakpoints = [
  { key: 'desktop', label: 'Desktop', icon: Monitor },
  { key: 'tablet', label: 'Tablet', icon: Tablet },
  { key: 'mobile', label: 'Mobile', icon: Smartphone },
];

// Add breakpoint buttons to the header
<div className="flex items-center gap-2">
  {breakpoints.map((bp) => (
    <button
      key={bp.key}
      onClick={() => setBreakpoint(bp.key)}
      className={`p-2 rounded ${currentBreakpoint === bp.key ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
    >
      <bp.icon size={16} />
    </button>
  ))}
</div>
```

### 5.2 Add Undo/Redo Functionality

```javascript
// In the editor page
const { undo, redo } = useEditorStore();

// Add undo/redo buttons to header
<div className="flex items-center gap-2">
  <button onClick={undo} className="p-2 text-gray-600 hover:text-gray-800">
    <Undo2 size={16} />
  </button>
  <button onClick={redo} className="p-2 text-gray-600 hover:text-gray-800">
    <Redo2 size={16} />
  </button>
</div>
```

## Step 6: Export Functionality

### 6.1 Create Export Utility

Create `src/lib/utils/exportUtils.js`:

```javascript
export function exportToHTML(components) {
  const generateHTML = (component) => {
    const styles = Object.entries(component.styles || {})
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}:${value}`)
      .join(';');

    switch (component.type) {
      case 'heading':
        const Tag = component.tag || 'h2';
        return `<${Tag} style="${styles}">${component.content}</${Tag}>`;

      case 'text':
        return `<p style="${styles}">${component.content}</p>`;

      case 'button':
        return `<button style="${styles}">${component.content}</button>`;

      case 'image':
        return `<Image src="${component.src}" alt="${component.alt}" style="${styles}" />`;

      case 'container':
        const childrenHTML = component.children?.map(generateHTML).join('') || '';
        return `<div style="${styles}">${childrenHTML}</div>`;

      default:
        return '';
    }
  };

  const htmlContent = components.map(generateHTML).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Website</title>
</head>
<body>
  ${htmlContent}
</body>
</html>
  `.trim();
}
```

### 6.2 Add Export Button

```javascript
// In the editor page
import { exportToHTML } from '@/lib/utils/exportUtils';

const handleExport = () => {
  const html = exportToHTML(components);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'website.html';
  a.click();
  URL.revokeObjectURL(url);
};
```

## Step 7: Project Management

### 7.1 Add Local Storage Persistence

Update the editor store to save/load projects:

```javascript
// In editorStore.js
loadProject: (projectId) => {
  const saved = localStorage.getItem(`project-${projectId}`);
  if (saved) {
    const project = JSON.parse(saved);
    set({
      components: project.components || [],
      selectedComponent: null,
    });
  }
},

saveProject: (projectId) => {
  const state = get();
  localStorage.setItem(`project-${projectId}`, JSON.stringify({
    components: state.components,
    lastModified: new Date().toISOString(),
  }));
},
```

### 7.2 Auto-save Functionality

```javascript
// In the editor page
useEffect(() => {
  const autoSave = setInterval(() => {
    saveProject(params.projectId);
  }, 30000); // Auto-save every 30 seconds

  return () => clearInterval(autoSave);
}, [components]);
```

## Step 8: Testing and Optimization

### 8.1 Run the Application

```bash
npm run dev
```

Navigate to `http://localhost:3000/dashboard/editor/test-project`

### 8.2 Test Core Features

1. **Drag and Drop**: Drag components from the left panel to the canvas
2. **Component Selection**: Click on components to select them
3. **Property Editing**: Modify properties in the right panel
4. **Responsive Design**: Switch between desktop, tablet, and mobile views
5. **Undo/Redo**: Test the history functionality
6. **Export**: Export your creation as HTML

### 8.3 Performance Optimization

1. **Component Memoization**: Use React.memo for expensive components
2. **Lazy Loading**: Implement code splitting for large components
3. **State Optimization**: Use Zustand's selector pattern to prevent unnecessary re-renders

## Step 9: Deployment

### 9.1 Build for Production

```bash
npm run build
npm start
```

### 9.2 Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## Step 10: Next Steps and Enhancements

### 10.1 Advanced Features to Add

1. **Template Library**: Pre-built page templates
2. **Collaborative Editing**: Real-time collaboration with WebSockets
3. **Custom Components**: Allow users to create custom components
4. **Theme System**: Multiple themes and color schemes
5. **Asset Management**: Image upload and media library
6. **SEO Optimization**: Meta tags and SEO settings
7. **Analytics Integration**: Built-in analytics dashboard

### 10.2 Backend Integration

1. **User Authentication**: Implement user accounts
2. **Project Storage**: Save projects to a database
3. **Template Marketplace**: Share and sell templates
4. **Deployment**: One-click deployment to hosting platforms

### 10.3 Business Considerations

1. **Monetization**: Subscription plans, premium templates
2. **Scalability**: Handle multiple users and projects
3. **Security**: Secure user data and prevent abuse
4. **Legal**: Terms of service, privacy policy

## Conclusion

You've now built a fully functional no-code website builder with:

- ✅ Drag-and-drop interface
- ✅ Component library
- ✅ Visual property editor
- ✅ Responsive design
- ✅ Undo/redo functionality
- ✅ Export capabilities
- ✅ Project persistence

This foundation can be extended with advanced features to create a professional SaaS product. The modular architecture makes it easy to add new components and features as your platform grows.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [@dnd-kit Documentation](https://dndkit.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

Happy building! 🚀