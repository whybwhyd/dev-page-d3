import { z } from 'zod';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const phoneRegex = /^010\d{8}$/;

export const registerSchema = z.object({
  email: z
    .string()
    .nonempty({ message: '이메일은 필수 입력값입니다.' })
    .email({ message: '올바른 이메일을 입력해주세요.' }),
  phone: z
    .string()
    .nonempty({ message: '전화번호는 필수 입력값입니다.' })
    .min(11, '연락처는 11자리여야 합니다.')
    .max(11, '연락처는 11자리여야 합니다.')
    .refine((value) => phoneRegex.test(value), '010으로 시작하는 11자리 숫자를 입력해주세요'),

  username: z
    .string()
    .nonempty({ message: '이름은 필수 입력값입니다.' })
    .min(2, { message: '이름은 2글자 이상이어야 합니다.' })
    .max(100, { message: '이름은 100글자 이하이어야 합니다.' }),
  id: z
    .string()
    .nonempty({ message: '아이디는 필수 입력값입니다.' })
    .min(4, { message: '아이디는 4글자 이상이어야 합니다.' })
    .max(20, { message: '이름은 20글자 이하이어야 합니다.' }),
  role: z.string().min(2, { message: '역할을 선택해주세요.' }),
  birth: z.date(),
  password: z
    .string()
    .nonempty({ message: '비밀번호를 입력해주세요.' })
    .min(6, '비밀번호는 최소 6자리 이상이어야 합니다.')
    .max(100, '비밀번호는 100자리 이하이어야 합니다.')
    .refine(
      (value) => passwordRegex.test(value),
      '비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다.',
    ),
  confirmPassword: z
    .string()
    .nonempty({ message: '비밀번호를 입력해주세요.' })
    .min(6, '비밀번호는 최소 6자리 이상이어야 합니다.')
    .max(100, '비밀번호는 100자리 이하이어야 합니다.')
    .refine(
      (value) => passwordRegex.test(value),
      '비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다.',
    ),
});
export const loginSchema = z.object({
  id: z
    .string()
    .nonempty({ message: '아이디는 필수 입력값입니다.' })
    .min(4, { message: '아이디는 4글자 이상이어야 합니다.' })
    .max(20, { message: '이름은 20글자 이하이어야 합니다.' }),
  password: z
    .string()
    .nonempty({ message: '비밀번호를 입력해주세요.' })
    .min(6, '비밀번호는 최소 6자리 이상이어야 합니다.')
    .max(100, '비밀번호는 100자리 이하이어야 합니다.')
    .refine(
      (value) => passwordRegex.test(value),
      '비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다.',
    ),
  idCheck: z.boolean().default(false).optional(),
});
