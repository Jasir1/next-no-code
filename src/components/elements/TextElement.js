'use client';

export default function TextElement({ content, styles, isEditing, onChange }) {
  if (isEditing) {
    return (
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        style={styles}
        className="w-full min-h-[60px] resize-none border-2 border-blue-500 rounded p-2"
        autoFocus
      />
    );
  }

  return <p style={styles}>{content || 'Enter text here'}</p>;
}