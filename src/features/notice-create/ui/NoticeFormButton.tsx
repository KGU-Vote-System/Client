import { cn } from '@/shared/utils';
import type { HTMLAttributes } from 'react';

interface NoticeFormButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  selected: boolean;
}

export default function NoticeFormButton({
  label,
  selected,
  onClick,
  ...rest
}: NoticeFormButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        selected ? 'text-m border-m' : 'border-sl text-s',
        'cursor-pointer rounded-md border-[1px] px-[14px] py-1 text-sm focus:outline-none',
      )}
      {...rest}
    >
      {label}
    </button>
  );
}
