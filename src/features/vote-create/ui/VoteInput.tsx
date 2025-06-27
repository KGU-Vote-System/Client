import { cn } from '@/shared/utils';
import { useState, type InputHTMLAttributes } from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

type VoteInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> & {
  value?: string;
};

export default function VoteInput({ value, ...rest }: VoteInputProps) {
  const [enterDone, setEnterDone] = useState<boolean>(false);

  const handleComplete = () => {
    if (value && value.trim().length > 0) {
      setEnterDone(true);
    }
  };

  return (
    <div
      className={cn(
        enterDone ? 'shadow-voteCreateItem border-ml text-m' : 'border-sl',
        'relative w-full rounded-md border-[1px]',
      )}
    >
      <input
        className="flex h-17 w-full items-center justify-between px-5 font-normal placeholder:text-[#999] focus:outline-none"
        {...rest}
        onBlur={handleComplete}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleComplete();
          }
        }}
      />
      {enterDone ? (
        <div className="bg-ml absolute top-5.5 right-5 mb-1.5 grid size-6 place-items-center rounded-full transition duration-150">
          <FaCheck className="text-white" size={14} />
        </div>
      ) : (
        <button
          className="absolute top-1/2 right-5 size-fit -translate-y-1/2 transform cursor-pointer focus:outline-none"
          type="button"
        >
          <IoClose className="text-sl" size={20} />
        </button>
      )}
    </div>
  );
}
