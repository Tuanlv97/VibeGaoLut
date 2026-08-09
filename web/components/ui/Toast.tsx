'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all ${
        type === 'success'
          ? 'bg-[#DCFCE7] text-[#166534] border-[#DCFCE7]'
          : 'bg-[#FEE2E2] text-[#991B1B] border-[#FEE2E2]'
      }`}
    >
      {type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
      <span>{message}</span>
      <button onClick={onClose} className="p-1 hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
