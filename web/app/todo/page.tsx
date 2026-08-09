'use client';

import React, { useState } from 'react';
import { useTodoStore } from '@/stores/todo-store';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DatePickerHeader } from '@/features/todo/DatePickerHeader';
import { TodoProgressBar } from '@/features/todo/TodoProgressBar';
import { AddTodoForm } from '@/features/todo/AddTodoForm';
import { TodoList } from '@/features/todo/TodoList';

export default function DailyTodoPage() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const getTodosByDate = useTodoStore((s) => s.getTodosByDate);
  const getCompletedCountByDate = useTodoStore((s) => s.getCompletedCountByDate);

  const todos = getTodosByDate(selectedDate);
  const completedCount = getCompletedCountByDate(selectedDate);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Nhật ký Todo thói quen' },
        ]}
      />

      <div className="text-center sm:text-left space-y-1">
        <h1 className="text-3xl font-bold font-display text-[#1E293B]">
          Nhật Ký Thói Quen Ăn Uống Lành Mạnh
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Ghi chép và theo dõi danh sách việc cần làm hằng ngày cho sức khỏe dưỡng sinh của bạn.
        </p>
      </div>

      <DatePickerHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <TodoProgressBar total={todos.length} completed={completedCount} />

      <AddTodoForm selectedDate={selectedDate} />

      <TodoList todos={todos} selectedDate={selectedDate} />
    </div>
  );
}
