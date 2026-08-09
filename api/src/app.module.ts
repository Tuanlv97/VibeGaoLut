import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

// Infrastructure
import { SeederService } from './infrastructure/database/seeds/seeder.service';
import { ProductRepository } from './infrastructure/repositories/product.repository';
import { CategoryRepository } from './infrastructure/repositories/category.repository';
import { OrderRepository } from './infrastructure/repositories/order.repository';
import { ReviewRepository } from './infrastructure/repositories/review.repository';
import { BlogPostRepository } from './infrastructure/repositories/blog-post.repository';
import { QuestionRepository } from './infrastructure/repositories/question.repository';

// ORM Entities
import { CategoryOrmEntity } from './infrastructure/database/entities/category.orm-entity';
import { ProductOrmEntity } from './infrastructure/database/entities/product.orm-entity';
import { OrderOrmEntity } from './infrastructure/database/entities/order.orm-entity';
import { OrderItemOrmEntity } from './infrastructure/database/entities/order-item.orm-entity';
import { ReviewOrmEntity } from './infrastructure/database/entities/review.orm-entity';
import { BlogPostOrmEntity } from './infrastructure/database/entities/blog-post.orm-entity';
import { QuestionOrmEntity, QuestionAnswerOrmEntity } from './infrastructure/database/entities/question.orm-entity';

// Use Cases - Catalog
import { GetProductsUseCase } from './application/use-cases/catalog/get-products.use-case';
import { GetProductDetailUseCase } from './application/use-cases/catalog/get-product-detail.use-case';
import { GetNewProductsUseCase } from './application/use-cases/catalog/get-new-products.use-case';
import { GetCategoriesUseCase } from './application/use-cases/catalog/get-categories.use-case';

// Use Cases - Commerce
import { CreateOrderUseCase } from './application/use-cases/commerce/create-order.use-case';
import { TrackOrderUseCase } from './application/use-cases/commerce/track-order.use-case';
import { CreateReviewUseCase } from './application/use-cases/commerce/create-review.use-case';

// Use Cases - Content
import { GetBlogPostsUseCase } from './application/use-cases/content/get-blog-posts.use-case';
import { GetBlogPostDetailUseCase } from './application/use-cases/content/get-blog-post-detail.use-case';

// Use Cases - Community
import { GetQuestionsUseCase } from './application/use-cases/community/get-questions.use-case';
import { CreateQuestionUseCase } from './application/use-cases/community/create-question.use-case';

// Controllers
import { ProductController } from './presentation/controllers/product.controller';
import { OrderController } from './presentation/controllers/order.controller';
import { ReviewController } from './presentation/controllers/review.controller';
import { BlogController } from './presentation/controllers/blog.controller';
import { QuestionController } from './presentation/controllers/question.controller';

const ormEntities = [
  CategoryOrmEntity,
  ProductOrmEntity,
  OrderOrmEntity,
  OrderItemOrmEntity,
  ReviewOrmEntity,
  BlogPostOrmEntity,
  QuestionOrmEntity,
  QuestionAnswerOrmEntity,
];

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    ...(process.env.DB_HOST || process.env.DATABASE_URL
      ? [
          TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'postgrespassword',
            database: process.env.DB_NAME || 'greenpantry_db',
            entities: ormEntities,
            synchronize: true, // For development schema sync
          }),
          TypeOrmModule.forFeature(ormEntities),
        ]
      : []),
  ],
  controllers: [
    ProductController,
    OrderController,
    ReviewController,
    BlogController,
    QuestionController,
  ],
  providers: [
    SeederService,

    // Repositories
    { provide: 'IProductRepository', useClass: ProductRepository },
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
    { provide: 'IOrderRepository', useClass: OrderRepository },
    { provide: 'IReviewRepository', useClass: ReviewRepository },
    { provide: 'IBlogPostRepository', useClass: BlogPostRepository },
    { provide: 'IQuestionRepository', useClass: QuestionRepository },

    // Catalog Use Cases
    {
      provide: 'GetProductsUseCase',
      useFactory: (repo: ProductRepository) => new GetProductsUseCase(repo),
      inject: ['IProductRepository'],
    },
    {
      provide: 'GetProductDetailUseCase',
      useFactory: (repo: ProductRepository) => new GetProductDetailUseCase(repo),
      inject: ['IProductRepository'],
    },
    {
      provide: 'GetNewProductsUseCase',
      useFactory: (repo: ProductRepository) => new GetNewProductsUseCase(repo),
      inject: ['IProductRepository'],
    },
    {
      provide: 'GetCategoriesUseCase',
      useFactory: (repo: CategoryRepository) => new GetCategoriesUseCase(repo),
      inject: ['ICategoryRepository'],
    },

    // Commerce Use Cases
    {
      provide: 'CreateOrderUseCase',
      useFactory: (orderRepo: OrderRepository, prodRepo: ProductRepository) =>
        new CreateOrderUseCase(orderRepo, prodRepo),
      inject: ['IOrderRepository', 'IProductRepository'],
    },
    {
      provide: 'TrackOrderUseCase',
      useFactory: (orderRepo: OrderRepository) => new TrackOrderUseCase(orderRepo),
      inject: ['IOrderRepository'],
    },
    {
      provide: 'CreateReviewUseCase',
      useFactory: (revRepo: ReviewRepository, orderRepo: OrderRepository) =>
        new CreateReviewUseCase(revRepo, orderRepo),
      inject: ['IReviewRepository', 'IOrderRepository'],
    },

    // Content Use Cases
    {
      provide: 'GetBlogPostsUseCase',
      useFactory: (blogRepo: BlogPostRepository) => new GetBlogPostsUseCase(blogRepo),
      inject: ['IBlogPostRepository'],
    },
    {
      provide: 'GetBlogPostDetailUseCase',
      useFactory: (blogRepo: BlogPostRepository, prodRepo: ProductRepository) =>
        new GetBlogPostDetailUseCase(blogRepo, prodRepo),
      inject: ['IBlogPostRepository', 'IProductRepository'],
    },

    // Community Use Cases
    {
      provide: 'GetQuestionsUseCase',
      useFactory: (qRepo: QuestionRepository) => new GetQuestionsUseCase(qRepo),
      inject: ['IQuestionRepository'],
    },
    {
      provide: 'CreateQuestionUseCase',
      useFactory: (qRepo: QuestionRepository) => new CreateQuestionUseCase(qRepo),
      inject: ['IQuestionRepository'],
    },
  ],
})
export class AppModule {}
