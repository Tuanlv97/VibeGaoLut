import { Injectable } from '@nestjs/common';
import { Product } from '@domain/entities/product.entity';
import { Category } from '@domain/entities/category.entity';
import { BlogPost, BlogCategory } from '@domain/entities/blog-post.entity';
import { Question, QuestionAnswer } from '@domain/entities/question.entity';
import { Order, OrderItem } from '@domain/entities/order.entity';
import { Review } from '@domain/entities/review.entity';
import { OrderStatus } from '@domain/enums/order-status.enum';
import { ReviewStatus } from '@domain/enums/review-status.enum';
import { QuestionStatus, QuestionType } from '@domain/enums/question.enum';

@Injectable()
export class SeederService {
  private readonly categories: Category[] = [
    new Category('cat_gao_ngu_coc', 'Gạo & Ngũ Cốc', 'gao-ngu-coc', 'Gạo lứt, yến mạch nguyên cám và hạt dinh dưỡng'),
    new Category('cat_tra_herbal', 'Trà Herbal', 'tra-herbal', 'Trà gạo lứt, trà đậu đen xanh lòng thanh nhiệt'),
    new Category('cat_dau_bot', 'Đậu & Bột', 'dau-bot', 'Bột sắn dây ta, bột ngũ cốc nguyên chất'),
    new Category('cat_healthy_snacks', 'Healthy Snacks', 'healthy-snacks', 'Bánh thanh ngọc bích, thực phẩm thuần chay'),
  ];

  private readonly products: Product[] = [
    new Product(
      'prod_gao_lut_st25',
      'cat_gao_ngu_coc',
      'Gạo Lứt Đỏ ST25 GreenPantry 1kg',
      'gao-lut-do-st25',
      120000,
      150000,
      100,
      '1kg',
      'Sóc Trăng, Việt Nam',
      '100% Gạo lứt đỏ ST25 nguyên cám',
      'Calo: 355 kcal/100g, Chất xơ: 4.2g, Protein: 7.8g, Carbs: 76g',
      'Gạo lứt đỏ ST25 dẻo thơm tự nhiên, dồi dào chất xơ hỗ trợ giảm cân và cân bằng đường huyết.',
      true,
      new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago (New arrival)
      new Date(),
      ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'],
    ),
    new Product(
      'prod_tra_gao_lut',
      'cat_tra_herbal',
      'Trà Gạo Lứt Đậu Đen Xanh Lòng 500g',
      'tra-gao-lut-dau-den',
      85000,
      100000,
      80,
      '500g',
      'Hà Nội, Việt Nam',
      'Gạo lứt rang, Đậu đen xanh lòng rang, Thảo quyết minh',
      'Calo: 110 kcal/100g, Giàu chất chống oxy hóa Polyphenol',
      'Thức uống dưỡng sinh thanh lọc cơ thể, mát gan giải độc và hỗ trợ giấc ngủ ngon.',
      true,
      new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago (New arrival)
      new Date(),
      ['https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'],
    ),
    new Product(
      'prod_bot_san_day',
      'cat_dau_bot',
      'Bột Sắn Dây Ta Nguyên Chất 500g',
      'bot-san-day-ta',
      150000,
      180000,
      60,
      '500g',
      'Hải Dương, Việt Nam',
      '100% Củ sắn dây ta nguyên chất ướp hoa hại',
      'Calo: 340 kcal/100g, Isoflavone tự nhiên',
      'Bột sắn dây ta nguyên củ giúp giải nhiệt, cải thiện tiêu hóa và cân bằng nội tiết.',
      false,
      new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      new Date(),
      ['https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80'],
    ),
    new Product(
      'prod_yen_mach',
      'cat_gao_ngu_coc',
      'Yến Mạch Nguyên Cám Úc GreenPantry 500g',
      'yen-mach-nguyen-cam',
      75000,
      90000,
      120,
      '500g',
      'Nhập khẩu Úc',
      '100% Yến mạch nguyên hạt cán dẹt',
      'Calo: 389 kcal/100g, Beta-glucan 5g, Protein 16.9g',
      'Thực phẩm ăn sáng tiện lợi giàu chất xơ hòa tan Beta-glucan tốt cho tim mạch.',
      false,
      new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
      new Date(),
      ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'],
    ),
  ];

