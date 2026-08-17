'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { SocialSupportDock } from './SocialSupportDock';
import { VectorAIChatbotWidget } from './VectorAIChatbotWidget';

export const SupportFloatingWrapper: React.FC = () => {
  const pathname = usePathname();

  // Hide support dock & chatbot on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* 1. Left Support Floating Dock (Zalo OA, Facebook Messenger, Hotline 24/7) */}
      <SocialSupportDock />

      {/* 2. Right Vector Search AI Chatbot Assistant Widget (RAG Product & Blog Cards) */}
      <VectorAIChatbotWidget />
    </>
  );
};

