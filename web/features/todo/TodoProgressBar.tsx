import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface TodoProgressBarProps {
  total: number;
  completed: number;
}

export const TodoProgressBar: React.FC<TodoProgressBarProps> = ({
  total,
  completed,
}) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-[#2D5A27] text-white rounded-2xl p-6 mb-6 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <h3 className="font-bold text-base font-display">Tiến Độ Thói Quen Ăn Uống Lành Mạnh</h3>
        </div>
        <span className="font-bold font-mono text-sm bg-white/20 px-3 py-1 rounded-full">
          {completed}/{total} Hoàn Thành ({percentage}%)
        </span>
      </div>

      <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
        <div
          className="bg-emerald-300 h-full transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
