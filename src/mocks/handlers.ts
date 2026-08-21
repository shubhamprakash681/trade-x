import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock Login API
  http.post('http://localhost:8080/api/auth/login', async ({ request }) => {
    const body = await request.json();
    const credentials = typeof body === 'object' && body !== null ? body : {};
    const email = 'email' in credentials ? credentials.email : undefined;
    const password = 'password' in credentials ? credentials.password : undefined;

    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        user: {
          id: 1,
          email: 'test@example.com',
          fullName: 'Test User',
          roles: ['USER'],
          createdAt: new Date().toISOString(),
        },
      });
    }

    return HttpResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 401,
        error: 'Unauthorized',
        message: 'Invalid credentials',
        details: [],
      },
      { status: 401 }
    );
  }),
];
