import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '@infrastructure/auth/roles.guard';
import { OrderStatus } from '@domain/enums/order-status.enum';
import { GetAdminStatsUseCase } from '@application/use-cases/admin/get-admin-stats.use-case';
import { CreateProductUseCase } from '@application/use-cases/admin/create-product.use-case';
import { UpdateProductUseCase } from '@application/use-cases/admin/update-product.use-case';
import { DeleteProductUseCase } from '@application/use-cases/admin/delete-product.use-case';
import { GetAdminOrdersUseCase } from '@application/use-cases/admin/get-admin-orders.use-case';
import { UpdateOrderStatusUseCase } from '@application/use-cases/admin/update-order-status.use-case';
import { ManageBlogUseCase } from '@application/use-cases/admin/manage-blog.use-case';
import { ModerateQuestionUseCase } from '@application/use-cases/admin/moderate-question.use-case';
import { GetBlogPostsUseCase } from '@application/use-cases/content/get-blog-posts.use-case';
import { GetQuestionsUseCase } from '@application/use-cases/community/get-questions.use-case';
import { ApproveTopupUseCase } from '@application/use-cases/admin/approve-topup.use-case';
import {
  CreateProductDto,
  UpdateProductDto,
  UpdateOrderStatusDto,
  CreateBlogPostDto,
  UpdateBlogPostDto,
  ModerateQuestionStatusDto,
  AnswerQuestionDto,
} from '../dtos/admin.dto';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(
    @Inject('GetAdminStatsUseCase') private readonly getAdminStatsUseCase: GetAdminStatsUseCase,
    @Inject('CreateProductUseCase') private readonly createProductUseCase: CreateProductUseCase,
    @Inject('UpdateProductUseCase') private readonly updateProductUseCase: UpdateProductUseCase,
    @Inject('DeleteProductUseCase') private readonly deleteProductUseCase: DeleteProductUseCase,
    @Inject('GetAdminOrdersUseCase') private readonly getAdminOrdersUseCase: GetAdminOrdersUseCase,
    @Inject('UpdateOrderStatusUseCase') private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase,
    @Inject('ManageBlogUseCase') private readonly manageBlogUseCase: ManageBlogUseCase,
    @Inject('ModerateQuestionUseCase') private readonly moderateQuestionUseCase: ModerateQuestionUseCase,
    @Inject('GetBlogPostsUseCase') private readonly getBlogPostsUseCase: GetBlogPostsUseCase,
    @Inject('GetQuestionsUseCase') private readonly getQuestionsUseCase: GetQuestionsUseCase,
    private readonly approveTopupUseCase: ApproveTopupUseCase,
  ) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get Admin KPI Dashboard Stats' })
  @ApiResponse({ status: 200, description: 'KPI stats metrics object.' })
  async getStats() {
    return await this.getAdminStatsUseCase.execute();
  }

  @Get('wallet/topups')
  @ApiOperation({ summary: 'Lấy danh sách yêu cầu nạp tiền VietQR đang chờ duyệt' })
  async getPendingTopups() {
    return await this.approveTopupUseCase.getPendingTopups();
  }

  @Patch('wallet/topups/:id/approve')
  @ApiOperation({ summary: 'Duyệt hoặc từ chối yêu cầu nạp tiền VietQR' })
  async approveTopup(@Param('id') id: string, @Body() body: { action: 'APPROVE' | 'REJECT' }) {
    return await this.approveTopupUseCase.execute(id, body.action || 'APPROVE');
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get all guest orders for Admin' })
  @ApiResponse({ status: 200, description: 'List of all guest orders.' })
  async getOrders(@Query('status') status?: OrderStatus) {
    return await this.getAdminOrdersUseCase.execute(status);
  }

  @Patch('orders/:id/status')
  @ApiOperation({ summary: 'Update status of a guest order' })
  @ApiResponse({ status: 200, description: 'Updated order.' })
  async updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return await this.updateOrderStatusUseCase.execute(id, dto.status);
  }

  @Post('products')
  @ApiOperation({ summary: 'Create a new catalog product' })
  @ApiResponse({ status: 201, description: 'Newly created product.' })
  async createProduct(@Body() dto: CreateProductDto) {
    return await this.createProductUseCase.execute(dto);
  }

  @Put('products/:id')
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiResponse({ status: 200, description: 'Updated product.' })
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return await this.updateProductUseCase.execute({ id, ...dto });
  }

  @Delete('products/:id')
  @ApiOperation({ summary: 'Delete a catalog product' })
  @ApiResponse({ status: 200, description: 'Product deletion status.' })
  async deleteProduct(@Param('id') id: string) {
    const success = await this.deleteProductUseCase.execute(id);
    return { success, id };
  }

  @Get('blog')
  @ApiOperation({ summary: 'Get all blog articles for Admin' })
  @ApiResponse({ status: 200, description: 'List of blog articles.' })
  async getBlogPosts() {
    return await this.getBlogPostsUseCase.execute({ limit: 1000 });
  }

  @Post('blog')
  @ApiOperation({ summary: 'Create a new blog article' })
  @ApiResponse({ status: 201, description: 'Newly created blog article.' })
  async createBlogPost(@Body() dto: CreateBlogPostDto) {
    return await this.manageBlogUseCase.create(dto);
  }

  @Put('blog/:id')
  @ApiOperation({ summary: 'Update a blog article' })
  @ApiResponse({ status: 200, description: 'Updated blog article.' })
  async updateBlogPost(@Param('id') id: string, @Body() dto: UpdateBlogPostDto) {
    return await this.manageBlogUseCase.update({ id, ...dto });
  }

  @Delete('blog/:id')
  @ApiOperation({ summary: 'Delete a blog article' })
  @ApiResponse({ status: 200, description: 'Deletion status.' })
  async deleteBlogPost(@Param('id') id: string) {
    const success = await this.manageBlogUseCase.delete(id);
    return { success, id };
  }

  @Get('questions')
  @ApiOperation({ summary: 'Get all community Q&A items for Admin moderation' })
  @ApiResponse({ status: 200, description: 'List of Q&A items.' })
  async getQuestions() {
    return await this.getQuestionsUseCase.execute({});
  }

  @Patch('questions/:id/status')
  @ApiOperation({ summary: 'Update question moderation status (PENDING/APPROVED/REJECTED)' })
  @ApiResponse({ status: 200, description: 'Updated question.' })
  async updateQuestionStatus(@Param('id') id: string, @Body() dto: ModerateQuestionStatusDto) {
    return await this.moderateQuestionUseCase.updateStatus(id, dto.status);
  }

  @Post('questions/:id/answer')
  @ApiOperation({ summary: 'Post official nutritionist answer for a question' })
  @ApiResponse({ status: 200, description: 'Updated question with official answer.' })
  async answerQuestion(@Param('id') id: string, @Body() dto: AnswerQuestionDto) {
    return await this.moderateQuestionUseCase.answerQuestion(
      id,
      dto.content,
      dto.responderName,
      dto.approve ?? true,
    );
  }
}
