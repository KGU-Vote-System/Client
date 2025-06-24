import { useState } from 'react';
import VotePromiseCard from './VotePromiseCard';
import { cn } from '@/shared/utils';
import { Button } from '@/shared/ui';
import { useFlow } from '@/app/stackflow';
import type { Candidate, Nominee } from '@/shared/types';

interface VotePromiseContainerProps {
  nomineeData: Array<Nominee[]>;
  candidateData: Array<Candidate>;
}

export default function VotePromiseContainer({
  nomineeData,
  candidateData,
}: VotePromiseContainerProps) {
  const [selectedCard, setSelectedCard] = useState(0);
  const { pop } = useFlow();
  const promises = Array.from({ length: 2 });
  const candidates = candidateData.map(candidate => candidate.name);

  return (
    <div className="p-normal flex size-full flex-col items-center">
      <p className="mb-11 text-center text-lg font-semibold">
        카드를 탭해서 뒤집어보세요!
      </p>
      <VotePromiseCard
        nominees={nomineeData[selectedCard]}
        candidateName={candidates[selectedCard]}
      />
      <div className="my-7 flex w-full justify-center">
        <div className="flex gap-[22px]">
          {promises.map((_, i) => (
            <button
              key={i}
              className={cn(
                selectedCard === i
                  ? 'border-m bg-mxl text-m border-[1px]'
                  : 'text-sl bg-white',
                'grid size-15 cursor-pointer place-items-center rounded-lg text-3xl font-bold',
              )}
              onClick={() => setSelectedCard(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <Button intent="gradient" onClick={() => pop()}>
        확인했어요
      </Button>
    </div>
  );
}
