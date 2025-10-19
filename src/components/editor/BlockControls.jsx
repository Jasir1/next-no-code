'use client';

import { 
  Move, 
  Copy, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  GripVertical,
  MoreHorizontal,
  Save,
  PlusCircle,
  MinusCircle,
  Code as CodeIcon,
  Type as TypeIcon,
  Image as ImageIcon,
  Video as VideoIcon,
  Table as TableIcon,
  Columns as ColumnsIcon,
  PanelLeft as PanelLeftIcon,
  PanelRight as PanelRightIcon
} from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function BlockControls({ 
  blockId, 
  onMoveUp, 
  onMoveDown, 
  onDuplicate, 
  onDelete,
  onConvertTo,
  isFirst,
  isLast,
  blockType
}) {
  const blockIcons = {
    'text': <TypeIcon size={16} />,
    'heading': <TypeIcon size={16} className="font-bold" />,
    'image': <ImageIcon size={16} />,
    'video': <VideoIcon size={16} />,
    'columns': <ColumnsIcon size={16} />,
    'section': <PanelLeftIcon size={16} />,
    'button': <Button size="sm" variant="outline" className="h-6 px-2">Button</Button>
  };

  return (
    <div className="absolute -left-12 top-0 flex flex-col items-center gap-1 p-1 bg-white rounded-md shadow-md border border-gray-200 z-10">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 text-gray-500 hover:bg-gray-100"
        onClick={() => onMoveUp(blockId)}
        disabled={isFirst}
      >
        <ArrowUp size={14} />
      </Button>
      
      <div className="flex items-center gap-0.5">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 text-gray-500 hover:bg-gray-100 p-0.5"
          onClick={(e) => {
            e.stopPropagation();
            // Handle block selection
          }}
        >
          {blockIcons[blockType] || <TypeIcon size={14} />}
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-gray-500 hover:bg-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal size={14} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-1" align="start">
            <div className="flex flex-col">
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start gap-2"
                onClick={() => onDuplicate(blockId)}
              >
                <Copy size={14} />
                <span>Duplicate</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start gap-2"
                onClick={() => onDelete(blockId)}
              >
                <Trash2 size={14} className="text-red-500" />
                <span className="text-red-500">Delete</span>
              </Button>
              <div className="h-px bg-gray-200 my-1"></div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start gap-2"
                onClick={() => onConvertTo(blockId, 'text')}
              >
                <TypeIcon size={14} />
                <span>Convert to Text</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start gap-2"
                onClick={() => onConvertTo(blockId, 'heading')}
              >
                <TypeIcon size={14} className="font-bold" />
                <span>Convert to Heading</span>
              </Button>
              <div className="h-px bg-gray-200 my-1"></div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start gap-2"
                onClick={() => onConvertTo(blockId, 'columns')}
              >
                <ColumnsIcon size={14} />
                <span>Convert to Columns</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 text-gray-500 hover:bg-gray-100"
        onClick={() => onMoveDown(blockId)}
        disabled={isLast}
      >
        <ArrowDown size={14} />
      </Button>
      
      <div className="h-4 w-4 flex items-center justify-center cursor-move" draggable>
        <GripVertical size={14} className="text-gray-400" />
      </div>
    </div>
  );
}
