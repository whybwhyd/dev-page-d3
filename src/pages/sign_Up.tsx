import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/validators/auth';
import { z } from 'zod';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import Image from 'next/image';
import SignUpImage from '../../public/signUpImage.png';

type RegisterInput = z.infer<typeof registerSchema>;

export default function SignUp() {
  const [step, setStep] = useState<number>(0);

  const { toast } = useToast();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: '',
      id: '',
      email: '',
      role: '',
      username: '',
      birth: new Date(),
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(data: RegisterInput) {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast({
        title: '비밀번호가 일치하지 않습니다.',
        variant: 'destructive',
        duration: 1000,
      });
      return;
    }
    alert(JSON.stringify(data, null, 4));
  }

  return (
    <div className="flex items-center gap-[350px]">
      <Image className={cn('h-screen')} src={SignUpImage} alt="회원가입 페이지 이미지" />
      <Card className={cn('w-[380px] -translate-y-10')}>
        <CardHeader>
          <CardTitle>계정을 생성합니다</CardTitle>
          <CardDescription>필수 정보를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-3 overflow-x-hidden">
              <motion.div
                className={cn('space-y-3')}
                animate={{ translateX: `${step * -100}%` }}
                transition={{ ease: 'easeInOut' }}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <div>
                        <FormItem>
                          <FormLabel>아이디</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input placeholder="helloWorld" {...field} />
                            </FormControl>
                            <button
                              type="button"
                              onClick={() => console.log('중복확인')}
                              className="absolute top-0 bottom-0 right-5 text-sm">
                              중복확인
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input placeholder="hello@sparta-devcamp.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처</FormLabel>
                      <FormControl>
                        <Input placeholder="01012345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                className={cn('space-y-3 absolute top-0 left-0 right-0')}
                animate={{ translateX: `${(1 - step) * 100}%` }}
                style={{ translateX: `${(1 - step) * 100}%` }}
                transition={{
                  ease: 'easeInOut',
                }}>
                <FormField
                  control={form.control}
                  name="birth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>생일</FormLabel>
                      <br />
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}>
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date >= new Date() || date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>역할</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="역할을 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="관리자">관리자</SelectItem>
                          <SelectItem value="일반사용자">일반사용자</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                className={cn('space-y-3 absolute top-0 left-0 right-0')}
                animate={{ translateX: `${(2 - step) * 100}%` }}
                style={{ translateX: `${(2 - step) * 100}%` }}
                transition={{
                  ease: 'easeInOut',
                }}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input type={'password'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호 확인</FormLabel>
                      <FormControl>
                        <Input type={'password'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <div className={'flex gap-2'}>
                <Button className={cn({ hidden: step === 0 || step === 1 })} type="submit">
                  계정 등록하기
                </Button>
                <Button
                  type="button"
                  className={cn({ hidden: step === 2 })}
                  onClick={() => {
                    if (step === 0) {
                      form.trigger(['phone', 'email', 'username', 'id']);
                      const phoneState = form.getFieldState('phone');
                      const emailState = form.getFieldState('email');
                      const usernameState = form.getFieldState('username');
                      const idState = form.getFieldState('id');

                      if (!phoneState.isDirty || phoneState.invalid) return;
                      if (!emailState.isDirty || emailState.invalid) return;
                      if (!usernameState.isDirty || usernameState.invalid) return;
                      if (!idState.isDirty || idState.invalid) return;
                      setStep(1);
                    } else if (step === 1) {
                      form.trigger(['birth', 'role']);
                      const birthState = form.getFieldState('birth');
                      const roleState = form.getFieldState('role');

                      if (!birthState.isDirty || birthState.invalid) return;
                      if (!roleState.isDirty || roleState.invalid) return;
                      setStep(2);
                    }
                  }}>
                  다음 단계로
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  type="button"
                  variant={'ghost'}
                  className={cn({ hidden: step === 0 })}
                  onClick={() => {
                    if (step === 2) {
                      setStep(1);
                    } else {
                      setStep(0);
                    }
                  }}>
                  이전 단계로
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
