'use client';

import React from 'react';
import { Calendar, Shield } from 'lucide-react';
import { TodoItem } from '@/stores/todo-store';
import { TodoItemRow } from './TodoItemRow';

interface TodoListProps {
  todos: TodoItem[];
  selectedDate: string;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, selectedDate }) => {
  if (todos.length === 0) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-10 text-center space-y-3 shadow-xs">
        <div className="w-12 h-12 bg-[#F9F6F0] text-[#2D5A27] rounded-full flex items-center justify-center mx-auto border border-[#E2E8F0]">
          <Calendar className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-base text-[#1E293B]">
          Chưa Có Thói Quen Nào Cho Ngày Này
        </h4>
        <p className="text-xs text-[#64748B] max-w-sm mx-auto">
          Hãy tạo mốc thói quen ăn uống lành mạnh đầu tiên (ngâm gạo lứt, uống trà thảo mộc, ăn hạt dưỡng sinh) để duy trì lối sống xanh mỗi ngày nhé!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItemRow key={todo.id} todo={todo} />
      ))}

      <div className="pt-4 text-center text-xs text-[#64748B] flex items-center justify-center gap-1.5">
        <Shield className="w-3.5 h-3.5 text-[#2D5A27]" />
        <span>Dữ liệu thói quen Todo được lưu an toàn tại máy của bạn (Client Local Storage).</span>
      </div>
    </div>
  );
};
