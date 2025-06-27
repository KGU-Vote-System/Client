import { cn } from '@/shared/utils';
import type { ButtonHTMLAttributes } from 'react';
import { FaCheck } from 'react-icons/fa';
import {
  IoAdd,
  IoChevronDownSharp,
  IoChevronForwardSharp,
} from 'react-icons/io5';

interface VoteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  arrowDown?: boolean;
  done?: boolean;
  className?: string;
  plus?: boolean;
}

export default function VoteButton({
  plus = false,
  className,
  arrowDown = false,
  label,
  onClick,
  done = false,
  ...rest
}: VoteButtonProps) {
  return (
    <button
      name="mainCandidate"
      className={cn(
        className,
        done
          ? 'border-ml text-ml shadow-voteCreateItem'
          : 'border-sl text-[#999]',
        'relative flex h-17 w-full cursor-pointer items-center justify-between rounded-md border-[1px] px-5 font-normal focus:outline-none',
      )}
      onClick={onClick}
      {...rest}
    >
      {label}

      {done ? (
        <div className="bg-ml absolute top-5.5 right-5 mb-1.5 grid size-6 place-items-center rounded-full transition duration-150">
          <FaCheck className="text-white" size={14} />
        </div>
      ) : (
        <>
          {plus ? (
            <IoAdd size={20} className="text-sl" />
          ) : arrowDown ? (
            <IoChevronDownSharp size={20} className="text-sl" />
          ) : (
            <IoChevronForwardSharp size={20} className="text-sl" />
          )}
        </>
      )}
    </button>
  );
}
