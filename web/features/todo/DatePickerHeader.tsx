'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerHeaderProps {
  selectedDate: string; // YYYY-MM-DD
  onDateChange: (newDate: string) => void;
}

export const DatePickerHeader: React.FC<DatePickerHeaderProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    onDateChange(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    onDateChange(d.toISOString().split('T')[0]);
  };

  const formatDateDisplay = (dateStr: string) => {
    const d = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return d.toLocaleDateString('vi-VN', options);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
        <button
          onClick={handlePrevDay}
          className="p-2 border border-[#E2E8F0] rounded-xl hover:bg-[#F9F6F0] text-[#1E293B] transition-colors"
          title="Ngày trước"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center sm:text-left">
          <div className="flex items-center gap-1.5 justify-center sm:justify-start text-xs text-[#2D5A27] font-bold uppercase tracking-wider">
            <CalendarIcon className="w-3.5 h-3.5" />
            {selectedDate === todayStr ? 'HÔM NAY' : 'LỊCH SỬ THÓI QUEN'}
          </div>
          <h2 className="text-lg font-bold font-display text-[#1E293B] capitalize">
            {formatDateDisplay(selectedDate)}
          </h2>
        </div>

        <button
          onClick={handleNextDay}
          className="p-2 border border-[#E2E8F0] rounded-xl hover:bg-[#F9F6F0] text-[#1E293B] transition-colors"
          title="Ngày sau"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => e.target.value && onDateChange(e.target.value)}
          className="bg-[#F9F6F0] border border-[#E2E8F0] text-xs font-semibold rounded-xl px-3 py-2 text-[#1E293B] focus:outline-none focus:border-[#2D5A27]"
        />

        {selectedDate !== todayStr && (
          <button
            onClick={() => onDateChange(todayStr)}
            className="text-xs bg-[#2D5A27] text-white px-3 py-2 rounded-xl font-semibold hover:bg-[#23471f] transition-colors"
          >
            Về Hôm Nay
          </button>
        )}
      </div>
    </div>
  );
};
