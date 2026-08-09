const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export class APIError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status}`;
      try {
        const errorData = await response.json();
        if (typeof errorData.message === 'string') {
          errorMessage = errorData.message;
        } else if (Array.isArray(errorData.message)) {
          errorMessage = errorData.message.join(', ');
        }
      } catch {
        // Fallback to default errorMessage
      }
      throw new APIError(response.status, errorMessage);
    }

    return (await response.json()) as T;
  } catch (error: any) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(500, error.message || 'Không thể kết nối đến máy chủ.');
  }
}
