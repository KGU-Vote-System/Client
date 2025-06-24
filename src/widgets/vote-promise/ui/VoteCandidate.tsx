import type { Nominee } from '@/shared/types';

export default function VoteCandidate({
  name,
  main,
  college,
  department,
  studentId,
  description,
}: Nominee) {
  return (
    <div className="flex w-full flex-col">
      <p className="mb-1.5 text-2xl font-bold">
        {main ? '정후보자' : '부후보자'} {name}
      </p>
      <p className="mb-2.5 font-normal">{`${college} ${department} ${studentId.slice(2, 4)}`}</p>
      <p className="text-s text-sm">{description}</p>
    </div>
  );
}
