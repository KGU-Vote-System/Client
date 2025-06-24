import { useState } from 'react';

import { IoChevronForwardSharp } from 'react-icons/io5';
import { useFlow } from '@/app/stackflow';

import { Button } from '@/shared/ui';
import { PATH } from '@/shared/constants';

import { VoteItem } from '@/widgets/vote/ui';
import { useFetchElectionDetail } from '../api/election';

interface VoteContainerProps {
  electionId: number;
  title: string;
}

export default function VoteContainer({
  electionId,
  title,
}: VoteContainerProps) {
  const [selected, setSelected] = useState(-1);
  const { push, replace } = useFlow();
  const { data } = useFetchElectionDetail(electionId);

  const handleClick = (index: number) => {
    if (selected === index) setSelected(-1);
    else setSelected(index);
  };

  const renderCandidates = () => {
    if (data)
      return (
        <div className="relative mb-21 flex w-full gap-x-[10px]">
          {data.results.map(({ name, id }, index) => (
            <VoteItem
              key={index}
              title={name}
              id={id}
              selected={selected === index}
              onClick={() => handleClick(index)}
            />
          ))}
          <div className="bg-md absolute top-19 left-1/2 grid size-[50px] -translate-x-1/2 -translate-y-1/2 transform place-items-center rounded-full text-xl font-semibold text-white">
            VS
          </div>
        </div>
      );
    else return <></>;
  };

  return (
    <div className="p-normal flex size-full flex-col">
      <div className="mt-mt mb-[10px] flex w-[60%] flex-col text-3xl leading-9 font-bold text-wrap">
        {title.split(' ')[0]}
        <br />
        {title.split(' ').slice(1).join(' ') + ' 후보'}
      </div>
      <p className="text-s mb-[50px] text-lg font-semibold">
        공약을 살펴보고 신중하게 투표해주세요
      </p>
      <Button
        className="bg-ml mb-6 flex h-17 items-center justify-between rounded-lg px-5 text-start text-lg"
        onClick={() => push(PATH.VOTE_PROMISE, {})}
      >
        후보자 공약 보러가기
        <IoChevronForwardSharp size={20} />
      </Button>
      {renderCandidates()}
      <Button
        intent={selected !== -1 ? 'gradient' : 'disabled'}
        onClick={() => replace(PATH.VOTE_COMPLETE, {}, { animate: false })}
      >
        투표완료
      </Button>
    </div>
  );
}
