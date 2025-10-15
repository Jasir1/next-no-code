'use client';

export default function ButtonElement({ content, styles, href }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (href && href !== '#') {
      window.open(href, '_blank');
    }
  };

  return (
    <button
      type="button"
      style={styles}
      onClick={handleClick}
      className="cursor-pointer transition-transform hover:scale-105"
    >
      {content || 'Button'}
    </button>
  );
}