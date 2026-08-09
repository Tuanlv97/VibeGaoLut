'use client';

import React from 'react';

export function AdminStatCard({
  title,
  value,
  icon,
  badgeText,
  badgeColor = 'emerald',
}: {
  title: string;
  value: string | number;
  icon: string;
  badgeText?: string;
  badgeColor?: 'emerald' | 'amber' | 'blue' | 'purple';
}) {
  const badgeClasses = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  }[badgeColor];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shadow-xs">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        {badgeText && (
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${badgeClasses}`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
