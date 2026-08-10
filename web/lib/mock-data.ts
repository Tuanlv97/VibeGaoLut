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
    id: 'cat-1',
    name: 'Gạo & Ngũ Cốc',
    slug: 'gao-ngu-coc',
    description: 'Các loại gạo lứt đỏ nguyên cám, ngũ cốc dưỡng sinh chất lượng cao thu hoạch tự nhiên.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    productCount: 8,
  },
  {
    id: 'cat-2',
    name: 'Các Loại Hạt',
    slug: 'cac-loai-hat',
    description: 'Hạt điều, hạt óc chó, mầm hạnh nhân, hạt chia hữu cơ tuyển chọn kỹ lưỡng.',
    imageUrl: 'https://images.unsplash.com/photo-1543158266-0066955047b1?auto=format&fit=crop&w=600&q=80',
    productCount: 6,
  },
  {
    id: 'cat-3',
    name: 'Đậu & Bột Dưỡng Sinh',
    slug: 'dau-bot-duong-sinh',
    description: 'Bột sắn dây ta, bột mè đen, bột 5 loại đậu mầm nguyên chất 100%.',
    imageUrl: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80',
    productCount: 5,
  },
  {
    id: 'cat-4',
    name: 'Trà Herbal & Detox',
    slug: 'tra-herbal-detox',
    description: 'Trà gạo lứt hoa cúc, trà sen thảo mộc giúp thanh lọc cơ thể và ngủ ngon giấc.',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    productCount: 4,
  },
  {
    id: 'cat-5',
    name: 'Thực Phẩm Chay',
    slug: 'thuc-pham-chay',
    description: 'Thực phẩm làm sẵn từ nấm, sườn non chay tự nhiên không hóa chất bảo quản.',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    productCount: 5,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_gao_lut_st25',
    name: 'Gạo Lứt Đỏ ST25 GreenPantry 1kg',
    slug: 'gao-lut-do-st25-1kg',
    price: 120000,
    compareAtPrice: 150000,
    stockQuantity: 45,
    weightUnit: '1kg',
    origin: 'Sóc Trăng, Việt Nam',
    ingredients: '100% Gạo lứt đỏ ST25 nguyên cám tự nhiên',
    nutritionInfo: {
      calories: '345 kcal / 100g',
      protein: '7.5g',
      carbs: '72.0g',
      fiber: '4.8g',
      fat: '2.2g',
    },
    description: 'Gạo Lứt Đỏ ST25 GreenPantry được chọn lọc từ lúa ST25 ngon nhất thế giới giữ nguyên lớp cám vi chất bồi bổ sức khỏe, giàu chất xơ và Vitamin nhóm B. Cơm nấu mềm dẻo, thơm ngậy tự nhiên.',
    categorySlug: 'gao-ngu-coc',
    categoryName: 'Gạo & Ngũ Cốc',
    isFeaturedNew: true,
    releasedAt: '2026-08-01',
    rating: 4.9,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'prod_bot_san_day',
    name: 'Bột Sắn Dây Ta Nguyên Chất 500g',
    slug: 'bot-san-day-ta-nguyen-chat-500g',
    price: 135000,
    compareAtPrice: 160000,
    stockQuantity: 30,
    weightUnit: '500g',
    origin: 'Kinh Môn, Hải Dương',
    ingredients: '100% Bột sắn dây lọc hoa ướp hương ướp lạnh tự nhiên',
    nutritionInfo: {
      calories: '340 kcal / 100g',
      protein: '0.6g',
      carbs: '84.0g',
      fiber: '0.8g',
      fat: '0.1g',
    },
    description: 'Bột sắn dây ta được ướp lọc 18 lần nước theo phương pháp thủ công truyền thống. Sắc bột mịn sáng, vị mát dịu thanh nhiệt, giải độc gan hiệu quả.',
    categorySlug: 'dau-bot-duong-sinh',
    categoryName: 'Đậu & Bột Dưỡng Sinh',
    isFeaturedNew: true,
    releasedAt: '2026-07-28',
    rating: 4.8,
    reviewCount: 24,
    images: [
      'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'prod_tra_gao_lut',
    name: 'Trà Gạo Lứt Đậu Đen Xanh Lòng 400g',
    slug: 'tra-gao-lut-dau-den-xanh-long-400g',
    price: 95000,
    compareAtPrice: 110000,
    stockQuantity: 50,
    weightUnit: '400g',
    origin: 'Đắk Lắk, Việt Nam',
    ingredients: 'Gạo lứt đỏ, Đậu đen xanh lòng sao hạ thổ, Hoa cúc khô, Cỏ ngọt',
    nutritionInfo: {
      calories: '120 kcal / 100g trà khô',
      protein: '4.2g',
      carbs: '22.0g',
      fiber: '3.5g',
      fat: '0.5g',
    },
    description: 'Sự kết hợp hoàn hảo giữa gạo lứt nương đỏ và đậu đen hạt nhỏ xanh lòng rang vừa tới lửa hạ thổ thổ nhưỡng Tây Nguyên. Trà thơm dịu nhẹ, dưỡng nhan thanh nhiệt và giảm stress hiệu quả.',
    categorySlug: 'tra-herbal-detox',
    categoryName: 'Trà Herbal & Detox',
    isFeaturedNew: false,
    releasedAt: '2026-06-15',
    rating: 5.0,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'prod_yen_mach',
    name: 'Hạt Óc Chó Đỏ Nhập Khẩu Mỹ 500g',
    slug: 'hat-oc-cho-do-nhap-khau-my-500g',
    price: 240000,
    compareAtPrice: 280000,
    stockQuantity: 20,
    weightUnit: '500g',
    origin: 'California, Mỹ',
    ingredients: '100% Nhân hạt óc chó đỏ ngõ chín khô tự nhiên',
    nutritionInfo: {
      calories: '654 kcal / 100g',
      protein: '15.2g',
      carbs: '13.7g',
      fiber: '6.7g',
      fat: '65.2g (Giàu Omega-3)',
    },
    description: 'Hạt óc chó đỏ hữu cơ cao cấp giàu Omega-3, DHA gấp nhiều lần các dòng hạt thông thường, rất tốt cho não bộ, phụ nữ mang thai và sức khỏe tim mạch.',
    categorySlug: 'cac-loai-hat',
    categoryName: 'Các Loại Hạt',
    isFeaturedNew: true,
    releasedAt: '2026-08-05',
    rating: 4.7,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1543158266-0066955047b1?auto=format&fit=crop&w=800&q=80',
    ],
  },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '5 Lợi Ích Tuyệt Vời Của Gạo Lứt Đỏ Nguyên Cám Cho Sức Khỏe',
    slug: '5-loi-ich-cua-gao-lut-do-nguyen-cam',
    excerpt: 'Khám phá lý do vì sao gạo lứt đỏ ST25 trở thành thực phẩm vàng được các chuyên gia dinh dưỡng thực dưỡng khuyên dùng mỗi ngày.',
    content: `
      Gạo lứt đỏ nguyên cám là thực phẩm quen thuộc trong chế độ ăn dưỡng sinh và lành mạnh. Không giống như gạo trắng bị loại bỏ hoàn toàn lớp cám dinh dưỡng, gạo lứt đỏ giữ nguyên vẹn lớp màng vi chất cùng mầm lúa giàu dưỡng chất.

      ### 1. Giàu chất xơ hỗ trợ hệ tiêu hóa
      Lượng chất xơ tự nhiên trong gạo lứt đỏ cao gấp 3-4 lần so với gạo trắng thông thường. Nhờ đó, gạo lứt giúp làm chậm quá trình hấp thu đường vào máu, hỗ trợ tiêu hóa trơn tru và ngăn ngừa tình trạng táo bón.

      ### 2. Hỗ trợ kiểm soát cân nặng tự nhiên
      Ăn gạo lứt giúp tạo cảm giác no lâu nhờ hàm lượng carbs phức hợp và chất xơ. Bạn sẽ bớt thèm ăn vặt, giúp giữ vóc dáng cân đối mà vẫn tràn đầy năng lượng.

      ### 3. Tốt cho tim mạch và giảm cholesterol
      Các chất chống oxy hóa cùng Omega-3 tự nhiên trong gạo lứt đỏ giúp hạ thấp mức cholesterol xấu (LDL), bảo vệ thành mạch máu khỏi mảng bám.
    `,
    coverImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80',
    authorName: 'Dược sĩ Minh Anh',
    readingTimeMinutes: 6,
    categorySlug: 'kien-thuc-dinh-duong',
    categoryName: 'Kiến Thức Dinh Dưỡng',
    publishedAt: '2026-08-02',
    isFeatured: true,
    relatedProductIds: ['prod-1', 'prod-3'],
  },
  {
    id: 'blog-2',
    title: 'Hướng Dẫn Nấu Cơm Gạo Lứt Dẻo Mềm Không Bị Cứng Tại Nhà',
    slug: 'huong-dan-nau-com-gao-lut-deo-mem',
    excerpt: 'Mẹo ngâm gạo lứt chuẩn 6-8 tiếng và tỷ lệ nước hoàn hảo giúp bát cơm gạo lứt thơm dẻo ngậy như cơm nếp.',
    content: `
      Nhiều người băn khoăn vì sao nấu cơm gạo lứt hay bị khô cứng khó ăn. Bí quyết nằm ở bước ngâm gạo và tỷ lệ nước chuẩn xác.

      ### Bước 1: Vo nhẹ và ngâm gạo
      Vo nhẹ gạo lứt đỏ 1-2 lần để sạch bụi bẩn. Ngâm gạo trong nước ấm khoảng 30-40 độ C từ 6 đến 8 tiếng.

      ### Bước 2: Tỷ lệ nước chuẩn
      Cho 1 chén gạo lứt ngâm với 1.5 - 1.8 chén nước sạch. Thêm 1 nhúm muối hồng Himalaya nhỏ để cơm thơm đượm vị hơn.
    `,
    coverImage: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1000&q=80',
    authorName: 'Chef Thanh Tùng',
    readingTimeMinutes: 4,
    categorySlug: 'cong-thuc-nau-an',
    categoryName: 'Công Thức Nấu Ăn',
    publishedAt: '2026-08-04',
    isFeatured: false,
    relatedProductIds: ['prod-1'],
  },
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    authorName: 'Nguyễn Thu Trang',
    authorEmail: 'thutrang@example.com',
    questionType: 'Cooking',
    content: 'Cho em hỏi gạo lứt đỏ ST25 ngâm trong bao lâu thì nấu nồi cơm điện thường ngon nhất ạ?',
    createdAt: '2026-08-05T09:30:00Z',
    status: 'APPROVED',
    productId: 'prod-1',
    productName: 'Gạo Lứt Đỏ ST25 GreenPantry 1kg',
    answer: {
      responderName: 'Chuyên Gia Dinh Dưỡng GreenPantry',
      content: 'Chào Thu Trang, Gạo lứt đỏ ST25 GreenPantry bạn nên ngâm nước ấm từ 4 - 6 tiếng trước khi nấu. Khi nấu nồi cơm điện thường, bạn chỉnh tỷ lệ 1 chén gạo : 1.6 chén nước. Nhấn nút Nấu 2 lần để cơm chín dẻo mềm thơm ngon nhất bạn nhé!',
      createdAt: '2026-08-05T10:15:00Z',
      isOfficial: true,
    },
  },
  {
    id: 'q-2',
    authorName: 'Phạm Đức Hoàng',
    authorEmail: 'duchoang@example.com',
    questionType: 'Nutrition',
    content: 'Người bị đau dạ dày uống bột sắn dây pha nước ấm buổi sáng có tốt không shop?',
    createdAt: '2026-08-06T14:20:00Z',
    status: 'APPROVED',
    productId: 'prod-2',
    productName: 'Bột Sắn Dây Ta Nguyên Chất 500g',
    answer: {
      responderName: 'Dược sĩ Minh Anh',
      content: 'Chào bạn Hoàng, Người bị viêm đau dạ dày uống bột sắn dây chín (khuấy với nước sôi thành dạng sệt dẻo) buổi sáng rất tốt, giúp trung hòa axit và làm dịu niêm mạc dạ dày. Không nên uống bột sắn dây sống nguội khi bụng rỗng bạn nhé.',
      createdAt: '2026-08-06T15:00:00Z',
      isOfficial: true,
    },
  },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    orderId: 'GP-883920',
    customerName: 'Trần Thị Mai',
    rating: 5,
    comment: 'Gạo lứt đỏ đượm vị thơm ngậy dẻo vô cùng, ngâm 6h nấu nồi cuckoo cực ngon. Đóng gói túi hút chân chân không cẩn thận. Rất yên tâm ủng hộ GreenPantry lâu dài!',
    createdAt: '2026-08-03T11:00:00Z',
    verified: true,
  },
  {
    id: 'rev-2',
    productId: 'prod-2',
    orderId: 'GP-883921',
    customerName: 'Lê Văn An',
    rating: 5,
    comment: 'Bột sắn dây mịn thơm phức, khuấy nước sôi là trong vắt dịu ngọt tự nhiên. Giao hàng COD nhanh chóng đúng 1 ngày.',
    createdAt: '2026-08-04T16:30:00Z',
    verified: true,
  },
];
