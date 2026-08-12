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

  let authHeader: Record<string, string> = {};
  if (typeof window !== 'undefined') {
    try {
      const customerAuthStorage = localStorage.getItem('greenpantry_customer_auth');
      const adminAuthStorage = localStorage.getItem('greenpantry_admin_auth');

      let token: string | undefined;
      if (customerAuthStorage) {
        const parsed = JSON.parse(customerAuthStorage);
        token = parsed?.state?.token;
      }
      if (!token && adminAuthStorage) {
        const parsed = JSON.parse(adminAuthStorage);
        token = parsed?.state?.token;
      }

      if (token) {
        authHeader = { Authorization: `Bearer ${token}` };
      }
    } catch {
      // Ignore JSON parse error
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    ...authHeader,
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

export async function uploadMedia(file: File): Promise<{ url: string; publicId: string }> {
  const url = `${API_BASE_URL}/media/upload`;

  let authHeader: Record<string, string> = {};
  if (typeof window !== 'undefined') {
    try {
      const authStorage = localStorage.getItem('greenpantry_admin_auth');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        if (parsed?.state?.token) {
          authHeader = { Authorization: `Bearer ${parsed.state.token}` };
        }
      }
    } catch {
      // Ignore
    }
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(url, {
    method: 'POST',
    headers: authHeader,
    body: formData,
  });

  if (!response.ok) {
    let errorMsg = `Upload ảnh thất bại (HTTP ${response.status})`;
    try {
      const err = await response.json();
      if (typeof err.message === 'string') {
        errorMsg = err.message;
      } else if (Array.isArray(err.message)) {
        errorMsg = err.message.join(', ');
      } else if (err.error) {
        errorMsg = typeof err.error === 'string' ? err.error : JSON.stringify(err.error);
      }
    } catch {}
    throw new APIError(response.status, errorMsg);
  }

  return response.json();
}

