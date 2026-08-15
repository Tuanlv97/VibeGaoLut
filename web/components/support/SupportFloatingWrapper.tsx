'use client';

import React from 'react';
import { SocialSupportDock } from './SocialSupportDock';
import { VectorAIChatbotWidget } from './VectorAIChatbotWidget';

export const SupportFloatingWrapper: React.FC = () => {
  return (
    <>
      {/* 1. Left Support Floating Dock (Zalo OA, Facebook Messenger, Hotline 24/7) */}
      <SocialSupportDock />

      {/* 2. Right Vector Search AI Chatbot Assistant Widget (RAG Product & Blog Cards) */}
      <VectorAIChatbotWidget />
    </>
  );
};
