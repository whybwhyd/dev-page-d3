import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { MotiondivPropType } from '@/pages/sign_up';

export default function ThirdMotiondiv(props: MotiondivPropType) {
  const { step, formControlProp } = props;
  return (
    <motion.div
      className={cn('space-y-3 absolute top-0 left-0 right-0')}
      animate={{ translateX: `${(2 - step) * 100}%` }}
      style={{ translateX: `${(2 - step) * 100}%` }}
      transition={{
        ease: 'easeInOut',
      }}>
      <FormField
        control={formControlProp}
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
        control={formControlProp}
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
  );
}
