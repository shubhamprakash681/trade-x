import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock Login API
  http.post('http://localhost:8080/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as any;

    if (body.email === 'test@example.com' && body.password === 'password123') {
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
