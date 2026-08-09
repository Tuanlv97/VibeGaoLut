'use client';

import React from 'react';
import { CheckCircle2, Circle, Trash2, Clock } from 'lucide-react';
import { TodoItem, useTodoStore } from '@/stores/todo-store';

interface TodoItemRowProps {
  todo: TodoItem;
}

export const TodoItemRow: React.FC<TodoItemRowProps> = ({ todo }) => {
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);

  return (
    <div
      className={`bg-white border rounded-xl p-4 flex items-center justify-between gap-4 transition-all duration-200 shadow-xs ${
        todo.completed
          ? 'border-emerald-200 bg-emerald-50/40 opacity-80'
          : 'border-[#E2E8F0] hover:border-[#2D5A27]/40'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`p-1 rounded-full transition-colors ${
            todo.completed ? 'text-[#166534]' : 'text-[#64748B] hover:text-[#2D5A27]'
          }`}
        >
          {todo.completed ? (
            <CheckCircle2 className="w-6 h-6 fill-emerald-100" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium transition-all ${
              todo.completed
                ? 'line-through text-[#64748B]'
                : 'text-[#1E293B]'
            }`}
          >
            {todo.title}
          </p>
          {todo.completedAt && (
            <div className="text-[11px] text-[#166534] flex items-center gap-1 mt-0.5 font-mono">
              <Clock className="w-3 h-3" />
              Hoàn thành: {new Date(todo.completedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-[#64748B] hover:text-[#991B1B] p-1.5 transition-colors shrink-0"
        title="Xóa thói quen"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
