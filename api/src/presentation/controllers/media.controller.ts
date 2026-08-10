import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CloudinaryService } from '../../infrastructure/media/cloudinary.service';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload file ảnh lên Cloudinary CDN' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Upload ảnh thành công, trả về URL CDN' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn 1 file ảnh để upload');
    }
    const result = await this.cloudinaryService.uploadFile(file, 'greenpantry');
    return {
      statusCode: 201,
      message: 'Upload file lên Cloudinary thành công',
      url: (result as any).secure_url || (result as any).url,
      publicId: (result as any).public_id,
      format: (result as any).format,
      bytes: (result as any).bytes,
    };
  }
}
