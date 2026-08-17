import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Infrastructure
import { SeederService } from './infrastructure/database/seeds/seeder.service';
import { ProductRepository } from './infrastructure/repositories/product.repository';
import { CategoryRepository } from './infrastructure/repositories/category.repository';
import { OrderRepository } from './infrastructure/repositories/order.repository';
import { ReviewRepository } from './infrastructure/repositories/review.repository';
import { BlogPostRepository } from './infrastructure/repositories/blog-post.repository';
import { QuestionRepository } from './infrastructure/repositories/question.repository';
import { AdminUserRepository } from './infrastructure/repositories/admin-user.repository';
import { CustomerTypeOrmRepository } from './infrastructure/repositories/customer.repository';
import { CustomerAddressTypeOrmRepository } from './infrastructure/repositories/customer-address.repository';
import { CustomerPointTransactionTypeOrmRepository } from './infrastructure/repositories/customer-point-transaction.repository';
import { JwtStrategy } from './infrastructure/auth/jwt.strategy';
import { CustomerJwtStrategy } from './infrastructure/auth/customer-jwt.strategy';

// ORM Entities
import { CategoryOrmEntity } from './infrastructure/database/entities/category.orm-entity';
import { ProductOrmEntity } from './infrastructure/database/entities/product.orm-entity';
import { OrderOrmEntity } from './infrastructure/database/entities/order.orm-entity';
import { OrderItemOrmEntity } from './infrastructure/database/entities/order-item.orm-entity';
import { ReviewOrmEntity } from './infrastructure/database/entities/review.orm-entity';
import { BlogPostOrmEntity } from './infrastructure/database/entities/blog-post.orm-entity';
import { QuestionOrmEntity, QuestionAnswerOrmEntity } from './infrastructure/database/entities/question.orm-entity';
import { AdminUserOrmEntity } from './infrastructure/database/entities/admin-user.orm-entity';
import { CustomerOrmEntity } from './infrastructure/database/entities/customer.orm-entity';
import { CustomerAddressOrmEntity } from './infrastructure/database/entities/customer-address.orm-entity';
import { CustomerPointTransactionOrmEntity } from './infrastructure/database/entities/customer-point-transaction.orm-entity';

// Use Cases - Catalog
import { GetProductsUseCase } from './application/use-cases/catalog/get-products.use-case';
import { GetProductDetailUseCase } from './application/use-cases/catalog/get-product-detail.use-case';
import { GetNewProductsUseCase } from './application/use-cases/catalog/get-new-products.use-case';
import { GetCategoriesUseCase } from './application/use-cases/catalog/get-categories.use-case';

// Use Cases - Commerce
import { CreateOrderUseCase } from './application/use-cases/commerce/create-order.use-case';
import { TrackOrderUseCase } from './application/use-cases/commerce/track-order.use-case';
import { CreateReviewUseCase } from './application/use-cases/commerce/create-review.use-case';

// Use Cases - Customer & Profile
import { RegisterCustomerUseCase } from './application/use-cases/customer-auth/register-customer.use-case';
import { LoginCustomerUseCase } from './application/use-cases/customer-auth/login-customer.use-case';
import { GetCustomerProfileUseCase } from './application/use-cases/customer-profile/get-customer-profile.use-case';
import { ManageCustomerAddressesUseCase } from './application/use-cases/customer-profile/manage-customer-addresses.use-case';
import { GetCustomerOrdersUseCase } from './application/use-cases/customer-profile/get-customer-orders.use-case';
import { GetCustomerPointsHistoryUseCase } from './application/use-cases/customer-profile/get-customer-points-history.use-case';
import { UpdateOrderAddressUseCase } from './application/use-cases/customer-profile/update-order-address.use-case';

// Use Cases - Content
import { GetBlogPostsUseCase } from './application/use-cases/content/get-blog-posts.use-case';
import { GetBlogPostDetailUseCase } from './application/use-cases/content/get-blog-post-detail.use-case';

// Use Cases - Community
import { GetQuestionsUseCase } from './application/use-cases/community/get-questions.use-case';
import { CreateQuestionUseCase } from './application/use-cases/community/create-question.use-case';

