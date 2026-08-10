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
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeederService {
  private readonly categories: Category[] = [];

  private readonly products: Product[] = [];

  private readonly blogPosts: BlogPost[] = [];

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

