'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  taskDate: string; // YYYY-MM-DD
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

interface TodoState {
  todos: TodoItem[];
  addTodo: (title: string, taskDate: string, description?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  getTodosByDate: (taskDate: string) => TodoItem[];
  getCompletedCountByDate: (taskDate: string) => number;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [
        {
          id: 'todo-default-1',
          title: 'Ngâm 200g gạo lứt đỏ cho bữa tối',
          taskDate: new Date().toISOString().split('T')[0],
          completed: true,
          completedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
        {
          id: 'todo-default-2',
          title: 'Pha 500ml trà đậu đen xanh lòng hạt nảy mầm',
          taskDate: new Date().toISOString().split('T')[0],
          completed: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'todo-default-3',
          title: 'Uống 2L nước chanh mật ong sắn dây ấm',
          taskDate: new Date().toISOString().split('T')[0],
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],

      addTodo: (title, taskDate, description) => {
        const newTodo: TodoItem = {
          id: `todo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          title,
          description,
          taskDate,
          completed: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ todos: [newTodo, ...state.todos] }));
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  completed: !todo.completed,
                  completedAt: !todo.completed ? new Date().toISOString() : undefined,
                }
              : todo
          ),
        }));
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      getTodosByDate: (taskDate) => {
        return get().todos.filter((todo) => todo.taskDate === taskDate);
      },

      getCompletedCountByDate: (taskDate) => {
        return get().todos.filter((todo) => todo.taskDate === taskDate && todo.completed).length;
      },
    }),
    {
      name: 'greenpantry_todos',
    }
  )
);
