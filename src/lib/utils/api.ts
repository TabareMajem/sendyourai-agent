export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = new Error('API request failed');
    try {
      const data = await response.json();
      (error as any).details = data;
    } catch {
      // Ignore JSON parse errors
    }
    throw error;
  }

  return response.json();
}

export function handleAPIError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}