'use client';

import React from 'react';

interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ items, activeTab, onChange }) => {
  return (
    <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
      {items.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            activeTab === tab.id
              ? 'bg-[#2D5A27] text-white'
              : 'text-[#64748B] hover:text-[#1E293B] hover:bg-[#F9F6F0]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
