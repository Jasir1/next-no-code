'use client';

export default function VideoElement({ src, styles, autoplay, controls = true }) {
  // Extract video ID from YouTube URL
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = src ? getYouTubeId(src) : null;

  if (youtubeId) {
    return (
      <div className="relative w-full" style={{ paddingBottom: '56.25%', ...styles }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}${autoplay ? '?autoplay=1' : ''}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <video
      src={src || ''}
      controls={controls}
      autoPlay={autoplay}
      style={styles}
      className="w-full"
    >
      Your browser does not support the video tag.
    </video>
  );
}