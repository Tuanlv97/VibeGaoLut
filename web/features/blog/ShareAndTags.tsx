'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export const ShareAndTags: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto border-t border-[#E2E8F0] pt-6 flex items-center justify-between gap-4 text-xs text-[#64748B]">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[#1E293B]">Tags:</span>
        <span className="px-2.5 py-1 bg-slate-100 rounded-full">#gaolutst25</span>
        <span className="px-2.5 py-1 bg-slate-100 rounded-full">#duongsinh</span>
        <span className="px-2.5 py-1 bg-slate-100 rounded-full">#thucphamchay</span>
      </div>

      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#1E293B] font-medium"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
        {copied ? 'Đã sao chép link' : 'Chia sẻ bài viết'}
      </button>
    </div>
  );
};
