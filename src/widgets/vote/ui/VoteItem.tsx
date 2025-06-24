import { cn } from '@/shared/utils';
import type { ButtonHTMLAttributes } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useFetchCandidateDetail } from '../api/candidate';

interface VoteItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'> {
  selected: boolean;
  title: string;
  id: number;
}

export default function VoteItem({
  selected,
  onClick,
  title,
  id,
}: VoteItemProps) {
  const { data } = useFetchCandidateDetail(id);

  const renderNominees = () => {
    if (data) {
      const nominees = data.results;
      return (
        <>
          {nominees.map(({ id, name }) => (
            <p key={id}>{name}</p>
          ))}
        </>
      );
    } else return <></>;
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        selected ? 'border-m bg-mxl' : 'border-sl bg-white',
        'group active:border-m active:bg-mxl shadow-voteItem pt-normal flex h-[236px] flex-1 cursor-pointer flex-col items-center rounded-lg border-[1px] transition duration-150 focus:outline-none',
      )}
    >
      <div
        className={cn(
          selected ? 'bg-ml' : 'bg-sl',
          'group-active:bg-ml mb-1.5 grid size-6 place-items-center rounded-full transition duration-150',
        )}
      >
        <FaCheck className="text-white" size={14} />
      </div>
      <p className="mb-1 text-2xl font-bold">{title}</p>
      <p className="text-lg font-semibold">선거운동본부</p>
      <div className="mt-normal bg-m/10 mb-[10px] h-[1px] w-25" />
      <div className="grid grid-cols-2 gap-x-2.5 gap-y-1">
        <div className="text-m flex flex-col items-center">
          <p>정후보자</p>
          <p>부후보자</p>
        </div>
        <div className="flex flex-col items-center">{renderNominees()}</div>
      </div>
    </button>
  );
}
