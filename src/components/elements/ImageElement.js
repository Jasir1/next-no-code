'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload } from 'lucide-react';

export default function ImageElement({ src, alt, styles, onUpdate }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({ src: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={styles}
    >
      <Image
        src={src || 'https://via.placeholder.com/400x300?text=Click+to+Upload'}
        alt={alt || 'Image'}
        width={400}
        height={300}
        className="max-w-full h-auto"
      />
      {isHovered && (
        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
          <div className="text-white text-center">
            <Upload className="w-8 h-8 mx-auto mb-2" />
            <span className="text-sm">Upload Image</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}