'use client';

import React, { createContext, useContext, useState } from 'react';

interface ImageViewerContextType {
  isOpen: boolean;
  imageUrl: string;
  imageAlt: string;
  caption?: string;
  openImage: (url?: string | null, alt?: string | null, caption?: string | null) => void;
  closeImage: () => void;
}

const ImageViewerContext = createContext<ImageViewerContextType | undefined>(undefined);

export const ImageViewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [caption, setCaption] = useState<string | undefined>(undefined);

  const openImage = (url?: string | null, alt?: string | null, cap?: string | null) => {
    if (!url) return;
    setImageUrl(url);
    setImageAlt(alt || 'Artwork Image');
    setCaption(cap || undefined);
    setIsOpen(true);
  };

  const closeImage = () => {
    setIsOpen(false);
  };

  return (
    <ImageViewerContext.Provider
      value={{
        isOpen,
        imageUrl,
        imageAlt,
        caption,
        openImage,
        closeImage,
      }}
    >
      {children}
    </ImageViewerContext.Provider>
  );
};

export const useImageViewer = () => {
  const context = useContext(ImageViewerContext);
  if (!context) {
    throw new Error('useImageViewer must be used within an ImageViewerProvider');
  }
  return context;
};
