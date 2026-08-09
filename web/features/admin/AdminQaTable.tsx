'use client';

import React, { useState } from 'react';
import { AnswerQaModal } from './AnswerQaModal';

export function AdminQaTable({
  questions = [],
  onUpdateStatus,
  onAnswer,
}: {
  questions: any[];
  onUpdateStatus: (id: string, status: string) => Promise<void>;
  onAnswer: (data: any) => Promise<void>;
}) {
  const [selectedStatusTab, setSelectedStatusTab] = useState('ALL');
  const [answeringQuestion, setAnsweringQuestion] = useState<any | null>(null);

  const statusList = [
    { key: 'ALL', label: 'Tất Cả' },
    { key: 'PENDING', label: 'Chờ Duyệt' },
    { key: 'APPROVED', label: 'Đã Duyệt' },
    { key: 'REJECTED', label: 'Bị Từ Chối' },
  ];

  const filteredQuestions = questions.filter((q) => {
    if (selectedStatusTab === 'ALL') return true;
    return q.status === selectedStatusTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-1 rounded-full text-xs font-bold">🟡 CHỜ DUYỆT</span>;
      case 'APPROVED':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full text-xs font-bold">🟢 ĐÃ DUYỆT</span>;
      case 'REJECTED':
        return <span className="bg-red-100 text-red-800 border border-red-300 px-2.5 py-1 rounded-full text-xs font-bold">🔴 TỪ CHỐI</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
        {statusList.map((tab) => {
          const isActive = selectedStatusTab === tab.key;
          const count = tab.key === 'ALL' ? questions.length : questions.filter((q) => q.status === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setSelectedStatusTab(tab.key)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">Nội Dung Câu Hỏi</th>
                <th className="py-3.5 px-4">Tác Giả (Guest)</th>
                <th className="py-3.5 px-4">Phản Hồi Chính Thức</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-6 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Chưa có câu hỏi nào.
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900 line-clamp-2">"{q.content}"</p>
                      <span className="text-xs text-slate-400">
                        {q.questionType || 'Chung'} • {new Date(q.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-slate-800">{q.authorName}</p>
                      <p className="text-xs text-slate-500">{q.authorEmail}</p>
                    </td>
                    <td className="py-4 px-4">
                      {q.answers && q.answers.length > 0 ? (
                        <p className="text-xs text-emerald-800 font-medium bg-emerald-50 p-2 rounded-lg border border-emerald-200 line-clamp-2">
                          💬 {q.answers[0].content}
                        </p>
                      ) : (
                        <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Chưa có câu trả lời
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(q.status)}</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => setAnsweringQuestion(q)}
                        className="inline-flex px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs"
                      >
                        💬 Trả lời & Duyệt
                      </button>

                      {q.status === 'PENDING' && (
                        <button
                          onClick={() => onUpdateStatus(q.id, 'REJECTED')}
                          className="inline-flex px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-medium transition-colors"
                        >
                          ❌ Từ Chối
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnswerQaModal
        question={answeringQuestion}
        isOpen={Boolean(answeringQuestion)}
        onClose={() => setAnsweringQuestion(null)}
        onSubmit={onAnswer}
      />
    </div>
  );
}
