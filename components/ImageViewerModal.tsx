'use client';

import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, ExternalLink } from 'lucide-react';
import { useImageViewer } from '@/context/ImageViewerContext';

export const ImageViewerModal: React.FC = () => {
  const { isOpen, imageUrl, imageAlt, caption, closeImage } = useImageViewer();
  const [isZoomed, setIsZoomed] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeImage]);

  // Reset zoom when opening a new image
  useEffect(() => {
    if (isOpen) {
      setIsZoomed(false);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070c]/95 backdrop-blur-md p-4 sm:p-6 transition-all duration-300 animate-in fade-in"
      onClick={closeImage}
      role="dialog"
      aria-modal="true"
      aria-label={imageAlt || 'Image Viewer'}
    >
      {/* Top Action Bar */}
      <div 
        className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-lg transition-all"
          title={isZoomed ? 'Zoom Out' : 'Zoom In'}
          aria-label={isZoomed ? 'Zoom Out' : 'Zoom In'}
        >
          {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
        </button>

        <a
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-lg transition-all"
          title="Open Full Image"
          aria-label="Open Full Image"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

        <button
          onClick={closeImage}
          className="p-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 transition-all"
          title="Close (Esc)"
          aria-label="Close image viewer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Container */}
      <div 
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`overflow-auto max-h-[80vh] rounded-2xl flex items-center justify-center transition-transform duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
          <img
            src={imageUrl}
            alt={imageAlt}
            onClick={() => setIsZoomed(!isZoomed)}
            className={`rounded-2xl object-contain transition-all duration-300 select-none shadow-2xl ${
              isZoomed 
                ? 'max-w-none w-auto max-h-none scale-125' 
                : 'max-w-full max-h-[75vh] w-auto h-auto'
            }`}
          />
        </div>

        {/* Caption Bar */}
        {(caption || imageAlt) && (
          <div className="mt-3 text-center px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs text-slate-300 max-w-lg shadow-lg">
            <span className="font-semibold text-white">{imageAlt}</span>
            {caption && <span className="block text-slate-400 text-[11px] mt-0.5">{caption}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
