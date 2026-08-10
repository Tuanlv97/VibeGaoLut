import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from './cloudinary.service';
import { MediaController } from '../../presentation/controllers/media.controller';
import { v2 as cloudinary } from 'cloudinary';

jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload_stream: jest.fn(),
    },
  },
}));

describe('Media & Cloudinary Module Unit Tests', () => {
  let service: CloudinaryService;
  let controller: MediaController;

  const mockFile: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'test.png',
    encoding: '7bit',
    mimetype: 'image/png',
    buffer: Buffer.from('fake image data'),
    size: 15,
    destination: '',
    filename: '',
    path: '',
    stream: null as any,
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [
        CloudinaryService,
        {
          provide: 'CLOUDINARY',
          useValue: {
            cloud_name: 'test_cloud',
            api_key: 'test_key',
            api_secret: 'test_secret',
          },
        },
      ],
    }).compile();

    service = module.get<CloudinaryService>(CloudinaryService);
    controller = module.get<MediaController>(MediaController);
  });

  describe('CloudinaryService', () => {
    it('should throw BadRequestException if no file is provided to service', async () => {
      await expect(service.uploadFile(null as any)).rejects.toThrow(BadRequestException);
    });

    it('should upload stream successfully and return secure_url', async () => {
      const mockResult = {
        secure_url: 'https://res.cloudinary.com/test_cloud/image/upload/v12345/greenpantry/test.png',
        public_id: 'greenpantry/test',
        format: 'png',
        bytes: 1024,
      };

      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation((options, callback) => {
        callback(null, mockResult);
        return {
          write: jest.fn(),
          end: jest.fn(),
        };
      });

      const result = await service.uploadFile(mockFile, 'greenpantry');
      expect(result).toEqual(mockResult);
    });

    it('should reject when cloudinary returns error', async () => {
      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation((options, callback) => {
        callback(new Error('Cloudinary stream error'), null);
        return {
          write: jest.fn(),
          end: jest.fn(),
        };
      });

      await expect(service.uploadFile(mockFile)).rejects.toThrow('Cloudinary stream error');
    });
  });

  describe('MediaController', () => {
    it('should throw BadRequestException if file is missing in controller', async () => {
      await expect(controller.uploadImage(null as any)).rejects.toThrow(BadRequestException);
    });

    it('should return 201 response payload when file is uploaded', async () => {
      const mockResult = {
        secure_url: 'https://res.cloudinary.com/test_cloud/image/upload/v12345/greenpantry/test.png',
        public_id: 'greenpantry/test',
        format: 'png',
        bytes: 1024,
      };

      jest.spyOn(service, 'uploadFile').mockResolvedValue(mockResult as any);

      const response = await controller.uploadImage(mockFile);

      expect(response).toEqual({
        statusCode: 201,
        message: 'Upload file lên Cloudinary thành công',
        url: 'https://res.cloudinary.com/test_cloud/image/upload/v12345/greenpantry/test.png',
        publicId: 'greenpantry/test',
        format: 'png',
        bytes: 1024,
      });
    });
  });
});
