'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/lib/mock-data';
import { useCartStore } from '@/stores/cart-store';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80';

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = React.useState(false);
  const rawImage = product.images && product.images[0] ? product.images[0] : '';
  const initialImage = rawImage.startsWith('http') ? rawImage : DEFAULT_IMAGE;
  const [imgSrc, setImgSrc] = React.useState(initialImage);

  React.useEffect(() => {
    const raw = product.images && product.images[0] ? product.images[0] : '';
    setImgSrc(raw.startsWith('http') ? raw : DEFAULT_IMAGE);
  }, [product.images]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      weightUnit: product.weightUnit,
      image: imgSrc,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.price);

  const formattedComparePrice = product.compareAtPrice
    ? new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(product.compareAtPrice)
    : null;

  return (
    <div className="group bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#2D5A27]/40 transition-all duration-200">
      <Link href={`/products/${product.slug}`} className="block relative aspect-square w-full rounded-lg overflow-hidden mb-3 bg-slate-50">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImgSrc(DEFAULT_IMAGE)}
        />
        {product.isFeaturedNew && (
          <div className="absolute top-2 left-2">
            <Badge variant="sage">MỚI VỀ</Badge>
          </div>
        )}
      </Link>

      <div className="flex-1 flex flex-col">
        <div className="text-xs text-[#64748B] mb-1 font-medium">{product.categoryName}</div>
        <Link href={`/products/${product.slug}`} className="font-semibold text-sm text-[#1E293B] hover:text-[#2D5A27] transition-colors line-clamp-2 mb-2">
          {product.name}
        </Link>

        <div className="flex items-center gap-1 text-xs text-amber-500 mb-3">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="font-semibold text-[#1E293B]">{product.rating}</span>
          <span className="text-[#64748B]">({product.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-[#E2E8F0]">
          <div>
            <div className="font-bold text-base text-[#2D5A27]">{formattedPrice}</div>
            {formattedComparePrice && (
              <div className="text-xs text-[#64748B] line-through">{formattedComparePrice}</div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`p-2.5 rounded-lg text-white font-medium transition-all ${
              added ? 'bg-emerald-600' : 'bg-[#2D5A27] hover:bg-[#23471f] active:scale-95'
            }`}
            title="Thêm vào giỏ hàng"
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
