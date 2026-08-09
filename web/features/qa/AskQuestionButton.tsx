'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AskQuestionButtonProps {
  onClickModal?: () => void;
}

export const AskQuestionButton: React.FC<AskQuestionButtonProps> = ({ onClickModal }) => {
  if (onClickModal) {
    return (
      <Button variant="primary" size="md" onClick={onClickModal}>
        <MessageSquarePlus className="w-4 h-4" />
        Đặt Câu Hỏi Mới
      </Button>
    );
  }

  return (
    <Link href="/questions/new">
      <Button variant="primary" size="md">
        <MessageSquarePlus className="w-4 h-4" />
        Đặt Câu Hỏi Mới
      </Button>
    </Link>
  );
};
