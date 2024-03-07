import { rest } from 'msw';

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/todos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(['먹기', '자기', '놀기']));
  }),
];
