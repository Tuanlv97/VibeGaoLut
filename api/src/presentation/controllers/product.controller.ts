import { Controller, Get, Param, Query, NotFoundException, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetProductsUseCase } from '@application/use-cases/catalog/get-products.use-case';
import { GetProductDetailUseCase } from '@application/use-cases/catalog/get-product-detail.use-case';
import { GetNewProductsUseCase } from '@application/use-cases/catalog/get-new-products.use-case';
import { GetCategoriesUseCase } from '@application/use-cases/catalog/get-categories.use-case';
import { GetProductsQueryDto } from '../dtos/get-products-query.dto';

@ApiTags('Catalog')
@Controller()
export class ProductController {
  constructor(
    @Inject('GetProductsUseCase') private readonly getProductsUseCase: GetProductsUseCase,
    @Inject('GetProductDetailUseCase') private readonly getProductDetailUseCase: GetProductDetailUseCase,
    @Inject('GetNewProductsUseCase') private readonly getNewProductsUseCase: GetNewProductsUseCase,
    @Inject('GetCategoriesUseCase') private readonly getCategoriesUseCase: GetCategoriesUseCase,
  ) {}

  @Get('products')
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm (Hỗ trợ Lọc, Tìm kiếm, Sắp xếp & Phân trang)' })
  @ApiResponse({ status: 200, description: 'Danh sách sản phẩm và tổng số lượng bản ghi' })
  async getProducts(@Query() query: GetProductsQueryDto) {
    return this.getProductsUseCase.execute(query);
  }

  @Get('products/new-arrivals')
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm mới (Hybrid Domain Rule)' })
  @ApiResponse({ status: 200, description: 'Danh sách sản phẩm mới (phát hành <= 30 ngày hoặc is_featured_new = true)' })
  async getNewArrivals() {
    return this.getNewProductsUseCase.execute();
  }

  @Get('products/:slug')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết sản phẩm theo Slug hoặc ID' })
  @ApiResponse({ status: 200, description: 'Chi tiết sản phẩm' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sản phẩm' })
  async getProductDetail(@Param('slug') slug: string) {
    const product = await this.getProductDetailUseCase.execute(slug);
    if (!product) {
      throw new NotFoundException('Không tìm thấy sản phẩm.');
    }
    return product;
  }

  @Get('categories')
  @ApiOperation({ summary: 'Lấy danh sách danh mục sản phẩm đang hoạt động' })
  @ApiResponse({ status: 200, description: 'Danh sách danh mục' })
  async getCategories() {
    return this.getCategoriesUseCase.execute();
  }
}
