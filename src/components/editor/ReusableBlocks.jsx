// components/editor/ReusableBlocks.jsx
'use client';

import { useState } from 'react';
import { Plus, Trash2, Copy, GripVertical, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ReusableBlocks({ blocks = [], onInsert, onSave }) {
  const [isCreating, setIsCreating] = useState(false);
  const [blockName, setBlockName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlocks = blocks.filter(block => 
    block.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveBlock = () => {
    if (blockName.trim() && onSave) {
      onSave({
        type: 'reusable',
        name: blockName,
        content: {
          type: 'section',
          props: { className: 'py-8' },
          children: [
            {
              type: 'heading',
              props: {
                level: 2,
                content: blockName,
                className: 'text-2xl font-bold mb-4',
              },
            },
            {
              type: 'paragraph',
              props: {
                content: 'This is a reusable block. Edit its content as needed.',
                className: 'text-gray-600',
              },
            },
          ],
        },
      });
      setBlockName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search reusable blocks..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {!isCreating ? (
          <Button
            variant="outline"
            className="w-full mb-4"
            onClick={() => setIsCreating(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Reusable Block
          </Button>
        ) : (
          <div className="mb-4 p-4 border rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2">Create Reusable Block</h4>
            <div className="space-y-3">
              <Input
                placeholder="Block name"
                value={blockName}
                onChange={(e) => setBlockName(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSaveBlock}
                  disabled={!blockName.trim()}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}

        {filteredBlocks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No reusable blocks found.</p>
            <p className="text-sm">Create your first reusable block to get started.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredBlocks.map((block) => (
              <div
                key={block.id}
                className="group flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{block.name}</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onInsert(block)}
                    title="Insert"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}