import type { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils';

interface ButtonsProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  children?: React.ReactNode;
}

const ButtonVariants = cva(
  'rounded-md cursor-pointer font-medium focus:outline-none flex-shrink-0 hover:brightness-90 ',
  {
    variants: {
      intent: {
        primary: 'bg-md text-white',
        textmain: 'text-m',
        gradient: 'bg-gradient-to-r from-grad2 to-grad1 text-white',
        disabled: 'bg-[#F2F3F5] text-s',
        login: 'bg-[#1A1A1A] text-white font-medium',
        loginWhite: 'border-[1px] border-[#767676]',
        kakao: 'bg-[#FDE500] text-[#111]',
        home: 'bg-white/30 border-[1px] border-white text-white',
      },
      size: {
        fit: 'w-full h-fit text-lg',
        sm: '',
        md: 'w-full h-12 text-lg',
        lg: 'w-full h-14 text-xl',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'lg',
    },
  },
);

export default function Button({
  intent,
  size,
  children,
  className,
  ...props
}: ButtonsProps) {
  return (
    <button
      className={cn(ButtonVariants({ intent, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
