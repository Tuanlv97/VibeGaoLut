import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { MediaController } from '../../presentation/controllers/media.controller';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  controllers: [MediaController],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class MediaModule {}
