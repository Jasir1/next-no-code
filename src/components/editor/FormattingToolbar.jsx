'use client';

import { 
  Bold, 
  Italic, 
  Underline, 
  Link2, 
  List, 
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Code,
  Undo2,
  Redo2,
  Type,
  Image as ImageIcon,
  Video,
  Table,
  Columns,
  Minus,
  Plus,
  X
} from 'lucide-react';

export function FormattingToolbar({ position, onClose }) {
  return (
    <div 
      className="fixed flex items-center gap-1 p-2 bg-white rounded-md shadow-lg z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: 'translateY(-100%)',
      }}
    >
      <button 
        onClick={() => document.execCommand('bold', false, null)}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Bold (Ctrl+B)"
      >
        <Bold size={16} />
      </button>
      <button 
        onClick={() => document.execCommand('italic', false, null)}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Italic (Ctrl+I)"
      >
        <Italic size={16} />
      </button>
      <button 
        onClick={() => document.execCommand('underline', false, null)}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Underline (Ctrl+U)"
      >
        <Underline size={16} />
      </button>
      
      <div className="h-5 w-px bg-gray-300 mx-1"></div>
      
      <button 
        onClick={() => document.execCommand('justifyLeft', false, null)}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Align Left"
      >
        <AlignLeft size={16} />
      </button>
      <button 
        onClick={() => document.execCommand('justifyCenter', false, null)}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Align Center"
      >
        <AlignCenter size={16} />
      </button>
      <button 
        onClick={() => document.execCommand('justifyRight', false, null)}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Align Right"
      >
        <AlignRight size={16} />
      </button>
      <button 
        onClick={() => document.execCommand('justifyFull', false, null)}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Justify"
      >
        <AlignJustify size={16} />
      </button>
      
      <div className="h-5 w-px bg-gray-300 mx-1"></div>
      
      <button 
        onClick={() => document.execCommand('insertUnorderedList', false, null)}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Bulleted List"
      >
        <List size={16} />
      </button>
      <button 
        onClick={() => document.execCommand('insertOrderedList', false, null)}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Numbered List"
      >
        <ListOrdered size={16} />
      </button>
      <button 
        onClick={() => {
          const url = prompt('Enter URL:');
          if (url) document.execCommand('createLink', false, url);
        }}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Insert Link (Ctrl+K)"
      >
        <Link2 size={16} />
      </button>
      
      <div className="h-5 w-px bg-gray-300 mx-1"></div>
      
      <button 
        onClick={() => document.execCommand('formatBlock', false, 'blockquote')}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Quote"
      >
        <Quote size={16} />
      </button>
      <button 
        onClick={() => document.execCommand('formatBlock', false, 'pre')}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Code"
      >
        <Code size={16} />
      </button>
      
      <div className="h-5 w-px bg-gray-300 mx-1"></div>
      
      <button 
        onClick={onClose}
        className="p-1.5 hover:bg-gray-100 rounded text-gray-500"
        title="Close"
      >
        <X size={16} />
      </button>
    </div>
  );
}
