'use client';

import React from 'react';
import { AskQuestionForm } from './AskQuestionForm';

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskQuestionModal: React.FC<AskQuestionModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-500 hover:text-slate-800 bg-white rounded-full border border-slate-200"
        >
          ✕
        </button>
        <AskQuestionForm onSuccess={onClose} />
      </div>
    </div>
  );
};