  private readonly blogPosts: BlogPost[] = [
    new BlogPost(
      'blog_1',
      'cat_gao_ngu_coc',
      '5 Lợi ích của gạo lứt đỏ nguyên cám cho sức khỏe & vóc dáng',
      '5-loi-ich-cua-gao-lut-do',
      'Gạo lứt đỏ chứa hàm lượng chất xơ gấp 3 lần gạo trắng và là giải pháp hoàn hảo cho thực đơn ăn chay dưỡng sinh.',
      '<h2>1. Hỗ trợ kiểm soát cân nặng và giảm mỡ thừa</h2><p>Chất xơ dồi dào giúp no lâu hơn...</p><h2>2. Giảm chỉ số đường huyết</h2><p>Nhờ lớp vỏ cám nguyên vẹn...</p>',
      '/images/blog/gao-lut-benefits.jpg',
      'Dược sĩ Minh Anh',
      6,
      true,
      new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      new Date(),
      ['prod_gao_lut_st25', 'prod_tra_gao_lut'], // Linked product IDs
    ),
    new BlogPost(
      'blog_2',
      'cat_tra_herbal',
      'Cách nấu Trà gạo lứt đậu đen chuẩn vị dưỡng sinh tại nhà',
      'cach-nau-tra-gao-lut-dau-den',
      'Hướng dẫn từng bước ngâm và hãm trà gạo lứt đậu đen dẻo quánh thanh mát cho cả gia đình.',
      '<p>Trà gạo lứt đậu đen không chỉ là thức uống giải khát...</p>',
      '/images/blog/tra-gao-lut-recipe.jpg',
      'Chef Đức Nam',
      4,
      false,
      new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      new Date(),
      ['prod_tra_gao_lut'],
    ),
  ];

  private readonly questions: Question[] = [
    new Question(
      'q_1',
      'prod_gao_lut_st25',
      'Chị Thu Hà',
      'ha@example.com',
      QuestionType.COOKING,
      'Gạo lứt đỏ ST25 này cần ngâm bao lâu trước khi nấu cơm?',
      QuestionStatus.APPROVED,
      new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      [
        new QuestionAnswer(
          'ans_1',
          'q_1',
          'Tư vấn viên GreenPantry',
          'Chào chị Hà, Gạo lứt đỏ ST25 của GreenPantry hạt dẻo sẵn nên chỉ cần ngâm từ 20-30 phút là cơm đã chín dẻo thơm ngon rồi ạ!',
          true,
          new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        ),
      ],
    ),
    new Question(
      'q_2',
      'prod_tra_gao_lut',
      'Anh Quốc Bảo',
      'bao@example.com',
      QuestionType.NUTRITION,
      'Uống trà gạo lứt đậu đen mỗi ngày thay nước lọc có tốt không?',
      QuestionStatus.APPROVED,
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      [
        new QuestionAnswer(
          'ans_2',
          'q_2',
          'Dược sĩ Minh Anh',
          'Dạ hoàn toàn tốt ạ. Trà gạo lứt đậu đen thanh nhiệt, bổ thận và hỗ trợ đào thải độc tố rất phù hợp dùng uống hằng ngày.',
          true,
          new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        ),
      ],
    ),
  ];

  private readonly orders: Order[] = [
    new Order(
      'ord_delivered_1',
      'GP-883920',
      'Nguyễn Văn An',
      '0912345678',
      'an.nguyen@example.com',
      'Hà Nội',
      'Cầu Giấy',
      'Dịch Vọng',
      'Số 10 Phạm Hùng',
      205000,
      30000,
      235000,
      'COD',
      OrderStatus.DELIVERED,
      new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      [
        new OrderItem('item_1', 'ord_delivered_1', 'prod_gao_lut_st25', 'Gạo Lứt Đỏ ST25 GreenPantry 1kg', 120000, 1, 120000),
        new OrderItem('item_2', 'ord_delivered_1', 'prod_tra_gao_lut', 'Trà Gạo Lứt Đậu Đen Xanh Lòng 500g', 85000, 1, 85000),
      ],
    ),
  ];

  private readonly reviews: Review[] = [
    new Review(
      'rev_1',
      'prod_gao_lut_st25',
      'ord_delivered_1',
      'Nguyễn Văn An',
      5,
      'Gạo lứt nướng cơm dẻo quánh, ăn với muối vừng rất ngon!',
      ['/images/reviews/gao-lut-review.jpg'],
      ReviewStatus.APPROVED,
      new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    ),
  ];

  getCategories(): Category[] {
    return this.categories;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getBlogPosts(): BlogPost[] {
    return this.blogPosts;
  }

  getQuestions(): Question[] {
    return this.questions;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  getReviews(): Review[] {
    return this.reviews;
  }
}
