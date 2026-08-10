'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  productName: string;
}

export const ProductLightboxModal: React.FC<ProductLightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onSelectIndex,
  productName,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onSelectIndex((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onSelectIndex((currentIndex + 1) % images.length);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onSelectIndex]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-in fade-in">
      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 px-4 text-white">
        <span className="text-sm font-medium tracking-wide text-gray-300">
          {productName} — ({currentIndex + 1} / {images.length})
        </span>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Đóng xem ảnh"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main image container */}
      <div className="relative w-full max-w-4xl h-[75vh] px-12 flex items-center justify-center">
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={currentImg}
            alt={`${productName} view ${currentIndex + 1}`}
            fill
            sizes="100vw"
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => onSelectIndex((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm transition-all"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => onSelectIndex((currentIndex + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm transition-all"
            aria-label="Ảnh tiếp theo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 max-w-full overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onSelectIndex(idx)}
              className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === idx
                  ? 'border-[#2D5A27] ring-2 ring-[#2D5A27]/50 scale-105 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="56px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
