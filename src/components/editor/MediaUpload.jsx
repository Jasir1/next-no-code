"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Video, FileText, File, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const MediaUpload = ({ onUploadComplete, accept = 'image/*', multiple = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = async (files) => {
    const validFiles = Array.from(files).filter(file => {
      if (accept === 'image/*') {
        return file.type.startsWith('image/');
      } else if (accept === 'video/*') {
        return file.type.startsWith('video/');
      }
      return true;
    });

    if (validFiles.length === 0) {
      toast.error('Invalid file type. Please select a valid file.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const totalSize = validFiles.reduce((acc, file) => acc + file.size, 0);
      let uploadedSize = 0;
      
      const uploadPromises = validFiles.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            // Simulate upload progress
            const interval = setInterval(() => {
              uploadedSize += file.size / 10;
              const progress = Math.min(100, (uploadedSize / totalSize) * 100);
              setUploadProgress(progress);
              
              if (progress >= 100) {
                clearInterval(interval);
                resolve({
                  id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  name: file.name,
                  type: file.type,
                  size: file.size,
                  url: e.target.result,
                  width: 0,
                  height: 0,
                });
              }
            }, 100);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      onUploadComplete(multiple ? uploadedFiles : uploadedFiles[0]);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      toast.success(`Successfully uploaded ${uploadedFiles.length} file(s)`);
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const getFileIcon = () => {
    if (accept.startsWith('image/')) {
      return <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />;
    } else if (accept.startsWith('video/')) {
      return <Video className="w-8 h-8 mb-2 text-muted-foreground" />;
    } else if (accept === '.pdf') {
      return <FileText className="w-8 h-8 mb-2 text-muted-foreground" />;
    }
    return <File className="w-8 h-8 mb-2 text-muted-foreground" />;
  };

  return (
    <div className="space-y-4">
      <div
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          {getFileIcon()}
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Click to upload</span> or drag and drop
            <div className="text-xs mt-1">
              {accept === 'image/*' 
                ? 'PNG, JPG, GIF up to 10MB'
                : accept === 'video/*'
                ? 'MP4, WebM up to 50MB'
                : 'Any file type'}
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Select Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={handleFileInput}
          />
        </div>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Uploading...</span>
            <span>{Math.round(uploadProgress)}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
