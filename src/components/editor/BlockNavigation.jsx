'use client';

import { Search, X, ListTree, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';

const BlockIcon = ({ type }) => {
  const icons = {
    'heading': 'H',
    'paragraph': 'P',
    'image': 'Img',
    'button': 'Btn',
    'section': 'Sec',
    'columns': 'Col',
    'spacer': 'Spc',
    'divider': '---',
    'gallery': 'Gal',
    'quote': '“ ”',
    'video': '▶',
    'list': '•',
  };

  return (
    <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-xs font-mono">
      {icons[type] || 'Blk'}
    </div>
  );
};

export function BlockNavigation({ blocks, selectedBlockId, onSelect, onToggleVisibility }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState({});
  const containerRef = useRef(null);

  // Filter blocks based on search query
  const filteredBlocks = blocks.filter(block => 
    block.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (block.content && block.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Auto-expand parent blocks when a child is selected
  useEffect(() => {
    if (selectedBlockId) {
      const selectedBlock = blocks.find(b => b.id === selectedBlockId);
      if (selectedBlock?.parentId) {
        setExpandedItems(prev => ({
          ...prev,
          [selectedBlock.parentId]: true
        }));
      }
    }
  }, [selectedBlockId, blocks]);

  // Scroll selected block into view
  useEffect(() => {
    if (selectedBlockId && containerRef.current) {
      const selectedElement = containerRef.current.querySelector(`[data-block-id="${selectedBlockId}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [selectedBlockId]);

  const toggleExpand = (blockId) => {
    setExpandedItems(prev => ({
      ...prev,
      [blockId]: !prev[blockId]
    }));
  };

  const renderBlock = (block, level = 0) => {
    const hasChildren = blocks.some(b => b.parentId === block.id);
    const isExpanded = expandedItems[block.id] !== false; // Default to expanded
    const isSelected = block.id === selectedBlockId;
    
    return (
      <div key={block.id} className="space-y-1">
        <div 
          className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
          onClick={() => onSelect(block.id)}
          data-block-id={block.id}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
        >
          {hasChildren && (
            <button 
              className="text-gray-400 hover:text-gray-600 p-1 -ml-1"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(block.id);
              }}
            >
              <ChevronDown 
                size={16} 
                className={`transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`} 
              />
            </button>
          )}
          {!hasChildren && <div className="w-4" />}
          
          <BlockIcon type={block.type} />
          
          <span className="text-sm truncate flex-1">
            {block.content ? 
              (typeof block.content === 'string' ? block.content : `[${block.type}]`).substring(0, 30) + 
              ((typeof block.content === 'string' && block.content.length > 30) ? '...' : '') :
              `[${block.type}]`
            }
          </span>
          
          <button 
            className="text-gray-400 hover:text-gray-600 p-1"
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility(block.id, !block.isVisible);
            }}
            title={block.isVisible === false ? 'Show block' : 'Hide block'}
          >
            {block.isVisible === false ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="pl-4">
            {blocks
              .filter(b => b.parentId === block.id)
              .map(child => renderBlock(child, level + 1))
            }
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Find block..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery('')}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2" ref={containerRef}>
        {filteredBlocks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No blocks found</p>
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredBlocks
              .filter(block => !block.parentId)
              .map(block => renderBlock(block, 0))
            }
          </div>
        )}
      </div>
    </div>
  );
}
