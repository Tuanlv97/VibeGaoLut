'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, Share2, ChevronRight, X } from 'lucide-react';

export const SocialSupportDock: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 transition-all duration-300">
      {/* Toggle button for collapsible floating dock */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-soft-md text-xs font-medium text-slate-700 hover:text-[#2D5A27] hover:border-[#2D5A27] transition-all"
        title={isExpanded ? 'Thu gọn hỗ trợ' : 'Mở rộng kênh hỗ trợ'}
      >
        <Share2 className="w-3.5 h-3.5 text-[#2D5A27]" />
        <span>Kênh Hỗ Trợ</span>
        {isExpanded ? (
          <X className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>

      {/* List of social channels */}
      {isExpanded && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* 1. Zalo Official Account */}
          <a
            href="https://zalo.me"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#0068FF] text-white shadow-soft-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium text-xs"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
              Zalo
            </div>
            <span className="hidden sm:inline font-semibold">Tư Vấn Zalo OA</span>
            {/* Tooltip on hover for desktop */}
            <span className="absolute left-full ml-2 px-2.5 py-1 bg-slate-800 text-white text-[11px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md sm:hidden">
              Chat Zalo OA
            </span>
          </a>

          {/* 2. Facebook Messenger */}
          <a
            href="https://m.me/greenpantry"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#0084FF] to-[#00C6FF] text-white shadow-soft-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium text-xs"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:inline font-semibold">Messenger</span>
            <span className="absolute left-full ml-2 px-2.5 py-1 bg-slate-800 text-white text-[11px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md sm:hidden">
              Chat Messenger
            </span>
          </a>

          {/* 3. Hotline 24/7 */}
          <a
            href="tel:19008888"
            className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#2D5A27] text-white shadow-soft-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium text-xs"
          >
            <div className="relative w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 animate-ping"></span>
              <Phone className="w-3.5 h-3.5 text-white relative z-10" />
            </div>
            <span className="hidden sm:inline font-semibold font-mono tracking-tight">1900 8888</span>
            <span className="absolute left-full ml-2 px-2.5 py-1 bg-slate-800 text-white text-[11px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md sm:hidden font-mono">
              Hotline 1900 8888
            </span>
          </a>
        </div>
      )}
    </div>
  );
};
