'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, Smartphone, Monitor, Tablet, 
  Move, X, Plus, Minus, RotateCw, 
  Type, Image, Grid, MessageCircle,
  ArrowRight, Download, Rocket,
  Code
} from 'lucide-react';

const BuilderInterface = () => {
  const [activeTab, setActiveTab] = useState('preview');
  const [deviceView, setDeviceView] = useState('desktop');
  const [isDragging, setIsDragging] = useState(false);
  const [droppedItems, setDroppedItems] = useState([
    { id: 1, type: 'header', name: 'Header' },
    { id: 2, type: 'hero', name: 'Hero Section' },
  ]);

  const availableComponents = [
    { id: 1, type: 'features', name: 'Features', icon: <Grid size={16} /> },
    { id: 2, type: 'testimonials', name: 'Testimonials', icon: <Type size={16} /> },
    { id: 3, type: 'gallery', name: 'Image Gallery', icon: <Image size={16} /> },
    { id: 4, type: 'contact', name: 'Contact Form', icon: <MessageCircle size={16} /> },
  ];

  const handleDragStart = (e, component) => {
    e.dataTransfer.setData('component', JSON.stringify(component));
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const component = JSON.parse(e.dataTransfer.getData('component'));
    setDroppedItems(prev => [...prev, { ...component, id: Date.now() }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeComponent = (id) => {
    setDroppedItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      {/* Builder Toolbar */}
      <div className="bg-gray-900 text-white p-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <button 
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'preview' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('preview')}
          >
            <Monitor size={16} />
            <span>Preview</span>
          </button>
          <button 
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'code' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('code')}
          >
            <Code size={16} />
            <span>Code</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-800 rounded-lg p-1">
            {['mobile', 'tablet', 'desktop'].map((device) => (
              <button
                key={device}
                onClick={() => setDeviceView(device)}
                className={`p-2 rounded-md ${deviceView === device ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                title={device.charAt(0).toUpperCase() + device.slice(1)}
              >
                {device === 'mobile' ? <Smartphone size={16} /> : 
                 device === 'tablet' ? <Tablet size={16} /> : 
                 <Monitor size={16} />}
              </button>
            ))}
          </div>
          
          <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
            <Download size={16} />
          </button>
          <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1">
            <Rocket size={16} />
            <span className="hidden sm:inline">Publish</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-[600px] overflow-hidden">
        {/* Components Panel */}
        <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Components</h3>
          <div className="space-y-2">
            {availableComponents.map((component) => (
              <motion.div
                key={component.id}
                className="bg-white p-3 rounded-lg border border-gray-200 cursor-move flex items-center gap-2 text-sm font-medium text-gray-700 hover:shadow-md hover:border-blue-300 transition-all"
                draggable
                onDragStart={(e) => handleDragStart(e, component)}
                onDragEnd={handleDragEnd}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {component.icon}
                {component.name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Preview Area */}
        <div 
          className="flex-1 bg-white p-6 overflow-auto relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            backgroundImage: 'linear-gradient(45deg, #f9fafb 25%, #ffffff 25%, #ffffff 50%, #f9fafb 50%, #f9fafb 75%, #ffffff 75%, #ffffff 100%)',
            backgroundSize: '20px 20px'
          }}
        >
          <div 
            className={`mx-auto transition-all duration-300 ${
              deviceView === 'mobile' ? 'max-w-xs' : 
              deviceView === 'tablet' ? 'max-w-2xl' : 'max-w-5xl'
            }`}
          >
            <AnimatePresence>
              {droppedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="group relative mb-4 border-2 border-dashed border-transparent hover:border-blue-200 rounded-lg p-4 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, margin: 0, padding: 0, border: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => removeComponent(item.id)}
                      className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Move size={14} className="text-gray-300" />
                    <span className="text-xs font-medium">{item.name}</span>
                  </div>
                  <div className="h-16 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    {item.name} Content Area
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {droppedItems.length === 0 && (
              <motion.div 
                className="flex flex-col items-center justify-center h-64 text-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Move size={32} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">Drag components here</h3>
                <p className="text-gray-500 text-sm max-w-xs">Start building your page by dragging components from the left panel</p>
              </motion.div>
            )}
          </div>

          {/* Drop indicator */}
          {isDragging && (
            <motion.div 
              className="absolute inset-0 border-2 border-dashed border-blue-400 bg-blue-50/30 pointer-events-none flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Plus size={18} />
                <span>Drop to add component</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Properties Panel */}
        <div className="w-full md:w-80 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Properties</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
              <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option>Full Width</option>
                <option>Boxed</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
              <div className="grid grid-cols-5 gap-2">
                {['#ffffff', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af'].map((color) => (
                  <button 
                    key={color}
                    className="w-8 h-8 rounded-md border-2 border-gray-200 hover:border-blue-400"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
              <div className="flex items-center gap-2">
                <button className="p-1 bg-gray-200 rounded hover:bg-gray-300">
                  <Minus size={16} />
                </button>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-1/2 bg-blue-500 rounded-full"></div>
                </div>
                <button className="p-1 bg-gray-200 rounded hover:bg-gray-300">
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Animations</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <button className="w-full py-2 px-4 bg-blue-50 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-100 flex items-center justify-center gap-2">
                <RotateCw size={14} />
                <span>Preview Animations</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderInterface;