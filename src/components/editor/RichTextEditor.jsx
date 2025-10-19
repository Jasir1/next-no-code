"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  Bold, Italic, Underline, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, Link2, Image as ImageIcon,
  ChevronDown, Check, Type, Heading1, Heading2, Heading3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import MediaUpload from './MediaUpload';
import { cn } from '@/lib/utils';

const HEADING_OPTIONS = [
  { value: 'p', label: 'Paragraph', icon: <Type size={16} /> },
  { value: 'h1', label: 'Heading 1', icon: <Heading1 size={16} /> },
  { value: 'h2', label: 'Heading 2', icon: <Heading2 size={16} /> },
  { value: 'h3', label: 'Heading 3', icon: <Heading3 size={16} /> },
];

const RichTextEditor = ({ 
  value = '', 
  onChange, 
  placeholder = 'Start typing...',
  className = ''
}) => {
  const editorRef = useRef(null);
  const [isMediaUploadOpen, setIsMediaUploadOpen] = useState(false);
  const [currentBlockType, setCurrentBlockType] = useState('p');
  const [textAlign, setTextAlign] = useState('left');

  // Initialize editor with content
  useEffect(() => {
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  const handleInput = (e) => {
    if (onChange) {
      onChange(e.currentTarget.innerHTML);
    }
    updateBlockType();
  };

  const updateBlockType = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const node = selection.anchorNode?.parentNode;
    if (!node) return;
    
    const blockType = node.nodeName.toLowerCase();
    if (['h1', 'h2', 'h3', 'p'].includes(blockType)) {
      setCurrentBlockType(blockType);
    } else {
      setCurrentBlockType('p');
    }
  };

  const formatText = (format, value = null) => {
    document.execCommand(format, false, value);
    editorRef.current.focus();
  };

  const toggleBlockType = (blockType) => {
    document.execCommand('formatBlock', false, `<${blockType}>`);
    editorRef.current.focus();
    setCurrentBlockType(blockType);
  };

  const toggleTextAlign = (align) => {
    document.execCommand('justify' + align.charAt(0).toUpperCase() + align.slice(1));
    setTextAlign(align);
    editorRef.current.focus();
  };

  const handleImageUpload = (file) => {
    const img = document.createElement('img');
    img.src = file.url || URL.createObjectURL(file);
    img.alt = file.name;
    img.style.maxWidth = '100%';
    
    const range = window.getSelection().getRangeAt(0);
    range.deleteContents();
    range.insertNode(img);
    
    setIsMediaUploadOpen(false);
    editorRef.current.focus();
  };

  const ToolbarButton = ({ onClick, isActive = false, icon, title, className = '' }) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn('h-8 w-8 p-0 hover:bg-muted', isActive && 'bg-muted', className)}
      onClick={onClick}
      title={title}
    >
      {icon}
    </Button>
  );

  return (
    <div className={cn('border rounded-md', className)}>
      <div className="border-b p-1 flex flex-wrap items-center gap-1 bg-muted/50">
        {/* Block type selector */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-sm">
              {HEADING_OPTIONS.find(opt => opt.value === currentBlockType)?.icon || <Type size={16} />}
              <ChevronDown size={14} className="ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0" align="start">
            <div className="p-1">
              {HEADING_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-2',
                    currentBlockType === option.value && 'bg-muted'
                  )}
                  onClick={() => toggleBlockType(option.value)}
                >
                  {option.icon}
                  <span>{option.label}</span>
                  {currentBlockType === option.value && (
                    <Check className="ml-auto h-4 w-4 text-primary" />
                  )}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="h-5 w-px bg-border mx-1" />

        {/* Text formatting */}
        <ToolbarButton
          onClick={() => formatText('bold')}
          isActive={document.queryCommandState('bold')}
          icon={<Bold size={16} />}
          title="Bold (Ctrl+B)"
        />
        <ToolbarButton
          onClick={() => formatText('italic')}
          isActive={document.queryCommandState('italic')}
          icon={<Italic size={16} />}
          title="Italic (Ctrl+I)"
        />
        <ToolbarButton
          onClick={() => formatText('underline')}
          isActive={document.queryCommandState('underline')}
          icon={<Underline size={16} />}
          title="Underline (Ctrl+U)"
        />

        <div className="h-5 w-px bg-border mx-1" />

        {/* Text alignment */}
        <ToolbarButton
          onClick={() => toggleTextAlign('left')}
          isActive={textAlign === 'left'}
          icon={<AlignLeft size={16} />}
          title="Align left"
        />
        <ToolbarButton
          onClick={() => toggleTextAlign('center')}
          isActive={textAlign === 'center'}
          icon={<AlignCenter size={16} />}
          title="Align center"
        />
        <ToolbarButton
          onClick={() => toggleTextAlign('right')}
          isActive={textAlign === 'right'}
          icon={<AlignRight size={16} />}
          title="Align right"
        />

        <div className="h-5 w-px bg-border mx-1" />

        {/* Lists */}
        <ToolbarButton
          onClick={() => formatText('insertUnorderedList')}
          icon={<List size={16} />}
          title="Bullet List"
        />
        <ToolbarButton
          onClick={() => formatText('insertOrderedList')}
          icon={<ListOrdered size={16} />}
          title="Numbered List"
        />

        <div className="h-5 w-px bg-border mx-1" />

        {/* Media */}
        <Popover open={isMediaUploadOpen} onOpenChange={setIsMediaUploadOpen}>
          <PopoverTrigger asChild>
            <ToolbarButton
              icon={<ImageIcon size={16} />}
              title="Insert Image"
            />
          </PopoverTrigger>
          <PopoverContent className="w-96 p-4" align="start">
            <MediaUpload 
              accept="image/*" 
              onUploadComplete={handleImageUpload} 
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        className="min-h-[200px] p-4 focus:outline-none"
        contentEditable
        onInput={handleInput}
        placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
    </div>
  );
};

export default RichTextEditor;
