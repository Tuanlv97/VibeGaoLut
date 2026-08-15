import { Injectable } from '@nestjs/common';
import { Product } from '@domain/entities/product.entity';
import { Category } from '@domain/entities/category.entity';
import { BlogPost, BlogCategory } from '@domain/entities/blog-post.entity';
import { Question, QuestionAnswer } from '@domain/entities/question.entity';
import { Order, OrderItem } from '@domain/entities/order.entity';
import { Review } from '@domain/entities/review.entity';
import { AdminUser } from '@domain/entities/admin-user.entity';
import { AdminRole } from '@domain/enums/admin-role.enum';
import { OrderStatus } from '@domain/enums/order-status.enum';
import { ReviewStatus } from '@domain/enums/review-status.enum';
import { QuestionStatus, QuestionType } from '@domain/enums/question.enum';
import { Combo, ComboItem } from '@domain/entities/combo.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeederService {
  private readonly categories: Category[] = [
    new Category(
      'c1000000-0000-4000-8000-000000000001',
      'Gạo & Ngũ Cốc Thô',
      'gao-ngu-coc',
      'Gạo lứt đỏ ST25 nguyên cám, yến mạch nguyên hạt và các loại hạt ngũ cốc thô dưỡng sinh thuần khiết.',
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80',
      true,
    ),
    new Category(
      'c2000000-0000-4000-8000-000000000002',
      'Hạt Dinh Dưỡng & Granola',
      'hat-dinh-duong-granola',
      'Hạt điều Bình Phước, hạt macca, óc chó nguyên vị và granola nướng mật ong hoa nhãn siêu hạt.',
      'https://images.unsplash.com/photo-1509358271058-acd01cc9386a?auto=format&fit=crop&w=1000&q=80',
      true,
    ),
    new Category(
      'c3000000-0000-4000-8000-000000000003',
      'Trà Thảo Mộc & Dưỡng Sinh',
      'tra-thao-moc',
      'Trà gạo lứt đậu đỏ búp ổi, trà hoa cúc San Tuyết sao tay giúp thanh nhiệt, an thần và đẹp da.',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
      true,
    ),
    new Category(
      'c4000000-0000-4000-8000-000000000004',
      'Bột Dưỡng Sinh & Siêu Thực Phẩm',
      'bot-duong-sinh',
      'Bột sắn dây ta ướp hoa lài, bột mầm ngũ cốc 13 loại hạt bổ sung đạm thực vật thanh mát.',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80',
      true,
    ),
    new Category(
      'c5000000-0000-4000-8000-000000000005',
      'Thực Phẩm Chay & Gia Vị Clean',
      'thuc-pham-chay-gia-vi',
      'Nấm đông cô sấy giòn, chà bông nấm chân đinh, nước tương Tamari 3 năm và hạt nêm nấm thuần chay.',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
      true,
    ),
  ];

  private readonly products: Product[] = [
    new Product(
      'f1000000-0000-4000-8000-000000000001',
      'c1000000-0000-4000-8000-000000000001',
      'Gạo Lứt Đỏ ST25 Nguyên Cám GreenPantry 1kg',
      'gao-lut-do-st25-nguyen-cam-1kg',
      85000,
      105000,
      150,
      '1kg',
      'Sóc Trăng, Việt Nam',
      '100% Gạo lứt đỏ ST25 nguyên cám canh tác hữu cơ',
      JSON.stringify({ calories: '355 kcal/100g', protein: '7.8g', carbs: '76.2g', fiber: '3.5g', fat: '2.7g' }),
      'Gạo lứt đỏ ST25 nguyên cám trứ danh vùng Sóc Trăng, hạt dài, dẻo thơm mềm cơm mà không cần ngâm qua đêm. Giàu Anthocyanin và chất xơ hòa tan giúp hỗ trợ kiểm soát đường huyết và tim mạch.',
      true,
      new Date('2026-07-25T08:00:00Z'),
      new Date(),
      [
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1000&q=80',
      ],
    ),
    new Product(
      'f1000000-0000-4000-8000-000000000002',
      'c1000000-0000-4000-8000-000000000001',
      'Yến Mạch Cán Tươi Nguyên Cám Nhập Khẩu 500g',
      'yen-mach-can-tuoi-nguyen-cam-500g',
      65000,
      80000,
      200,
      '500g',
      'Úc (Hữu cơ)',
      '100% Yến mạch nguyên hạt cán dẹp',
      JSON.stringify({ calories: '389 kcal/100g', protein: '16.9g', carbs: '66.3g', fiber: '10.6g', fat: '6.9g' }),
      'Yến mạch cán tươi giàu Beta-Glucan giúp giảm cholesterol xấu, phù hợp nấu cháo chay, làm smoothie súp sáng hoặc làm bánh dinh dưỡng.',
      true,
      new Date('2026-08-01T09:00:00Z'),
      new Date(),
      [
        'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80',
      ],
    ),
    new Product(
      'f2000000-0000-4000-8000-000000000001',
      'c2000000-0000-4000-8000-000000000002',
      'Hạt Điều Sấy Nguyên Vị Bình Phước 500g',
      'hat-dieu-say-nguyen-vi-binh-phuoc-500g',
      145000,
      170000,
      120,
      '500g',
      'Bình Phước, Việt Nam',
      '100% Hạt điều A1 sấy giòn nguyên vị, không gia vị, không chất bảo quản',
      JSON.stringify({ calories: '553 kcal/100g', protein: '18.2g', carbs: '30.1g', fiber: '3.3g', fat: '43.8g' }),
      'Hạt điều loại 1 từ vùng đất đỏ Bình Phước, béo ngậy, bùi béo tự nhiên. Nguồn protein thực vật tuyệt vời cho người ăn chay và Eat Clean.',
      false,
      new Date('2026-06-15T10:00:00Z'),
      new Date(),
      [
        'https://images.unsplash.com/photo-1509358271058-acd01cc9386a?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=1000&q=80',
      ],
    ),
    new Product(
      'f2000000-0000-4000-8000-000000000002',
      'c2000000-0000-4000-8000-000000000002',
      'Granola Nướng Mật Ong Siêu Hạt 500g',
      'granola-nuong-mat-ong-sieu-hat-500g',
      165000,
      195000,
      180,
      '500g',
      'Đà Lạt, Việt Nam',
      'Yến mạch, hạt điều, óc chó, macca, hạt bí xanh, nho khô, dừa sấy, mật ong hoa nhãn',
      JSON.stringify({ calories: '470 kcal/100g', protein: '13.5g', carbs: '54.0g', fiber: '7.8g', fat: '22.5g' }),
      'Granola nướng giòn thủ công 85% hạt dinh dưỡng cao cấp, ngọt nhẹ thanh tự nhiên từ mật ong hoa nhãn. Ăn kèm sữa chua hoặc sữa hạt cực ngon.',
      true,
      new Date('2026-07-28T14:00:00Z'),
      new Date(),
      [
        'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1000&q=80',
      ],
    ),
    new Product(
      'f3000000-0000-4000-8000-000000000001',
      'c3000000-0000-4000-8000-000000000003',
      'Trà Gạo Lứt Đậu Đỏ Thảo Mộc 500g',
      'tra-gao-lut-dau-do-thao-moc-500g',
      95000,
      120000,
      250,
      '500g',
      'Hà Nội, Việt Nam',
      'Gạo lứt huyết rồng sao tay, đậu đỏ xanh lòng, búp ổi khô, hoa cúc, nụ hồng',
      JSON.stringify({ calories: '120 kcal/100g', protein: '4.2g', carbs: '22.0g', fiber: '5.1g', fat: '1.1g' }),
      'Trà thảo mộc dưỡng sinh giúp thanh nhiệt, giải độc gan, đẹp da và hỗ trợ ngủ ngon giấc. Vị thơm dịu bùi ngậy nhẹ từ gạo lứt rang.',
      false,
      new Date('2026-05-10T11:00:00Z'),
      new Date(),
      [
        'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1000&q=80',
      ],
    ),
    new Product(
      'f3000000-0000-4000-8000-000000000002',
      'c3000000-0000-4000-8000-000000000003',
      'Trà Hoa Cúc San Tuyết Nguyên Nụ 100g',
      'tra-hoa-cuc-san-tuyet-nguyen-nu-100g',
      120000,
      145000,
      100,
      '100g',
      'Hà Giang, Việt Nam',
      '100% Nụ hoa cúc vàng San Tuyết sấy lạnh nguyên bông',
      JSON.stringify({ calories: '15 kcal/100g', protein: '0.5g', carbs: '3.1g', fiber: '1.2g', fat: '0.1g' }),
      'Hoa cúc San Tuyết trồng trên núi cao Hà Giang sấy lạnh giữ trọn màu sắc và hương thơm nồng nàn. Hỗ trợ an thần, sáng mắt, bớt căng thẳng.',
      true,
      new Date('2026-08-05T16:00:00Z'),
      new Date(),
      [
        'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1000&q=80',
      ],
    ),
    new Product(
      'f4000000-0000-4000-8000-000000000001',
      'c4000000-0000-4000-8000-000000000004',
      'Bột Sắn Dây Ta Ướp Hoa Lài 500g',
      'bot-san-day-ta-uop-hoa-lai-500g',
      110000,
      135000,
      150,
      '500g',
      'Kinh Môn, Hải Dương',
      '100% Bột sắn dây ta lọc tinh khiết 14 nước, ướp hoa lài tươi',
      JSON.stringify({ calories: '340 kcal/100g', protein: '0.2g', carbs: '84.3g', fiber: '0.8g', fat: '0.1g' }),
      'Bột sắn dây củ ta dây nhỏ lọc 14 lần nước tinh khiết, hạt sắc nét màu trắng tinh, hương thơm hoa lài dịu mát. Cực kỳ mát gan, giải nhiệt số 1.',
      true,
      new Date('2026-07-20T08:30:00Z'),
      new Date(),
      [
        'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1000&q=80',
      ],
    ),
    new Product(
      'f4000000-0000-4000-8000-000000000002',
      'c4000000-0000-4000-8000-000000000004',
      'Bột Mầm Ngũ Cốc Dưỡng Sinh 13 Loại Hạt 500g',
      'bot-mam-ngu-coc-duong-sinh-13-loai-hat-500g',
      130000,
      160000,
      140,
      '500g',
      'Nghệ An, Việt Nam',
      'Mầm đậu xanh, đậu đỏ, đậu đen xanh lòng, hạt sen, ý dĩ, macca, óc chó, yến mạch, gạo lứt, vừng đen',
      JSON.stringify({ calories: '410 kcal/100g', protein: '21.5g', carbs: '62.0g', fiber: '9.4g', fat: '8.3g' }),
      'Bột ngũ cốc từ hạt ủ mầm gia tăng tối đa enzyme dưỡng chất, bổ sung chất đạm thực vật, thay thế bữa sáng vô cùng nhanh chóng và đủ chất.',
      false,
      new Date('2026-06-25T15:00:00Z'),
      new Date(),
      ['https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1000&q=80'],
    ),
    new Product(
      'f5000000-0000-4000-8000-000000000001',
      'c5000000-0000-4000-8000-000000000005',
      'Nấm Đông Cô Sấy Giòn Tách Dầu 150g',
      'nam-dong-co-say-gion-tach-dau-150g',
      89000,
      110000,
      300,
      '150g',
      'Lâm Đồng, Việt Nam',
      'Nấm đông cô tươi 98%, muối biển 1.5%, dầu đậu nành 0.5%',
      JSON.stringify({ calories: '280 kcal/100g', protein: '12.4g', carbs: '45.1g', fiber: '14.2g', fat: '3.5g' }),
      'Nấm đông cô tươi sấy chân không giòn tan, vị ngọt thanh tự nhiên đậm đà vị umami. Món ăn vặt healthy bồi bổ sức khỏe cho mọi lứa tuổi.',
      true,
      new Date('2026-07-30T10:00:00Z'),
      new Date(),
      [
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
      ],
    ),
    new Product(
      'f5000000-0000-4000-8000-000000000002',
      'c5000000-0000-4000-8000-000000000005',
      'Chà Bông Nấm Chân Đinh Ăn Liền 200g',
      'cha-bong-nam-chan-dinh-an-lien-200g',
      75000,
      95000,
      220,
      '200g',
      'Đồng Nai, Việt Nam',
      'Chân nấm hương tươi, nước tương Tamari, hạt nêm chay nấm, dầu mè, ớt dịu',
      JSON.stringify({ calories: '210 kcal/100g', protein: '18.0g', carbs: '28.5g', fiber: '12.0g', fat: '4.2g' }),
      'Chà bông nấm dai ngon giòn ngọt đậm đà, chế biến từ chân nấm chọn lọc, phối trộn gia vị thuần chay. Ăn cùng cơm nóng, xôi lứt hoặc bánh mì rất ngon.',
      false,
      new Date('2026-06-10T13:00:00Z'),
      new Date(),
      ['https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80'],
    ),
    new Product(
      'f5000000-0000-4000-8000-000000000003',
      'c5000000-0000-4000-8000-000000000005',
      'Nước Tương Tamari Dưỡng Sinh 3 Năm 500ml',
      'nuoc-tuong-tamari-duong-sinh-3-nam-500ml',
      98000,
      125000,
      160,
      '500ml',
      'Bến Tre, Việt Nam',
      'Đậu nành sạch không biến đổi gen (Non-GMO), muối hầm ủ ngấu 36 tháng',
      JSON.stringify({ calories: '85 kcal/100ml', protein: '9.5g', carbs: '8.0g', fiber: '1.0g', fat: '0.5g' }),
      'Nước tương Tamari lên men tự nhiên 3 năm theo phương pháp Ohsawa thực dưỡng. Đậm đà, không hóa chất, chứa nhiều vi sinh có lợi cho đường ruột.',
      true,
      new Date('2026-07-15T09:00:00Z'),
      new Date(),
      ['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80'],
    ),
    new Product(
      'f5000000-0000-4000-8000-000000000004',
      'c5000000-0000-4000-8000-000000000005',
      'Hạt Nêm Chay Nấm Bào Ngư & Rau Củ 250g',
      'hat-nem-chay-nam-bao-ngu-rau-cu-250g',
      58000,
      72000,
      280,
      '250g',
      'TP. Hồ Chí Minh',
      'Chiết xuất nấm bào ngư, củ ngưu báng, cà rốt, củ cải trắng, đường thốt nốt, muối biển',
      JSON.stringify({ calories: '180 kcal/100g', protein: '4.5g', carbs: '38.0g', fiber: '2.1g', fat: '0.2g' }),
      'Hạt nêm thuần chay từ nấm và củ quả dưỡng sinh, không chứa bột ngọt MSG hóa học, giúp món canh, kho, xào chay có vị ngọt thanh thanh tự nhiên.',
      false,
      new Date('2026-05-20T17:00:00Z'),
      new Date(),
      ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80'],
    ),
  ];

  private readonly blogPosts: BlogPost[] = [
    new BlogPost(
      'b1000000-0000-4000-8000-000000000001',
      'c1000000-0000-4000-8000-000000000001',
      'Thực đơn Eat Clean 7 ngày với Gạo lứt đỏ ST25 và Yến mạch giúp giảm mỡ bụng tự nhiên',
      'thuc-don-eat-clean-7-ngay-gao-lut-yen-mach-giam-mo',
      'Hướng dẫn xây dựng thực đơn Eat Clean chuẩn dưỡng sinh 7 ngày giúp no lâu, không tích mỡ thừa và hỗ trợ vóc dáng thon gọn.',
      'Ăn giảm cân không có nghĩa là nhịn ăn khắt nghiệt. Phương pháp Eat Clean dưỡng sinh tập trung sử dụng thực phẩm nguyên bản giàu xơ như Gạo lứt đỏ ST25 nguyên cám và Yến mạch cán tươi. Nhờ chỉ số đường huyết GI thấp và lượng chất xơ dồi dào, bạn sẽ luôn cảm thấy no lâu, dồi dào năng lượng mà vẫn đốt cháy mỡ thừa tự nhiên.',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80',
      'Chuyên gia Dinh dưỡng Minh Anh',
      6,
      true,
      new Date('2026-08-01T08:00:00Z'),
      new Date(),
      ['f1000000-0000-4000-8000-000000000001', 'f1000000-0000-4000-8000-000000000002'],
    ),
    new BlogPost(
      'b1000000-0000-4000-8000-000000000002',
      'c1000000-0000-4000-8000-000000000001',
      '5 Lợi ích vượt trội của Gạo lứt đỏ ST25 nguyên cám trong việc hỗ trợ giảm cân và giữ dáng',
      '5-loi-ich-gao-lut-do-st25-giam-can',
      'Khám phá lý do tại sao Gạo lứt đỏ ST25 được coi là giải pháp vàng cho người ăn kiêng, tiểu đường và muốn kiểm soát cân nặng.',
      'Gạo lứt đỏ ST25 nguyên cám chứa lượng Anthocyanin chống oxy hóa cực cao cùng chất xơ hòa tan gấp 3 lần gạo trắng. Việc ăn gạo lứt thay thế cơm trắng giúp kiểm soát đường huyết sau ăn, làm chậm quá trình hấp thu tinh bột và hỗ trợ duy trì cân nặng lý tưởng.',
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80',
      'Lương y Bùi Quốc Phương',
      5,
      true,
      new Date('2026-08-05T09:00:00Z'),
      new Date(),
      ['f1000000-0000-4000-8000-000000000001'],
    ),
    new BlogPost(
      'b3000000-0000-4000-8000-000000000001',
      'c3000000-0000-4000-8000-000000000003',
      'Bí quyết uống Trà Gạo Lứt Đậu Đỏ sao tay thanh lọc cơ thể và hỗ trợ giảm mỡ an toàn',
      'bi-quyet-uong-tra-gao-lut-dau-do-giam-can',
      'Trà gạo lứt đậu đỏ không chỉ thơm ngon mà còn là thức uống thanh nhiệt, mát gan và hỗ trợ tiêu mỡ vô cùng hiệu quả.',
      'Thay vì sử dụng các loại nước ngọt chứa đường tổng hợp, thói quen hãm 50g Trà gạo lứt đậu đỏ búp ổi với 1.5 lít nước ấm uống hằng ngày giúp kích thích hệ trao đổi chất, đẩy nhanh quá trình tiêu mỡ và giữ cho làn da luôn mịn màng.',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
      'Dược sĩ Thu Trang',
      4,
      false,
      new Date('2026-08-08T10:00:00Z'),
      new Date(),
      ['f3000000-0000-4000-8000-000000000001'],
    ),
  ];

  private readonly combos: Combo[] = [
    new Combo(
      'cb100000-0000-4000-8000-000000000001',
      'Combo Chay Giảm Cân & Siết Mỡ',
      'combo-chay-giam-can-siet-mo',
      'WEIGHT_LOSS',
      'Bộ giải pháp ăn chay giảm cân 7 ngày gồm Gạo lứt đỏ ST25, Yến mạch nổ hông, Đậu đen xanh lòng, Hạt chia và Trà gạo lứt detox. Giúp no lâu, tiêu mỡ bụng và giữ dáng thon gọn.',
      'Combo Chay Giảm Cân & Siết Mỡ GreenPantry được thiết kế chuyên biệt dựa trên nguyên lý chỉ số đường huyết GI thấp và giàu chất xơ hòa tan. Tập trung đốt cháy mỡ thừa tự nhiên, thanh lọc cơ thể mà không gây mệt mỏi hay mất sức.',
      420000,
      349000,
      71000,
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80',
      [
        { day: 1, title: 'Ngày 1: Tiêu mỡ & Khởi động', tasks: ['Sáng: 1 bát yến mạch ngâm sữa chua + 1 thìa hạt chia', 'Trưa: 1 bát cơm gạo lứt ST25 + Đậu hũ luộc + Salad rau', 'Tối: 1 ly trà gạo lứt đậu đỏ detox + Nộm rau mầm'] },
        { day: 2, title: 'Ngày 2: Thanh lọc đường ruột', tasks: ['Sáng: 1 ly bột sắn dây hoa lài mát gan', 'Trưa: 1.5 bát cơm gạo lứt ST25 + Nấm xào + Rau luộc', 'Tối: 1 bát cháo yến mạch đậu đen xanh lòng'] },
        { day: 3, title: 'Ngày 3: Siết mỡ tăng tốc', tasks: ['Sáng: Yến mạch cán tươi nấu với hạt chia', 'Trưa: 1 bát cơm gạo lứt ST25 + Đậu phụ kho tộ + Canh bí đỏ', 'Tối: Uống 500ml trà gạo lứt đậu đỏ búp ổi'] },
        { day: 4, title: 'Ngày 4: Xả độc cơ thể', tasks: ['Sáng: 1 ly bột sắn dây ướp hoa lài nhẹ bụng', 'Trưa: 1 bát cơm gạo lứt đỏ ST25 + Nấm xào sả ớt', 'Tối: Salad ngũ sắc mix hạt chia'] },
        { day: 5, title: 'Ngày 5: Phục hồi năng lượng', tasks: ['Sáng: Smoothie yến mạch chuối + Hạt chia', 'Trưa: 1.5 bát cơm gạo lứt ST25 + Canh rau ngót', 'Tối: Nước trà gạo lứt đậu đỏ nhẹ dạ'] },
        { day: 6, title: 'Ngày 6: Đốt mỡ chuyên sâu', tasks: ['Sáng: Yến mạch nổ hông ngâm sữa chua', 'Trưa: Cơm gạo lứt ST25 + Đậu phụ rán ngố + Rau mầm', 'Tối: Súp yến mạch rau củ'] },
        { day: 7, title: 'Ngày 7: Tổng kết & Duy trì', tasks: ['Sáng: 1 ly bột sắn dây hoa lài', 'Trưa: Cơm gạo lứt đỏ ST25 + Nấm đùi gà nướng', 'Tối: Trà thảo mộc gạo lứt đậu đỏ kết thúc tuần'] }
      ],
      true,
      [
        new ComboItem('cbi-1', 'cb100000-0000-4000-8000-000000000001', 'f1000000-0000-4000-8000-000000000001', 2, 85000),
        new ComboItem('cbi-2', 'cb100000-0000-4000-8000-000000000001', 'f1000000-0000-4000-8000-000000000002', 1, 65000),
        new ComboItem('cbi-3', 'cb100000-0000-4000-8000-000000000001', 'f3000000-0000-4000-8000-000000000001', 1, 95000),
        new ComboItem('cbi-4', 'cb100000-0000-4000-8000-000000000001', 'f4000000-0000-4000-8000-000000000001', 1, 110000),
      ]
    ),
    new Combo(
      'cb200000-0000-4000-8000-000000000002',
      'Combo Chay Tăng Cân & High-Protein',
      'combo-chay-tang-can-high-protein',
      'WEIGHT_GAIN',
      'Giải pháp bổ sung Protein & Calo thuần chay cho người muốn tăng cân lành mạnh, dồi dào năng lượng với Bột ngũ cốc 25 loại hạt, Granola, Hạt điều sấy và Yến mạch.',
      'Bộ Combo thiết kế cho người ăn chay bị gầy, mệt mỏi hoặc tập luyện gym/sports cần đạm thực vật. Giúp hấp thu dinh dưỡng tối đa, xây dựng cơ bắp săn chắc.',
      580000,
      489000,
      91000,
      'https://images.unsplash.com/photo-1509358271058-acd01cc9386a?auto=format&fit=crop&w=1000&q=80',
      [
        { day: 1, title: 'Ngày 1: Nạp Calo Chất Lượng', tasks: ['Sáng: 1 ly bột ngũ cốc High-Protein + 2 lát bánh mì yến mạch', 'Phụ sáng: 30g Granola nướng mật ong', 'Trưa: Cơm gạo lứt + Đậu phụ kho nấm', 'Tối: Smoothie hạt điều + Yến mạch'] },
        { day: 2, title: 'Ngày 2: Tăng Cường Đạm Thực Vật', tasks: ['Sáng: Cháo yến mạch hạt điều ngậy béo', 'Phụ chiều: 1 ly bột ngũ cốc dinh dưỡng', 'Trưa: Cơm gạo lứt + Canh đậu phộng', 'Tối: Granola trộn sữa hạt'] }
      ],
      true,
      [
        new ComboItem('cbi-5', 'cb200000-0000-4000-8000-000000000002', 'f2000000-0000-4000-8000-000000000001', 1, 145000),
        new ComboItem('cbi-6', 'cb200000-0000-4000-8000-000000000002', 'f2000000-0000-4000-8000-000000000002', 2, 165000),
        new ComboItem('cbi-7', 'cb200000-0000-4000-8000-000000000002', 'f1000000-0000-4000-8000-000000000002', 1, 65000),
      ]
    ),
    new Combo(
      'cb300000-0000-4000-8000-000000000003',
      'Combo Sức Khỏe Chay & Dưỡng Sinh Trẻ Hóa',
      'combo-suc-khoe-chay-duong-sinh',
      'HEALTH',
      'Bộ thực dưỡng cao cấp gồm Trà hoa cúc San Tuyết, Trà gạo lứt đậu đỏ, Bột sắn dây ta ướp hoa lài và Gạo lứt ST25. An thần, bồi bổ tâm trí, trẻ hóa da.',
      'Sự kết hợp hoàn hảo giữa đông y dưỡng sinh Ohsawa và thảo mộc tự nhiên. Phù hợp cho người ăn chay trường, người trung niên cần ngủ ngon, thanh nhiệt hạ hỏa.',
      510000,
      429000,
      81000,
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
      [
        { day: 1, title: 'Ngày 1: An Thần & Hạ Hỏa', tasks: ['Sáng: 1 ly bột sắn dây ướp hoa lài ấm', 'Trưa: Cơm gạo lứt dẻo thơm + Canh bí xanh nấm', 'Tối: 1 ấm Trà hoa cúc San Tuyết trước khi ngủ 30 phút'] }
      ],
      true,
      [
        new ComboItem('cbi-8', 'cb300000-0000-4000-8000-000000000003', 'f3000000-0000-4000-8000-000000000002', 1, 120000),
        new ComboItem('cbi-9', 'cb300000-0000-4000-8000-000000000003', 'f3000000-0000-4000-8000-000000000001', 1, 95000),
        new ComboItem('cbi-10', 'cb300000-0000-4000-8000-000000000003', 'f4000000-0000-4000-8000-000000000001', 1, 110000),
        new ComboItem('cbi-11', 'cb300000-0000-4000-8000-000000000003', 'f1000000-0000-4000-8000-000000000001', 2, 85000),
      ]
    ),
    new Combo(
      'cb400000-0000-4000-8000-000000000004',
      'Combo Chay Văn Phòng Nhanh & Gọn',
      'combo-chay-van-phong-nhanh-gon',
      'OFFICE',
      'Gói thực phẩm chay ăn liền & pha uống siêu nhanh tại bàn làm việc: Granola nướng mật ong, Hạt điều sấy, Trà gạo lứt và Yến mạch cán tươi.',
      'Tiện lợi, không tốn thời gian chế biến, cung cấp năng lượng tỉnh táo cả ngày làm việc mà không lo tích mỡ thừa.',
      360000,
      299000,
      61000,
      'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1000&q=80',
      [],
      true,
      [
        new ComboItem('cbi-12', 'cb400000-0000-4000-8000-000000000004', 'f2000000-0000-4000-8000-000000000002', 1, 165000),
        new ComboItem('cbi-13', 'cb400000-0000-4000-8000-000000000004', 'f2000000-0000-4000-8000-000000000001', 1, 145000),
        new ComboItem('cbi-14', 'cb400000-0000-4000-8000-000000000004', 'f1000000-0000-4000-8000-000000000002', 1, 65000),
      ]
    ),
    new Combo(
      'cb500000-0000-4000-8000-000000000005',
      'Combo Chay Gia Đình & Bếp Xanh',
      'combo-chay-gia-dinh-bep-xanh',
      'FAMILY',
      'Gói nhu yếu phẩm chay dinh dưỡng cho cả gia đình: Gạo lứt ST25 (3kg), Hạt điều, Yến mạch, Bột sắn dây và Trà thảo mộc dưỡng sinh.',
      'Lựa chọn hoàn hảo cho các bữa ăn chay rằm, mùng một hoặc chế độ ăn xanh hàng tuần cho cả nhà.',
      750000,
      629000,
      121000,
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
      [],
      true,
      [
        new ComboItem('cbi-15', 'cb500000-0000-4000-8000-000000000005', 'f1000000-0000-4000-8000-000000000001', 3, 85000),
        new ComboItem('cbi-16', 'cb500000-0000-4000-8000-000000000005', 'f2000000-0000-4000-8000-000000000001', 2, 145000),
        new ComboItem('cbi-17', 'cb500000-0000-4000-8000-000000000005', 'f4000000-0000-4000-8000-000000000001', 1, 110000),
        new ComboItem('cbi-18', 'cb500000-0000-4000-8000-000000000005', 'f3000000-0000-4000-8000-000000000001', 1, 95000),
      ]
    ),
  ];

  private readonly questions: Question[] = [];

  private readonly orders: Order[] = [];

  private readonly reviews: Review[] = [];

  private readonly adminUsers: AdminUser[] = [
    new AdminUser(
      'usr_super_admin',
      'admin@greenpantry.vn',
      bcrypt.hashSync('Admin@123456', 10),
      'Super Admin',
      AdminRole.SUPER_ADMIN,
      true,
      new Date(),
      new Date(),
    ),
    new AdminUser(
      'usr_store_manager',
      'manager@greenpantry.vn',
      bcrypt.hashSync('Admin@123456', 10),
      'Nguyễn Văn Trưởng Kho',
      AdminRole.STORE_MANAGER,
      true,
      new Date(),
      new Date(),
    ),
  ];

  getCategories(): Category[] {
    return this.categories;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getCombos(): Combo[] {
    return this.combos;
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

  getAdminUsers(): AdminUser[] {
    return this.adminUsers;
  }
}