// Use Cases - Admin
import { GetAdminStatsUseCase } from './application/use-cases/admin/get-admin-stats.use-case';
import { CreateProductUseCase } from './application/use-cases/admin/create-product.use-case';
import { UpdateProductUseCase } from './application/use-cases/admin/update-product.use-case';
import { DeleteProductUseCase } from './application/use-cases/admin/delete-product.use-case';
import { GetAdminOrdersUseCase } from './application/use-cases/admin/get-admin-orders.use-case';
import { UpdateOrderStatusUseCase } from './application/use-cases/admin/update-order-status.use-case';
import { ManageBlogUseCase } from './application/use-cases/admin/manage-blog.use-case';
import { ModerateQuestionUseCase } from './application/use-cases/admin/moderate-question.use-case';
import { LoginAdminUseCase } from './application/use-cases/admin-auth/login-admin.use-case';
import { ManageAdminUsersUseCase } from './application/use-cases/admin-auth/manage-admin-users.use-case';
import { GetAdminCustomersUseCase } from './application/use-cases/admin/get-admin-customers.use-case';
import { UpdateCustomerStatusUseCase } from './application/use-cases/admin/update-customer-status.use-case';

// Controllers
import { ProductController } from './presentation/controllers/product.controller';
import { OrderController } from './presentation/controllers/order.controller';
import { ReviewController } from './presentation/controllers/review.controller';
import { BlogController } from './presentation/controllers/blog.controller';
import { QuestionController } from './presentation/controllers/question.controller';
import { AdminController } from './presentation/controllers/admin.controller';
import { AdminAuthController } from './presentation/controllers/admin-auth.controller';
import { AdminUserController } from './presentation/controllers/admin-user.controller';
import { CustomerAuthController } from './presentation/controllers/customer-auth.controller';
import { CustomerProfileController } from './presentation/controllers/customer-profile.controller';

import { MediaModule } from './infrastructure/media/media.module';

import { GoldTransactionOrmEntity } from './infrastructure/database/entities/gold-transaction.orm-entity';
import { CustomerWalletTypeOrmRepository } from './infrastructure/repositories/customer-wallet.repository';
import { GenerateTopupQrUseCase } from './application/use-cases/customer-wallet/generate-topup-qr.use-case';
import { GetGoldWalletUseCase } from './application/use-cases/customer-wallet/get-gold-wallet.use-case';
import { ApproveTopupUseCase } from './application/use-cases/admin/approve-topup.use-case';
import { CustomerWalletController } from './presentation/controllers/customer-wallet.controller';

import { StockMovementOrmEntity } from './infrastructure/database/entities/stock-movement.orm-entity';
import { StockMovementRepository } from './infrastructure/repositories/stock-movement.repository';
import { ImportInventoryUseCase } from './application/use-cases/admin/import-inventory.use-case';
import { GetInventoryLogsUseCase } from './application/use-cases/admin/get-inventory-logs.use-case';

import { AdministrativeUnitOrmEntity } from './infrastructure/database/entities/administrative-unit.orm-entity';
import { AdministrativeUnitController } from './presentation/controllers/administrative-unit.controller';

import { ChatbotController } from './presentation/controllers/chatbot.controller';
import { QueryChatbotUseCase } from './application/use-cases/chatbot/query-chatbot.use-case';

import { ComboOrmEntity } from './infrastructure/database/entities/combo.orm-entity';
import { ComboItemOrmEntity } from './infrastructure/database/entities/combo-item.orm-entity';
import { ComboTypeOrmRepository } from './infrastructure/repositories/combo.repository';
import { GetCombosUseCase } from './application/use-cases/catalog/get-combos.use-case';
import { GetComboDetailUseCase } from './application/use-cases/catalog/get-combo-detail.use-case';
import { ComboController } from './presentation/controllers/combo.controller';

