'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-[#E2E8F0] animate-in fade-in zoom-in duration-200">
        {title && (
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <h3 className="font-bold text-lg text-[#1E293B]">{title}</h3>
            <button
              onClick={onClose}
              className="text-[#64748B] hover:text-[#1E293B] p-1 rounded-lg"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
