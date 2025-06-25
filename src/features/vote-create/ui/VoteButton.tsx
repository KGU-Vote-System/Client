import type { ButtonHTMLAttributes } from 'react';
import { IoChevronDownSharp, IoChevronForwardSharp } from 'react-icons/io5';

interface VoteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  arrowDown?: boolean;
}

export default function VoteButton({
  arrowDown = false,
  label,
  onClick,
  ...rest
}: VoteButtonProps) {
  return (
    <button
      name="mainCandidate"
      className="border-sl flex h-17 w-full cursor-pointer items-center justify-between rounded-md border-[1px] px-5 font-normal text-[#999] focus:outline-none"
      onClick={onClick}
      {...rest}
    >
      {label}
      {arrowDown ? (
        <IoChevronDownSharp size={20} className="text-sl" />
      ) : (
        <IoChevronForwardSharp size={20} className="text-sl" />
      )}
    </button>
  );
}
