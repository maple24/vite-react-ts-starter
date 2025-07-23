import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ id: 1, name: 'John Doe', email: 'john@example.com' })
  }),

  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ])
  }),

  http.post('/api/users', async ({ request }) => {
    const user = await request.json() as Record<string, unknown>
    return HttpResponse.json({ id: Date.now(), ...user }, { status: 201 })
  }),
]
