'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, ShoppingBag, Zap, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '@/lib/mock-data';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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

  const [stockError, setStockError] = useState<string | null>(null);

  const handleAddToCart = () => {
    setStockError(null);
    if (product.stockQuantity <= 0) {
      setStockError('Sản phẩm hiện tại đã hết hàng trong kho.');
      return;
    }
    if (quantity > product.stockQuantity) {
      setStockError(`Số lượng không đủ! Sản phẩm hiện chỉ còn ${product.stockQuantity} túi trong kho.`);
      return;
    }

    try {
      addItem(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          weightUnit: product.weightUnit,
          image: product.images[0],
          slug: product.slug,
          stockQuantity: product.stockQuantity,
        },
        quantity
      );
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err: any) {
      setStockError(err.message || 'Không thể thêm vào giỏ hàng.');
    }
  };

  const handleBuyNow = () => {
    if (quantity > product.stockQuantity) {
      setStockError(`Số lượng không đủ! Sản phẩm hiện chỉ còn ${product.stockQuantity} túi trong kho.`);
      return;
    }
    handleAddToCart();
    if (!stockError && product.stockQuantity >= quantity) {
      router.push('/checkout');
    }
  };

  return (
    <div className="space-y-6">
      {/* Category & Badges */}
      <div className="flex items-center gap-2">
        <Badge variant="outline">{product.categoryName}</Badge>
        {product.isFeaturedNew && <Badge variant="sage">MỚI VỀ</Badge>}
        {product.stockQuantity > 0 ? (
          <Badge variant="success">Còn hàng ({product.stockQuantity})</Badge>
        ) : (
          <Badge variant="destructive">Tạm hết hàng</Badge>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#1E293B] leading-tight">
        {product.name}
      </h1>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-amber-500 font-semibold">
          <Star className="w-4 h-4 fill-current" />
          <span>{product.rating}</span>
        </div>
        <span className="text-[#64748B]">|</span>
        <span className="text-[#64748B]">{product.reviewCount} đánh giá từ người mua thực tế</span>
        <span className="text-[#64748B]">|</span>
        <span className="text-[#64748B]">Xuất xứ: <strong className="text-[#1E293B]">{product.origin}</strong></span>
      </div>

      {/* Price Display */}
      <div className="p-4 bg-[#F9F6F0] rounded-xl border border-[#E2E8F0] flex items-baseline gap-3">
        <span className="text-3xl font-bold text-[#2D5A27] font-mono">{formattedPrice}</span>
        {formattedComparePrice && (
          <span className="text-sm text-[#64748B] line-through font-mono">{formattedComparePrice}</span>
        )}
        <span className="text-xs text-[#64748B] font-medium ml-auto">Đơn vị: {product.weightUnit}</span>
      </div>

      {/* Short Excerpt */}
      <p className="text-sm text-[#64748B] leading-relaxed">
        {product.description}
      </p>

      {/* Quantity & CTA Buttons */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-[#1E293B]">Số lượng:</span>
          <div className="flex items-center border border-[#E2E8F0] rounded-lg bg-white">
            <button
              onClick={() => {
                setStockError(null);
                setQuantity(Math.max(1, quantity - 1));
              }}
              className="px-3 py-1.5 text-sm font-bold text-[#64748B] hover:bg-[#F9F6F0] rounded-l-lg"
            >
              -
            </button>
            <span className="px-4 text-sm font-semibold text-[#1E293B] min-w-[2.5rem] text-center font-mono">
              {quantity}
            </span>
            <button
              onClick={() => {
                setStockError(null);
                if (product.stockQuantity > 0 && quantity >= product.stockQuantity) {
                  setStockError(`Số lượng không đủ! Sản phẩm hiện chỉ còn ${product.stockQuantity} túi trong kho.`);
                  return;
                }
                setQuantity(quantity + 1);
              }}
              className="px-3 py-1.5 text-sm font-bold text-[#64748B] hover:bg-[#F9F6F0] rounded-r-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Stock Alert Message */}
        {stockError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg flex items-center gap-2">
            <span>⚠️</span>
            <span>{stockError}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={handleAddToCart}
            disabled={product.stockQuantity <= 0}
            className="flex-1"
          >
            {added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
            {product.stockQuantity <= 0
              ? 'Tạm Hết Hàng'
              : added
              ? 'Đã Thêm Vào Giỏ!'
              : 'Thêm Vào Giỏ Hàng'}
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={handleBuyNow}
            disabled={product.stockQuantity <= 0}
            className="flex-1 bg-[#C86D51] hover:bg-[#b35b40]"
          >
            <Zap className="w-5 h-5" />
            {product.stockQuantity <= 0 ? 'Tạm Hết Hàng' : 'Mua Ngay (COD)'}
          </Button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 border-t border-[#E2E8F0] pt-4 text-xs text-[#64748B]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
          <span>100% Nguyên cám</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Truck className="w-4 h-4 text-[#2D5A27]" />
          <span>Giao COD nhanh</span>
        </div>
        <div className="flex items-center gap-1.5">
          <RefreshCw className="w-4 h-4 text-[#2D5A27]" />
          <span>Đổi trả 7 ngày</span>
        </div>
      </div>
    </div>
  );
};
