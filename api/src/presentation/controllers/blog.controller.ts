import { Controller, Get, Param, Query, NotFoundException, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { GetBlogPostsUseCase } from '@application/use-cases/content/get-blog-posts.use-case';
import { GetBlogPostDetailUseCase } from '@application/use-cases/content/get-blog-post-detail.use-case';

export class GetBlogPostsQueryDto {
  @ApiPropertyOptional({ description: 'Blog Category ID' })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 20;
}

@ApiTags('Content')
@Controller('blog')
export class BlogController {
  constructor(
    @Inject('GetBlogPostsUseCase') private readonly getBlogPostsUseCase: GetBlogPostsUseCase,
    @Inject('GetBlogPostDetailUseCase') private readonly getBlogPostDetailUseCase: GetBlogPostDetailUseCase,
  ) {}

  @Get('posts')
  @ApiOperation({ summary: 'Lấy danh sách bài viết Blog dinh dưỡng & healthy living' })
  @ApiResponse({ status: 200, description: 'Danh sách bài viết' })
  async getPosts(@Query() query: GetBlogPostsQueryDto) {
    return this.getBlogPostsUseCase.execute(query);
  }

  @Get('posts/:slug')
  @ApiOperation({ summary: 'Lấy chi tiết bài viết Blog đính kèm danh sách sản phẩm liên quan (Content Commerce)' })
  @ApiResponse({ status: 200, description: 'Chi tiết bài viết và relatedProducts' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bài viết' })
  async getPostDetail(@Param('slug') slug: string) {
    const result = await this.getBlogPostDetailUseCase.execute(slug);
    if (!result) {
      throw new NotFoundException('Không tìm thấy bài viết.');
    }
    return result;
  }
}
