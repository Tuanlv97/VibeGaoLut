import React from 'react';
import { Product } from '@/lib/mock-data';
import { RelatedProductsWidget } from './RelatedProductsWidget';

interface BlogContentProps {
  content: string;
  relatedProducts: Product[];
}

export const BlogContent: React.FC<BlogContentProps> = ({
  content,
  relatedProducts,
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Blog Body Text */}
      <div className="prose prose-slate max-w-none text-[#1E293B] leading-relaxed space-y-4 text-base">
        {content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl font-bold font-display text-[#1E293B] pt-4 border-b border-[#E2E8F0] pb-2">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          return <p key={idx}>{paragraph}</p>;
        })}
      </div>

      {/* Embedded Content Commerce Callout */}
      <RelatedProductsWidget products={relatedProducts} />
    </div>
  );
};
