import React, { useState, useRef } from 'react';
import styles from './ImageZoom.module.scss';

interface ImageZoomProps {
  src: string;
  alt: string;
}

export const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div 
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
    >
      <img ref={imgRef} src={src} alt={alt} className={styles.mainImage} />
      {showZoom && (
        <div 
          className={styles.zoomResult}
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`
          }}
        />
      )}
    </div>
  );
};
