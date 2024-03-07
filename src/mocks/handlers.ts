// import { HttpResponse, http } from 'msw';

// const members = [];

// export const handler = [

//   // 회원가입 API
//   http.post('/api/join', async ({ request }) => {
//     const data = await request.json();

//     members.push(data);

//     return new HttpResponse(null, { status: 201 });
//   }),

//   // 로그인 API
//   http.post('/api/login', async ({ request }) => {
//     const data = await request.json():

//     for (const member of members) {
//       if (data.email === member.email && data.password === member.password) {
//         return new HttpResponse(null, {
//           status: 200,
//           headers: {
//             'Set-Cookie': `token=1`,
//           },
//         });
//       }
//     }

//     return new HttpResponse(null, { status: 404 });
//   }),
// ];
