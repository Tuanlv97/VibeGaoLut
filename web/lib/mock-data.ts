export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  weightUnit: string;
  origin: string;
  ingredients: string;
  nutritionInfo: {
    calories: string;
    protein: string;
    carbs: string;
    fiber: string;
    fat: string;
  };
  description: string;
  categorySlug: string;
  categoryName: string;
  isFeaturedNew: boolean;
  releasedAt: string;
  rating: number;
  reviewCount: number;
  images: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  productCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorName: string;
  readingTimeMinutes: number;
  categorySlug: string;
  categoryName: string;
  publishedAt: string;
  isFeatured: boolean;
  relatedProductIds: string[];
}

export interface Question {
  id: string;
  authorName: string;
  authorEmail: string;
  questionType: 'General' | 'Product' | 'Nutrition' | 'Cooking';
  content: string;
  createdAt: string;
  status: 'APPROVED' | 'PENDING';
  productId?: string;
  productName?: string;
  answer?: {
    responderName: string;
    content: string;
    createdAt: string;
    isOfficial: boolean;
  };
}

export interface Review {
  id: string;
  productId: string;
  orderId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  verified: boolean;
  images?: string[];
}

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'c1000000-0000-4000-8000-000000000001',
    name: 'Gạo & Ngũ Cốc Thô',
    slug: 'gao-ngu-coc',
    description: 'Gạo lứt đỏ ST25 nguyên cám, yến mạch nguyên hạt và các loại hạt ngũ cốc thô dưỡng sinh thuần khiết.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80',
    productCount: 2,
  },
  {
    id: 'c2000000-0000-4000-8000-000000000002',
    name: 'Hạt Dinh Dưỡng & Granola',
    slug: 'hat-dinh-duong-granola',
    description: 'Hạt điều Bình Phước, hạt macca, óc chó nguyên vị và granola nướng mật ong hoa nhãn siêu hạt.',
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd01cc9386a?auto=format&fit=crop&w=1000&q=80',
    productCount: 2,
  },
  {
    id: 'c3000000-0000-4000-8000-000000000003',
    name: 'Trà Thảo Mộc & Dưỡng Sinh',
    slug: 'tra-thao-moc',
    description: 'Trà gạo lứt đậu đỏ búp ổi, trà hoa cúc San Tuyết sao tay giúp thanh nhiệt, an thần và đẹp da.',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    productCount: 2,
  },
  {
    id: 'c4000000-0000-4000-8000-000000000004',
    name: 'Bột Dưỡng Sinh & Siêu Thực Phẩm',
    slug: 'bot-duong-sinh',
    description: 'Bột sắn dây ta ướp hoa lài, bột mầm ngũ cốc 13 loại hạt bổ sung đạm thực vật thanh mát.',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80',
    productCount: 2,
  },
  {
    id: 'c5000000-0000-4000-8000-000000000005',
    name: 'Thực Phẩm Chay & Gia Vị Clean',
    slug: 'thuc-pham-chay-gia-vi',
    description: 'Nấm đông cô sấy giòn, chà bông nấm chân đinh, nước tương Tamari 3 năm và hạt nêm nấm thuần chay.',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    productCount: 4,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'f1000000-0000-4000-8000-000000000001',
    name: 'Gạo Lứt Đỏ ST25 Nguyên Cám GreenPantry 1kg',
    slug: 'gao-lut-do-st25-nguyen-cam-1kg',
    price: 85000,
    compareAtPrice: 105000,
    stockQuantity: 150,
    weightUnit: '1kg',
    origin: 'Sóc Trăng, Việt Nam',
    ingredients: '100% Gạo lứt đỏ ST25 nguyên cám canh tác hữu cơ',
    nutritionInfo: { calories: '355 kcal/100g', protein: '7.8g', carbs: '76.2g', fiber: '3.5g', fat: '2.7g' },
    description: 'Gạo lứt đỏ ST25 nguyên cám trứ danh vùng Sóc Trăng, hạt dài, dẻo thơm mềm cơm mà không cần ngâm qua đêm. Giàu Anthocyanin và chất xơ hòa tan giúp hỗ trợ kiểm soát đường huyết và tim mạch.',
    categorySlug: 'gao-ngu-coc',
    categoryName: 'Gạo & Ngũ Cốc Thô',
    isFeaturedNew: true,
    releasedAt: '2026-07-25T08:00:00Z',
    rating: 4.9,
    reviewCount: 48,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'f1000000-0000-4000-8000-000000000002',
    name: 'Yến Mạch Cán Tươi Nguyên Cám Nhập Khẩu 500g',
    slug: 'yen-mach-can-tuoi-nguyen-cam-500g',
    price: 65000,
    compareAtPrice: 80000,
    stockQuantity: 200,
    weightUnit: '500g',
    origin: 'Úc (Hữu cơ)',
    ingredients: '100% Yến mạch nguyên hạt cán dẹp',
    nutritionInfo: { calories: '389 kcal/100g', protein: '16.9g', carbs: '66.3g', fiber: '10.6g', fat: '6.9g' },
    description: 'Yến mạch cán tươi giàu Beta-Glucan giúp giảm cholesterol xấu, phù hợp nấu cháo chay, làm smoothie súp sáng hoặc làm bánh dinh dưỡng.',
    categorySlug: 'gao-ngu-coc',
    categoryName: 'Gạo & Ngũ Cốc Thô',
    isFeaturedNew: true,
    releasedAt: '2026-08-01T09:00:00Z',
    rating: 4.8,
    reviewCount: 32,
    images: [
      'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'f2000000-0000-4000-8000-000000000001',
    name: 'Hạt Điều Sấy Nguyên Vị Bình Phước 500g',
    slug: 'hat-dieu-say-nguyen-vi-binh-phuoc-500g',
    price: 145000,
    compareAtPrice: 170000,
    stockQuantity: 120,
    weightUnit: '500g',
    origin: 'Bình Phước, Việt Nam',
    ingredients: '100% Hạt điều A1 sấy giòn nguyên vị, không gia vị, không chất bảo quản',
    nutritionInfo: { calories: '553 kcal/100g', protein: '18.2g', carbs: '30.1g', fiber: '3.3g', fat: '43.8g' },
    description: 'Hạt điều loại 1 từ vùng đất đỏ Bình Phước, béo ngậy, bùi béo tự nhiên. Nguồn protein thực vật tuyệt vời cho người ăn chay và Eat Clean.',
    categorySlug: 'hat-dinh-duong-granola',
    categoryName: 'Hạt Dinh Dưỡng & Granola',
    isFeaturedNew: false,
    releasedAt: '2026-06-15T10:00:00Z',
    rating: 5.0,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1509358271058-acd01cc9386a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'f2000000-0000-4000-8000-000000000002',
    name: 'Granola Nướng Mật Ong Siêu Hạt 500g',
    slug: 'granola-nuong-mat-ong-sieu-hat-500g',
    price: 165000,
    compareAtPrice: 195000,
    stockQuantity: 180,
    weightUnit: '500g',
    origin: 'Đà Lạt, Việt Nam',
    ingredients: 'Yến mạch, hạt điều, óc chó, macca, hạt bí xanh, nho khô, dừa sấy, mật ong hoa nhãn',
    nutritionInfo: { calories: '470 kcal/100g', protein: '13.5g', carbs: '54.0g', fiber: '7.8g', fat: '22.5g' },
    description: 'Granola nướng giòn thủ công 85% hạt dinh dưỡng cao cấp, ngọt nhẹ thanh tự nhiên từ mật ong hoa nhãn. Ăn kèm sữa chua hoặc sữa hạt cực ngon.',
    categorySlug: 'hat-dinh-duong-granola',
    categoryName: 'Hạt Dinh Dưỡng & Granola',
    isFeaturedNew: true,
    releasedAt: '2026-07-28T14:00:00Z',
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'f3000000-0000-4000-8000-000000000001',
    name: 'Trà Gạo Lứt Đậu Đỏ Thảo Mộc 500g',
    slug: 'tra-gao-lut-dau-do-thao-moc-500g',
    price: 95000,
    compareAtPrice: 120000,
    stockQuantity: 250,
    weightUnit: '500g',
    origin: 'Hà Nội, Việt Nam',
    ingredients: 'Gạo lứt huyết rồng sao tay, đậu đỏ xanh lòng, búp ổi khô, hoa cúc, nụ hồng',
    nutritionInfo: { calories: '120 kcal/100g', protein: '4.2g', carbs: '22.0g', fiber: '5.1g', fat: '1.1g' },
    description: 'Trà thảo mộc dưỡng sinh giúp thanh nhiệt, giải độc gan, đẹp da và hỗ trợ ngủ ngon giấc. Vị thơm dịu bùi ngậy nhẹ từ gạo lứt rang.',
    categorySlug: 'tra-thao-moc',
    categoryName: 'Trà Thảo Mộc & Dưỡng Sinh',
    isFeaturedNew: false,
    releasedAt: '2026-05-10T11:00:00Z',
    rating: 4.7,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'f3000000-0000-4000-8000-000000000002',
    name: 'Trà Hoa Cúc San Tuyết Nguyên Nụ 100g',
    slug: 'tra-hoa-cuc-san-tuyet-nguyen-nu-100g',
    price: 120000,
    compareAtPrice: 145000,
    stockQuantity: 100,
    weightUnit: '100g',
    origin: 'Hà Giang, Việt Nam',
    ingredients: '100% Nụ hoa cúc vàng San Tuyết sấy lạnh nguyên bông',
    nutritionInfo: { calories: '15 kcal/100g', protein: '0.5g', carbs: '3.1g', fiber: '1.2g', fat: '0.1g' },
    description: 'Hoa cúc San Tuyết trồng trên núi cao Hà Giang sấy lạnh giữ trọn màu sắc và hương thơm nồng nàn. Hỗ trợ an thần, sáng mắt, bớt căng thẳng.',
    categorySlug: 'tra-thao-moc',
    categoryName: 'Trà Thảo Mộc & Dưỡng Sinh',
    isFeaturedNew: true,
    releasedAt: '2026-08-05T16:00:00Z',
    rating: 4.9,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'f4000000-0000-4000-8000-000000000001',
    name: 'Bột Sắn Dây Ta Ướp Hoa Lài 500g',
    slug: 'bot-san-day-ta-uop-hoa-lai-500g',
    price: 110000,
    compareAtPrice: 135000,
    stockQuantity: 150,
    weightUnit: '500g',
    origin: 'Kinh Môn, Hải Dương',
    ingredients: '100% Bột sắn dây ta lọc tinh khiết 14 nước, ướp hoa lài tươi',
    nutritionInfo: { calories: '340 kcal/100g', protein: '0.2g', carbs: '84.3g', fiber: '0.8g', fat: '0.1g' },
    description: 'Bột sắn dây củ ta dây nhỏ lọc 14 lần nước tinh khiết, hạt sắc nét màu trắng tinh, hương thơm hoa lài dịu mát. Cực kỳ mát gan, giải nhiệt số 1.',
    categorySlug: 'bot-duong-sinh',
    categoryName: 'Bột Dưỡng Sinh & Siêu Thực Phẩm',
    isFeaturedNew: true,
    releasedAt: '2026-07-20T08:30:00Z',
    rating: 4.8,
    reviewCount: 51,
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'f4000000-0000-4000-8000-000000000002',
    name: 'Bột Mầm Ngũ Cốc Dưỡng Sinh 13 Loại Hạt 500g',
    slug: 'bot-mam-ngu-coc-duong-sinh-13-loai-hat-500g',
    price: 130000,
    compareAtPrice: 160000,
    stockQuantity: 140,
    weightUnit: '500g',
    origin: 'Nghệ An, Việt Nam',
    ingredients: 'Mầm đậu xanh, đậu đỏ, đậu đen xanh lòng, hạt sen, ý dĩ, macca, óc chó, yến mạch, gạo lứt, vừng đen',
    nutritionInfo: { calories: '410 kcal/100g', protein: '21.5g', carbs: '62.0g', fiber: '9.4g', fat: '8.3g' },
    description: 'Bột ngũ cốc từ hạt ủ mầm gia tăng tối đa enzyme dưỡng chất, bổ sung chất đạm thực vật, thay thế bữa sáng vô cùng nhanh chóng và đủ chất.',
    categorySlug: 'bot-duong-sinh',
    categoryName: 'Bột Dưỡng Sinh & Siêu Thực Phẩm',
    isFeaturedNew: false,
    releasedAt: '2026-06-25T15:00:00Z',
    rating: 4.7,
    reviewCount: 23,
    images: ['https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1000&q=80'],
  },
  {
    id: 'f5000000-0000-4000-8000-000000000001',
    name: 'Nấm Đông Cô Sấy Giòn Tách Dầu 150g',
    slug: 'nam-dong-co-say-gion-tach-dau-150g',
    price: 89000,
    compareAtPrice: 110000,
    stockQuantity: 300,
    weightUnit: '150g',
    origin: 'Lâm Đồng, Việt Nam',
    ingredients: 'Nấm đông cô tươi 98%, muối biển 1.5%, dầu đậu nành 0.5%',
    nutritionInfo: { calories: '280 kcal/100g', protein: '12.4g', carbs: '45.1g', fiber: '14.2g', fat: '3.5g' },
    description: 'Nấm đông cô tươi sấy chân không giòn tan, vị ngọt thanh tự nhiên đậm đà vị umami. Món ăn vặt healthy bồi bổ sức khỏe cho mọi lứa tuổi.',
    categorySlug: 'thuc-pham-chay-gia-vi',
    categoryName: 'Thực Phẩm Chay & Gia Vị Clean',
    isFeaturedNew: true,
    releasedAt: '2026-07-30T10:00:00Z',
    rating: 5.0,
    reviewCount: 77,
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'f5000000-0000-4000-8000-000000000002',
    name: 'Chà Bông Nấm Chân Đinh Ăn Liền 200g',
    slug: 'cha-bong-nam-chan-dinh-an-lien-200g',
    price: 75000,
    compareAtPrice: 95000,
    stockQuantity: 220,
    weightUnit: '200g',
    origin: 'Đồng Nai, Việt Nam',
    ingredients: 'Chân nấm hương tươi, nước tương Tamari, hạt nêm chay nấm, dầu mè, ớt dịu',
    nutritionInfo: { calories: '210 kcal/100g', protein: '18.0g', carbs: '28.5g', fiber: '12.0g', fat: '4.2g' },
    description: 'Chà bông nấm dai ngon giòn ngọt đậm đà, chế biến từ chân nấm chọn lọc, phối trộn gia vị thuần chay. Ăn cùng cơm nóng, xôi lứt hoặc bánh mì rất ngon.',
    categorySlug: 'thuc-pham-chay-gia-vi',
    categoryName: 'Thực Phẩm Chay & Gia Vị Clean',
    isFeaturedNew: false,
    releasedAt: '2026-06-10T13:00:00Z',
    rating: 4.8,
    reviewCount: 36,
    images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80'],
  },
  {
    id: 'f5000000-0000-4000-8000-000000000003',
    name: 'Nước Tương Tamari Dưỡng Sinh 3 Năm 500ml',
    slug: 'nuoc-tuong-tamari-duong-sinh-3-nam-500ml',
    price: 98000,
    compareAtPrice: 125000,
    stockQuantity: 160,
    weightUnit: '500ml',
    origin: 'Bến Tre, Việt Nam',
    ingredients: 'Đậu nành sạch không biến đổi gen (Non-GMO), muối hầm ủ ngấu 36 tháng',
    nutritionInfo: { calories: '85 kcal/100ml', protein: '9.5g', carbs: '8.0g', fiber: '1.0g', fat: '0.5g' },
    description: 'Nước tương Tamari lên men tự nhiên 3 năm theo phương pháp Ohsawa thực dưỡng. Đậm đà, không hóa chất, chứa nhiều vi sinh có lợi cho đường ruột.',
    categorySlug: 'thuc-pham-chay-gia-vi',
    categoryName: 'Thực Phẩm Chay & Gia Vị Clean',
    isFeaturedNew: true,
    releasedAt: '2026-07-15T09:00:00Z',
    rating: 4.9,
    reviewCount: 58,
    images: ['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80'],
  },
  {
    id: 'f5000000-0000-4000-8000-000000000004',
    name: 'Hạt Nêm Chay Nấm Bào Ngư & Rau Củ 250g',
    slug: 'hat-nem-chay-nam-bao-ngu-rau-cu-250g',
    price: 58000,
    compareAtPrice: 72000,
    stockQuantity: 280,
    weightUnit: '250g',
    origin: 'TP. Hồ Chí Minh',
    ingredients: 'Chiết xuất nấm bào ngư, củ ngưu báng, cà rốt, củ cải trắng, đường thốt nốt, muối biển',
    nutritionInfo: { calories: '180 kcal/100g', protein: '4.5g', carbs: '38.0g', fiber: '2.1g', fat: '0.2g' },
    description: 'Hạt nêm thuần chay từ nấm và củ quả dưỡng sinh, không chứa bột ngọt MSG hóa học, giúp món canh, kho, xào chay có vị ngọt thanh thanh tự nhiên.',
    categorySlug: 'thuc-pham-chay-gia-vi',
    categoryName: 'Thực Phẩm Chay & Gia Vị Clean',
    isFeaturedNew: false,
    releasedAt: '2026-05-20T17:00:00Z',
    rating: 4.8,
    reviewCount: 41,
    images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80'],
  },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [];

export const MOCK_QUESTIONS: Question[] = [];

export const MOCK_REVIEWS: Review[] = [];

export interface ComboItem {
  id: string;
  comboId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  productName?: string;
  productImage?: string;
  productSlug?: string;
}

export interface Combo {
  id: string;
  name: string;
  slug: string;
  comboType: 'WEIGHT_LOSS' | 'WEIGHT_GAIN' | 'HEALTH' | 'OFFICE' | 'FAMILY';
  shortDescription: string;
  fullDescription: string;
  originalPrice: number;
  comboPrice: number;
  savingsAmount: number;
  bannerUrl: string;
  mealPlanJson?: { day: number; title: string; tasks: string[] }[];
  isActive: boolean;
  items: ComboItem[];
}

export const MOCK_COMBOS: Combo[] = [
  {
    id: 'cb100000-0000-4000-8000-000000000001',
    name: 'Combo Chay Giảm Cân & Siết Mỡ',
    slug: 'combo-chay-giam-can-siet-mo',
    comboType: 'WEIGHT_LOSS',
    shortDescription: 'Bộ giải pháp ăn chay giảm cân 7 ngày gồm Gạo lứt đỏ ST25, Yến mạch nổ hông, Đậu đen xanh lòng, Hạt chia và Trà gạo lứt detox. Giúp no lâu, tiêu mỡ bụng và giữ dáng thon gọn.',
    fullDescription: 'Combo Chay Giảm Cân & Siết Mỡ GreenPantry được thiết kế chuyên biệt dựa trên nguyên lý chỉ số đường huyết GI thấp và giàu chất xơ hòa tan. Tập trung đốt cháy mỡ thừa tự nhiên, thanh lọc cơ thể mà không gây mệt mỏi hay mất sức.',
    originalPrice: 420000,
    comboPrice: 349000,
    savingsAmount: 71000,
    bannerUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80',
    mealPlanJson: [
      { day: 1, title: 'Ngày 1: Tiêu mỡ & Khởi động', tasks: ['Sáng: 1 bát yến mạch ngâm sữa chua + 1 thìa hạt chia', 'Trưa: 1 bát cơm gạo lứt ST25 + Đậu hũ luộc + Salad rau', 'Tối: 1 ly trà gạo lứt đậu đỏ detox + Nộm rau mầm'] },
      { day: 2, title: 'Ngày 2: Thanh lọc đường ruột', tasks: ['Sáng: 1 ly bột sắn dây hoa lài mát gan', 'Trưa: 1.5 bát cơm gạo lứt ST25 + Nấm xào + Rau luộc', 'Tối: 1 bát cháo yến mạch đậu đen xanh lòng'] },
      { day: 3, title: 'Ngày 3: Siết mỡ tăng tốc', tasks: ['Sáng: Yến mạch cán tươi nấu với hạt chia', 'Trưa: 1 bát cơm gạo lứt ST25 + Đậu phụ kho tộ + Canh bí đỏ', 'Tối: Uống 500ml trà gạo lứt đậu đỏ búp ổi'] },
      { day: 4, title: 'Ngày 4: Xả độc cơ thể', tasks: ['Sáng: 1 ly bột sắn dây ướp hoa lài nhẹ bụng', 'Trưa: 1 bát cơm gạo lứt đỏ ST25 + Nấm xào sả ớt', 'Tối: Salad ngũ sắc mix hạt chia'] },
      { day: 5, title: 'Ngày 5: Phục hồi năng lượng', tasks: ['Sáng: Smoothie yến mạch chuối + Hạt chia', 'Trưa: 1.5 bát cơm gạo lứt ST25 + Canh rau ngót', 'Tối: Nước trà gạo lứt đậu đỏ nhẹ dạ'] },
      { day: 6, title: 'Ngày 6: Đốt mỡ chuyên sâu', tasks: ['Sáng: Yến mạch nổ hông ngâm sữa chua', 'Trưa: Cơm gạo lứt ST25 + Đậu phụ rán ngố + Rau mầm', 'Tối: Súp yến mạch rau củ'] },
      { day: 7, title: 'Ngày 7: Tổng kết & Duy trì', tasks: ['Sáng: 1 ly bột sắn dây hoa lài', 'Trưa: Cơm gạo lứt đỏ ST25 + Nấm đùi gà nướng', 'Tối: Trà thảo mộc gạo lứt đậu đỏ kết thúc tuần'] }
    ],
    isActive: true,
    items: [
      { id: 'cbi-1', comboId: 'cb1', productId: 'f1000000-0000-4000-8000-000000000001', quantity: 2, unitPrice: 85000, productName: 'Gạo Lứt Đỏ ST25 Nguyên Cám 1kg', productImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80', productSlug: 'gao-lut-do-st25-nguyen-cam-1kg' },
      { id: 'cbi-2', comboId: 'cb1', productId: 'f1000000-0000-4000-8000-000000000002', quantity: 1, unitPrice: 65000, productName: 'Yến Mạch Cán Tươi Nguyên Cám 500g', productImage: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1000&q=80', productSlug: 'yen-mach-can-tuoi-nguyen-cam-500g' },
      { id: 'cbi-3', comboId: 'cb1', productId: 'f3000000-0000-4000-8000-000000000001', quantity: 1, unitPrice: 95000, productName: 'Trà Gạo Lứt Đậu Đỏ Thảo Mộc 500g', productImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80', productSlug: 'tra-gao-lut-dau-do-thao-moc-500g' },
      { id: 'cbi-4', comboId: 'cb1', productId: 'f4000000-0000-4000-8000-000000000001', quantity: 1, unitPrice: 110000, productName: 'Bột Sắn Dây Ta Ướp Hoa Lài 500g', productImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80', productSlug: 'bot-san-day-ta-uop-hoa-lai-500g' }
    ]
  },
  {
    id: 'cb200000-0000-4000-8000-000000000002',
    name: 'Combo Chay Tăng Cân & High-Protein',
    slug: 'combo-chay-tang-can-high-protein',
    comboType: 'WEIGHT_GAIN',
    shortDescription: 'Giải pháp bổ sung Protein & Calo thuần chay cho người muốn tăng cân lành mạnh, dồi dào năng lượng với Bột ngũ cốc 25 loại hạt, Granola, Hạt điều sấy và Yến mạch.',
    fullDescription: 'Bộ Combo thiết kế cho người ăn chay bị gầy, mệt mỏi hoặc tập luyện gym/sports cần đạm thực vật. Giúp hấp thu dinh dưỡng tối đa, xây dựng cơ bắp săn chắc.',
    originalPrice: 580000,
    comboPrice: 489000,
    savingsAmount: 91000,
    bannerUrl: 'https://images.unsplash.com/photo-1509358271058-acd01cc9386a?auto=format&fit=crop&w=1000&q=80',
    mealPlanJson: [
      { day: 1, title: 'Ngày 1: Nạp Calo Chất Lượng', tasks: ['Sáng: 1 ly bột ngũ cốc High-Protein + 2 lát bánh mì yến mạch', 'Phụ sáng: 30g Granola nướng mật ong', 'Trưa: Cơm gạo lứt + Đậu phụ kho nấm', 'Tối: Smoothie hạt điều + Yến mạch'] }
    ],
    isActive: true,
    items: [
      { id: 'cbi-5', comboId: 'cb2', productId: 'f2000000-0000-4000-8000-000000000001', quantity: 1, unitPrice: 145000, productName: 'Hạt Điều Sấy Nguyên Vị Bình Phước 500g', productImage: 'https://images.unsplash.com/photo-1509358271058-acd01cc9386a?auto=format&fit=crop&w=1000&q=80', productSlug: 'hat-dieu-say-nguyen-vi-binh-phuoc-500g' },
      { id: 'cbi-6', comboId: 'cb2', productId: 'f2000000-0000-4000-8000-000000000002', quantity: 2, unitPrice: 165000, productName: 'Granola Nướng Mật Ong Siêu Hạt 500g', productImage: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1000&q=80', productSlug: 'granola-nuong-mat-ong-sieu-hat-500g' },
      { id: 'cbi-7', comboId: 'cb2', productId: 'f1000000-0000-4000-8000-000000000002', quantity: 1, unitPrice: 65000, productName: 'Yến Mạch Cán Tươi Nguyên Cám 500g', productImage: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1000&q=80', productSlug: 'yen-mach-can-tuoi-nguyen-cam-500g' }
    ]
  },
  {
    id: 'cb300000-0000-4000-8000-000000000003',
    name: 'Combo Sức Khỏe Chay & Dưỡng Sinh Trẻ Hóa',
    slug: 'combo-suc-khoe-chay-duong-sinh',
    comboType: 'HEALTH',
    shortDescription: 'Bộ thực dưỡng cao cấp gồm Trà hoa cúc San Tuyết, Trà gạo lứt đậu đỏ, Bột sắn dây ta ướp hoa lài và Gạo lứt ST25. An thần, bồi bổ tâm trí, trẻ hóa da.',
    fullDescription: 'Sự kết hợp hoàn hảo giữa đông y dưỡng sinh Ohsawa và thảo mộc tự nhiên. Phù hợp cho người ăn chay trường, người trung niên cần ngủ ngon, thanh nhiệt hạ hỏa.',
    originalPrice: 510000,
    comboPrice: 429000,
    savingsAmount: 81000,
    bannerUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    mealPlanJson: [
      { day: 1, title: 'Ngày 1: An Thần & Hạ Hỏa', tasks: ['Sáng: 1 ly bột sắn dây ướp hoa lài ấm', 'Trưa: Cơm gạo lứt dẻo thơm + Canh bí xanh nấm', 'Tối: 1 ấm Trà hoa cúc San Tuyết trước khi ngủ 30 phút'] }
    ],
    isActive: true,
    items: [
      { id: 'cbi-8', comboId: 'cb3', productId: 'f3000000-0000-4000-8000-000000000002', quantity: 1, unitPrice: 120000, productName: 'Trà Hoa Cúc San Tuyết Nguyên Nụ 100g', productImage: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1000&q=80', productSlug: 'tra-hoa-cuc-san-tuyet-nguyen-nu-100g' },
      { id: 'cbi-9', comboId: 'cb3', productId: 'f3000000-0000-4000-8000-000000000001', quantity: 1, unitPrice: 95000, productName: 'Trà Gạo Lứt Đậu Đỏ Thảo Mộc 500g', productImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80', productSlug: 'tra-gao-lut-dau-do-thao-moc-500g' },
      { id: 'cbi-10', comboId: 'cb3', productId: 'f4000000-0000-4000-8000-000000000001', quantity: 1, unitPrice: 110000, productName: 'Bột Sắn Dây Ta Ướp Hoa Lài 500g', productImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80', productSlug: 'bot-san-day-ta-uop-hoa-lai-500g' },
      { id: 'cbi-11', comboId: 'cb3', productId: 'f1000000-0000-4000-8000-000000000001', quantity: 2, unitPrice: 85000, productName: 'Gạo Lứt Đỏ ST25 Nguyên Cám 1kg', productImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80', productSlug: 'gao-lut-do-st25-nguyen-cam-1kg' }
    ]
  },
  {
    id: 'cb400000-0000-4000-8000-000000000004',
    name: 'Combo Chay Văn Phòng Nhanh & Gọn',
    slug: 'combo-chay-van-phong-nhanh-gon',
    comboType: 'OFFICE',
    shortDescription: 'Gói thực phẩm chay ăn liền & pha uống siêu nhanh tại bàn làm việc: Granola nướng mật ong, Hạt điều sấy, Trà gạo lứt và Yến mạch cán tươi.',
    fullDescription: 'Tiện lợi, không tốn thời gian chế biến, cung cấp năng lượng tỉnh táo cả ngày làm việc mà không lo tích mỡ thừa.',
    originalPrice: 360000,
    comboPrice: 299000,
    savingsAmount: 61000,
    bannerUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1000&q=80',
    isActive: true,
    items: [
      { id: 'cbi-12', comboId: 'cb4', productId: 'f2000000-0000-4000-8000-000000000002', quantity: 1, unitPrice: 165000, productName: 'Granola Nướng Mật Ong Siêu Hạt 500g', productImage: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1000&q=80', productSlug: 'granola-nuong-mat-ong-sieu-hat-500g' },
      { id: 'cbi-13', comboId: 'cb4', productId: 'f2000000-0000-4000-8000-000000000001', quantity: 1, unitPrice: 145000, productName: 'Hạt Điều Sấy Nguyên Vị Bình Phước 500g', productImage: 'https://images.unsplash.com/photo-1509358271058-acd01cc9386a?auto=format&fit=crop&w=1000&q=80', productSlug: 'hat-dieu-say-nguyen-vi-binh-phuoc-500g' }
    ]
  },
  {
    id: 'cb500000-0000-4000-8000-000000000005',
    name: 'Combo Chay Gia Đình & Bếp Xanh',
    slug: 'combo-chay-gia-dinh-bep-xanh',
    comboType: 'FAMILY',
    shortDescription: 'Gói nhu yếu phẩm chay dinh dưỡng cho cả gia đình: Gạo lứt ST25 (3kg), Hạt điều, Yến mạch, Bột sắn dây và Trà thảo mộc dưỡng sinh.',
    fullDescription: 'Lựa chọn hoàn hảo cho các bữa ăn chay rằm, mùng một hoặc chế độ ăn xanh hàng tuần cho cả nhà.',
    originalPrice: 750000,
    comboPrice: 629000,
    savingsAmount: 121000,
    bannerUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    isActive: true,
    items: [
      { id: 'cbi-15', comboId: 'cb5', productId: 'f1000000-0000-4000-8000-000000000001', quantity: 3, unitPrice: 85000, productName: 'Gạo Lứt Đỏ ST25 Nguyên Cám 1kg', productImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80', productSlug: 'gao-lut-do-st25-nguyen-cam-1kg' },
      { id: 'cbi-16', comboId: 'cb5', productId: 'f2000000-0000-4000-8000-000000000001', quantity: 2, unitPrice: 145000, productName: 'Hạt Điều Sấy Nguyên Vị Bình Phước 500g', productImage: 'https://images.unsplash.com/photo-1509358271058-acd01cc9386a?auto=format&fit=crop&w=1000&q=80', productSlug: 'hat-dieu-say-nguyen-vi-binh-phuoc-500g' }
    ]
  }
];

