import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import type { MotiondivPropType } from '@/pages/sign_up';

export default function SecondMotiondiv(props: MotiondivPropType) {
  const { step, formControlProp } = props;
  return (
    <motion.div
      className={cn('space-y-3 absolute top-0 left-0 right-0')}
      animate={{ translateX: `${(1 - step) * 100}%` }}
      style={{ translateX: `${(1 - step) * 100}%` }}
      transition={{
        ease: 'easeInOut',
      }}>
      <FormField
        control={formControlProp}
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
                    className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
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
        control={formControlProp}
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
  );
}
