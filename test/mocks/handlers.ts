import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        id: req.params.id,
        username: 'testuser',
      })
    );
  }),

  rest.post('/api/users', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.status(201),
      ctx.json({
        id: '123',
        ...body,
      })
    );
  }),
];