const ormEntities = [
  CategoryOrmEntity,
  ProductOrmEntity,
  OrderOrmEntity,
  OrderItemOrmEntity,
  ReviewOrmEntity,
  BlogPostOrmEntity,
  QuestionOrmEntity,
  QuestionAnswerOrmEntity,
  AdminUserOrmEntity,
  CustomerOrmEntity,
  CustomerAddressOrmEntity,
  CustomerPointTransactionOrmEntity,
  GoldTransactionOrmEntity,
  StockMovementOrmEntity,
  AdministrativeUnitOrmEntity,
  ComboOrmEntity,
  ComboItemOrmEntity,
];

@Module({
  imports: [
    MediaModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'greenpantry_secret_jwt_key_2026',
      signOptions: { expiresIn: '7d' },
    }),
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
    ComboController,
    OrderController,
    ReviewController,
    BlogController,
    QuestionController,
    AdminController,
    AdminAuthController,
    AdminUserController,
    CustomerAuthController,
    CustomerProfileController,
    CustomerWalletController,
    AdministrativeUnitController,
    ChatbotController,
  ],
  providers: [
    SeederService,
    JwtStrategy,
    CustomerJwtStrategy,

    {
      provide: 'QueryChatbotUseCase',
      useFactory: (prodRepo: ProductRepository, blogRepo: BlogPostRepository) =>
        new QueryChatbotUseCase(prodRepo, blogRepo),
      inject: ['IProductRepository', 'IBlogPostRepository'],
    },

    // Repositories
    { provide: 'IProductRepository', useClass: ProductRepository },
    { provide: 'IComboRepository', useClass: ComboTypeOrmRepository },
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
    { provide: 'IOrderRepository', useClass: OrderRepository },
    { provide: 'IReviewRepository', useClass: ReviewRepository },
    { provide: 'IBlogPostRepository', useClass: BlogPostRepository },
    { provide: 'IQuestionRepository', useClass: QuestionRepository },
    { provide: 'IAdminUserRepository', useClass: AdminUserRepository },
    { provide: 'ICustomerRepository', useClass: CustomerTypeOrmRepository },
    { provide: 'ICustomerAddressRepository', useClass: CustomerAddressTypeOrmRepository },
    { provide: 'ICustomerPointTransactionRepository', useClass: CustomerPointTransactionTypeOrmRepository },
    { provide: 'ICustomerWalletRepository', useClass: CustomerWalletTypeOrmRepository },
    { provide: 'IStockMovementRepository', useClass: StockMovementRepository },

    // Inventory Use Cases
    {
      provide: ImportInventoryUseCase,
      useFactory: (prodRepo: ProductRepository, stockRepo: StockMovementRepository) =>
        new ImportInventoryUseCase(prodRepo, stockRepo),
      inject: ['IProductRepository', 'IStockMovementRepository'],
    },
    {
      provide: GetInventoryLogsUseCase,
      useFactory: (prodRepo: ProductRepository, stockRepo: StockMovementRepository) =>
        new GetInventoryLogsUseCase(prodRepo, stockRepo),
      inject: ['IProductRepository', 'IStockMovementRepository'],
    },

    // Customer Use Cases
    RegisterCustomerUseCase,
    LoginCustomerUseCase,
    GetCustomerProfileUseCase,
    ManageCustomerAddressesUseCase,
    GetCustomerOrdersUseCase,
    GetCustomerPointsHistoryUseCase,
    UpdateOrderAddressUseCase,
    GenerateTopupQrUseCase,
    GetGoldWalletUseCase,
    ApproveTopupUseCase,
    {
      provide: GetAdminCustomersUseCase,
      useFactory: (custRepo: CustomerTypeOrmRepository, orderRepo: OrderRepository) =>
        new GetAdminCustomersUseCase(custRepo, orderRepo),
      inject: ['ICustomerRepository', 'IOrderRepository'],
    },
    {
      provide: UpdateCustomerStatusUseCase,
      useFactory: (custRepo: CustomerTypeOrmRepository) => new UpdateCustomerStatusUseCase(custRepo),
      inject: ['ICustomerRepository'],
    },

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
    {
      provide: 'GetCombosUseCase',
      useFactory: (repo: ComboTypeOrmRepository) => new GetCombosUseCase(repo),
      inject: ['IComboRepository'],
    },
    {
      provide: 'GetComboDetailUseCase',
      useFactory: (repo: ComboTypeOrmRepository) => new GetComboDetailUseCase(repo),
      inject: ['IComboRepository'],
    },

    // Commerce Use Cases
    {
      provide: 'CreateOrderUseCase',
      useFactory: (
        orderRepo: OrderRepository,
        prodRepo: ProductRepository,
        custRepo: CustomerTypeOrmRepository,
        txRepo: CustomerPointTransactionTypeOrmRepository,
        walletRepo: CustomerWalletTypeOrmRepository,
        stockRepo: StockMovementRepository,
        addrRepo: CustomerAddressTypeOrmRepository,
      ) => new CreateOrderUseCase(orderRepo, prodRepo, custRepo, txRepo, walletRepo, stockRepo, addrRepo),
      inject: [
        'IOrderRepository',
        'IProductRepository',
        'ICustomerRepository',
        'ICustomerPointTransactionRepository',
        'ICustomerWalletRepository',
        'IStockMovementRepository',
        'ICustomerAddressRepository',
      ],
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

    // Admin Use Cases
    {
      provide: 'GetAdminStatsUseCase',
      useFactory: (orderRepo: OrderRepository, prodRepo: ProductRepository) =>
        new GetAdminStatsUseCase(orderRepo, prodRepo),
      inject: ['IOrderRepository', 'IProductRepository'],
    },
    {
      provide: 'CreateProductUseCase',
      useFactory: (prodRepo: ProductRepository) => new CreateProductUseCase(prodRepo),
      inject: ['IProductRepository'],
    },
    {
      provide: 'UpdateProductUseCase',
      useFactory: (prodRepo: ProductRepository) => new UpdateProductUseCase(prodRepo),
      inject: ['IProductRepository'],
    },
    {
      provide: 'DeleteProductUseCase',
      useFactory: (prodRepo: ProductRepository) => new DeleteProductUseCase(prodRepo),
      inject: ['IProductRepository'],
    },
    {
      provide: 'GetAdminOrdersUseCase',
      useFactory: (orderRepo: OrderRepository) => new GetAdminOrdersUseCase(orderRepo),
      inject: ['IOrderRepository'],
    },
    {
      provide: 'UpdateOrderStatusUseCase',
      useFactory: (
        orderRepo: OrderRepository,
        custRepo: CustomerTypeOrmRepository,
        txRepo: CustomerPointTransactionTypeOrmRepository,
        walletRepo: CustomerWalletTypeOrmRepository,
        prodRepo: ProductRepository,
        stockRepo: StockMovementRepository,
      ) => new UpdateOrderStatusUseCase(orderRepo, custRepo, txRepo, walletRepo, prodRepo, stockRepo),
      inject: [
        'IOrderRepository',
        'ICustomerRepository',
        'ICustomerPointTransactionRepository',
        'ICustomerWalletRepository',
        'IProductRepository',
        'IStockMovementRepository',
      ],
    },
    {
      provide: 'ManageBlogUseCase',
      useFactory: (blogRepo: BlogPostRepository) => new ManageBlogUseCase(blogRepo),
      inject: ['IBlogPostRepository'],
    },
    {
      provide: 'ModerateQuestionUseCase',
      useFactory: (qRepo: QuestionRepository) => new ModerateQuestionUseCase(qRepo),
      inject: ['IQuestionRepository'],
    },
    {
      provide: 'LoginAdminUseCase',
      useFactory: (userRepo: AdminUserRepository, jwtService: JwtService) =>
        new LoginAdminUseCase(userRepo, jwtService),
      inject: ['IAdminUserRepository', JwtService],
    },
    {
      provide: 'ManageAdminUsersUseCase',
      useFactory: (userRepo: AdminUserRepository) => new ManageAdminUsersUseCase(userRepo),
      inject: ['IAdminUserRepository'],
    },
  ],
})
export class AppModule {}
