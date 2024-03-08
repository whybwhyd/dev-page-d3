import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
//import { useApi } from '@/mocks/api';
import type { MotiondivPropType } from '@/pages/sign_up';
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { data } from '@/mocks/data/meberResultData';

export default function FirstMotiondiv(props: MotiondivPropType) {
  const { step, formControlProp } = props;
  //const { data } = useApi();
  const [isDoubleId, SetIdDoubleId] = useState(false);
  const duplicateCheckHandler = (id: string) => {
    // 중복 검사
    const isDuplicated = data?.users?.some((user) => user.userId === id);

    if (isDuplicated) {
      SetIdDoubleId(true);
    } else {
      SetIdDoubleId(false);
    }
  };
  return (
    <motion.div
      className={cn('space-y-3')}
      animate={{ translateX: `${step * -100}%` }}
      transition={{ ease: 'easeInOut' }}>
      <FormField
        control={formControlProp}
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
          control={formControlProp}
          name="userId"
          render={({ field }) => (
            <div>
              <FormItem>
                <FormLabel>아이디</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="helloWorld" {...field} />
                  </FormControl>
                  {field.value.trim() && field.value.length >= 4 && field.value.length <= 20 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          onClick={() => duplicateCheckHandler(field.value)}
                          className="absolute top-0 bottom-0 right-5 text-sm">
                          중복확인
                        </button>
                      </PopoverTrigger>
                      {!isDoubleId && (
                        <PopoverContent className="flex w-80">
                          <Check color="green" />
                          사용 가능한 아이디입니다.
                        </PopoverContent>
                      )}
                      {isDoubleId && (
                        <PopoverContent className="flex w-80">
                          <X color="red" />
                          중복된 아이디입니다.
                        </PopoverContent>
                      )}
                    </Popover>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
      </div>
      <FormField
        control={formControlProp}
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
        control={formControlProp}
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
  );
}
