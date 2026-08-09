'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTodoStore } from '@/stores/todo-store';
import { Button } from '@/components/ui/Button';

interface AddTodoFormProps {
  selectedDate: string;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ selectedDate }) => {
  const [title, setTitle] = useState('');
  const addTodo = useTodoStore((s) => s.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo(title.trim(), selectedDate);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Thêm thói quen dưỡng sinh mới hôm nay (vd: Ngâm 200g gạo lứt, Uống trà sắn dây)..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 shadow-xs"
      />
      <Button type="submit" variant="primary" size="md" className="shrink-0 bg-[#2D5A27]">
        <Plus className="w-4 h-4" />
        Thêm Task
      </Button>
    </form>
  );
};
