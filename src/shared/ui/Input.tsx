import type { InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils';

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof InputVariants>;

const InputVariants = cva('w-full focus:outline-none', {
  variants: {
    intent: {
      login: 'rounded-md border-[1px] border-[#ADADAD]',
      primary: '',
    },
    size: {
      fit: 'w-full h-fit text-lg',
      sm: '',
      md: '',
      lg: 'w-full h-14 px-6 py-4',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'lg',
  },
});

export default function Input({
  intent,
  className,
  size,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(InputVariants({ intent, size }), className)}
      {...props}
    />
  );
}
