import { rest } from 'msw';
import { memberResultData } from './data/meberResultData';
import { RegisterInput } from '../pages/sign_up';

export interface dataType extends RegisterInput {
  memberResultData: {};
  users: [
    { phone: string; userId: string; email: string; role: string; username: string; birth: Date; password: string },
  ];
}
export const handlers = [
  rest.get<dataType>('http://localhost:3000/data', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(memberResultData));
  }),
  rest.post<dataType>('http://localhost:3000/data', (req, res, ctx) => {
    const newDataBody = req.body;
    const newUserId = memberResultData.users.length + 1;
    const newDataWithId = { id: newUserId, ...newDataBody };
    memberResultData.users.push(newDataWithId);
    return res(ctx.status(200), ctx.json(memberResultData));
  }),
];
