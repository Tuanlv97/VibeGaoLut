import { describe, it, expect, vi, beforeEach } from 'vitest';
import { uploadMedia, APIError } from '../lib/api/client';

describe('Frontend Media API Client Unit Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should upload file successfully and return url and publicId', async () => {
    const mockResponse = {
      statusCode: 201,
      url: 'https://res.cloudinary.com/xoafh5vq/image/upload/v1234/test.png',
      publicId: 'greenpantry/test',
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as any);

    const mockFile = new File(['fake data'], 'test.png', { type: 'image/png' });
    const result = await uploadMedia(mockFile);

    expect(result.url).toBe('https://res.cloudinary.com/xoafh5vq/image/upload/v1234/test.png');
    expect(result.publicId).toBe('greenpantry/test');
  });

  it('should throw APIError when response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Vui lòng chọn 1 file ảnh hợp lệ' }),
    } as any);

    const mockFile = new File(['fake data'], 'test.png', { type: 'image/png' });

    await expect(uploadMedia(mockFile)).rejects.toThrow(APIError);
    await expect(uploadMedia(mockFile)).rejects.toThrow('Vui lòng chọn 1 file ảnh hợp lệ');
  });
});
