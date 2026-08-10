import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private readonly cloudinaryInstance: any) {}

  async uploadFile(file: Express.Multer.File, folder = 'greenpantry'): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!file) {
      throw new BadRequestException('File không được để trống');
    }

    // Đảm bảo SDK Cloudinary luôn được nhận config từ biến môi trường
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new BadRequestException('Upload lên Cloudinary thất bại'));
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
