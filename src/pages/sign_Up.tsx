import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/validators/auth';
import { z } from 'zod';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Dot } from 'lucide-react';
import SignUpLayout from '@/components/signUp/signUpLayout';
import FirstMotiondiv from '@/components/signUp/firstMotiondiv';
import SecondMotiondiv from '@/components/signUp/secondMotiondiv';
import ThirdMotiondiv from '@/components/signUp/thirdMotiondiv';
import type { Control } from 'react-hook-form';
//import { usePostApi } from '@/mocks/api';
import { data } from '@/mocks/data/meberResultData';
export type RegisterInput = z.infer<typeof registerSchema>;

export interface MotiondivPropType {
  step: number;
  formControlProp: Control<RegisterInput>;
}

export default function SignUp() {
  const [step, setStep] = useState<number>(0);
  const { toast } = useToast();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: '',
      userId: '',
      email: '',
      role: '',
      username: '',
      birth: new Date(),
      password: '',
      confirmPassword: '',
    },
  });
  const beforeButtonHandler = () => {
    if (step === 2) {
      setStep(1);
    } else {
      setStep(0);
    }
  };
  const nextButtonHandler = () => {
    if (step === 0) {
      form.trigger(['phone', 'email', 'username', 'userId']);
      const phoneState = form.getFieldState('phone');
      const emailState = form.getFieldState('email');
      const usernameState = form.getFieldState('username');
      const idState = form.getFieldState('userId');

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
  };
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
    //postData(data);
  }

  // 페이지 네비게이션을 위해 색깔이 달라지는 Dot을 추가했습니다.
  const dotElements = [0, 1, 2].map((dot, index) => {
    const dotStyle = {
      color: step === dot ? '#f97316' : 'black',
    };

    return <Dot key={index} {...dotStyle} />;
  });
  return (
    <div className="flex items-center gap-[350px]">
      <SignUpLayout />
      <div className="grid">
        <Card className={cn('w-[380px] -translate-y-10')}>
          <CardHeader>
            <CardTitle>계정을 생성합니다</CardTitle>
            <CardDescription>필수 정보를 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-3 overflow-x-hidden">
                <FirstMotiondiv step={step} formControlProp={form.control} />
                <SecondMotiondiv step={step} formControlProp={form.control} />
                <ThirdMotiondiv step={step} formControlProp={form.control} />
                <div className={'flex justify-center gap-2'}>
                  <Button
                    type="button"
                    variant={'ghost'}
                    className={cn({ hidden: step === 0 })}
                    onClick={beforeButtonHandler}>
                    이전 단계로
                  </Button>
                  <Button type="button" className={cn({ hidden: step === 2 })} onClick={nextButtonHandler}>
                    다음 단계로
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button className={cn({ hidden: step === 0 || step === 1 })} type="submit">
                    계정 등록하기
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="flex items-center justify-center -translate-y-6  -translate-x-4 gap-[10px]">{dotElements}</div>
      </div>
    </div>
  );
}
