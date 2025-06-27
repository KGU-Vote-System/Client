import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { ElectionAllData } from '../types';
import VoteInput from './VoteInput';
import { useVoteCreateContext } from '../model';

interface VoteDetailFormProps {
  register: UseFormRegister<ElectionAllData>;
  watch: UseFormWatch<ElectionAllData>;
}

export default function VoteCandidateForm({
  register,
  watch,
}: VoteDetailFormProps) {
  const { candidateKey, nomineeKey } = useVoteCreateContext();
  const isMain = nomineeKey === 'nominee1';

  const fields = [
    {
      placeholder: `${isMain ? '정' : '부'}후보자 이름`,
      field: 'name' as const,
    },
    {
      placeholder: '학번',
      field: 'studentId' as const,
    },
    {
      placeholder: '소속 단과대',
      field: 'college' as const,
    },
    {
      placeholder: '학과',
      field: 'department' as const,
    },
    {
      placeholder: '후보자 약력1',
      field: 'description1' as const,
    },
    {
      placeholder: '후보자 약력2',
      field: 'description2' as const,
    },
    {
      placeholder: '후보자 약력3',
      field: 'description3' as const,
    },
  ];

  return (
    <>
      <p className="mt-11 flex flex-col items-start text-lg font-semibold">
        {isMain ? '정후보자' : '부후보자'} 등록하기
      </p>
      <div className="mt-[18px] flex w-full flex-col gap-[14px]">
        {fields.map(({ placeholder, field }) => (
          <VoteInput
            key={field}
            placeholder={placeholder}
            {...register(`${candidateKey}.${nomineeKey}.${field}` as const)}
            value={watch(`${candidateKey}.${nomineeKey}.${field}` as const)}
          />
        ))}
      </div>
    </>
  );
}
