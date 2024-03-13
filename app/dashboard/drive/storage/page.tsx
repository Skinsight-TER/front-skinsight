"use client";

import { useState, useEffect } from 'react';

interface Image {
  url: string;
}

export default function Gallery() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch('/api/images');
        const data: Image[] = await res.json();
        setImages(data);
      } catch (error) {
        console.error('Failed to load images:', error);
      }
    }

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Gallery</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <img src={image.url} alt="" style={{ width: '200px', height: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
