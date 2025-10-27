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
import { Button } from '@/components/ui/button';
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
    'button': <span className="text-xs px-1 py-0.5 bg-blue-100 text-blue-800 rounded">Btn</span>
  };

  return (
    <div className="absolute -left-12 top-0 flex flex-col items-center gap-1 p-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        onClick={() => onMoveUp(blockId)}
        disabled={isFirst}
      >
        <ArrowUp size={14} />
      </Button>

      <div className="flex items-center gap-0.5 bg-gray-50 rounded px-1 py-0.5">
        <div className="flex items-center justify-center w-6 h-6 text-gray-600">
          {blockIcons[blockType] || <TypeIcon size={14} />}
        </div>

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
          <PopoverContent className="w-48 p-1" align="start" side="right">
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-2 h-8 px-2"
                onClick={() => onDuplicate(blockId)}
              >
                <Copy size={14} />
                <span>Duplicate</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-2 h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => onDelete(blockId)}
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </Button>
              <div className="h-px bg-gray-200 my-1"></div>
              <div className="text-xs font-medium text-gray-500 px-2 py-1">Convert to</div>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-2 h-8 px-2"
                onClick={() => onConvertTo(blockId, 'text')}
              >
                <TypeIcon size={14} />
                <span>Text</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-2 h-8 px-2"
                onClick={() => onConvertTo(blockId, 'heading')}
              >
                <TypeIcon size={14} className="font-bold" />
                <span>Heading</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-2 h-8 px-2"
                onClick={() => onConvertTo(blockId, 'image')}
              >
                <ImageIcon size={14} />
                <span>Image</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-2 h-8 px-2"
                onClick={() => onConvertTo(blockId, 'columns')}
              >
                <ColumnsIcon size={14} />
                <span>Columns</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        onClick={() => onMoveDown(blockId)}
        disabled={isLast}
      >
        <ArrowDown size={14} />
      </Button>

      <div className="h-6 w-6 flex items-center justify-center cursor-move text-gray-400 hover:text-gray-600 transition-colors">
        <GripVertical size={14} />
      </div>
    </div>
  );
}
