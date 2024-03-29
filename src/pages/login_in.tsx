import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validators/auth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
//import { useApi } from '@/mocks/api';
import { data } from '@/mocks/data/meberResultData';

import { useToast } from '@/components/ui/use-toast';

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginIn() {
  const { toast } = useToast();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userId: '',
      password: '',
      idCheck: false,
    },
  });

  const onSubmit = (formData: LoginInput) => {
    const userCheck = data?.users?.some((user) => {
      return user.userId === formData.userId && user.password === formData.password;
    });
    if (userCheck) {
      console.log(formData);
      toast({ description: '성공' });
    }
    if (!userCheck) {
      toast({ description: '실패' });
    }
  };
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 m-0">
      <Card className={cn('w-[380px] -translate-y-10')}>
        <CardHeader>
          <CardTitle>로그인을 해주세요</CardTitle>
          <CardDescription>필수 정보를 입력해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>아이디</FormLabel>
                    <FormControl>
                      <Input placeholder="ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input type={'password'} placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idCheck"
                render={({ field }) => (
                  <FormItem className="flex mt-[5px] mb-[40px]">
                    <FormControl>
                      <Checkbox
                        id="idCheck"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="m-[8px]"
                      />
                    </FormControl>
                    <div className="flex gap-[50px]">
                      <FormLabel>아이디 기억하기</FormLabel>
                      <FormLabel>아이디/비밀번호 찾기</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex gap-[30px]">
                <Button type="button" variant="outline" className="w-[150px]">
                  뒤로 가기
                </Button>
                <Button type="submit" className="w-[150px]">
                  로그인
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
