import { useState } from 'react';
import { motion } from 'framer-motion';

import { VerifiedCheckIcon } from '@/assets/icon';
import type { Candidate, Nominee, Pledge } from '@/shared/types';
import { cn } from '@/shared/utils';

import VoteCandidate from './VoteCandidate';
import { useFetchPledgeData } from '../api';

interface VotePromiseCardProps {
  nominees: Nominee[];
  candidateName: string;
  candidate: Candidate;
}

export default function VotePromiseCard({
  nominees,
  candidateName,
  candidate,
}: VotePromiseCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { data: pledge } = useFetchPledgeData(candidate.id);

  const CardFront = () => (
    <div className="border-m shadow-voteItem absolute flex h-full w-full flex-col rounded-lg border-[1px] bg-white p-6 backface-hidden">
      <div className="mb-5 flex w-full justify-between">
        <TeamBadge team={candidateName} />
        <span className="text-m font-normal">1/2</span>
      </div>
      <div className="flex w-full flex-col gap-y-[34px]">
        {nominees.map(nominee => (
          <VoteCandidate key={nominee.id} {...nominee} />
        ))}
      </div>
    </div>
  );

  const CardBack = () => (
    <div className="border-m shadow-voteItem bg-mxl absolute flex h-full w-full rotate-y-180 flex-col rounded-lg border-[1px] p-6 backface-hidden">
      <div className="mb-5 flex w-full justify-between">
        <TeamBadge team={candidateName} flipped />
        <span className="text-m font-normal">2/2</span>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-m mb-[30px] text-center text-2xl font-bold">
          '{candidateName}'의 핵심공약
        </p>
        {renderPledge(pledge?.results || [])}
      </div>
    </div>
  );

  const renderPledge = (data: Pledge[]) => {
    if (data)
      return (
        <div className="flex flex-col gap-1 font-normal">
          {data.map(({ id, description }) => (
            <VotePromise key={id} promise={description} />
          ))}
        </div>
      );
    else return <></>;
  };

  return (
    <div
      className="perspective h-100 w-[304px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="transform-style preserve-3d relative h-full w-full transition-transform duration-500"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{
          type: 'tween',
          duration: 0.2,
          ease: 'linear',
        }}
      >
        <CardFront />
        <CardBack />
      </motion.div>
    </div>
  );
}

const TeamBadge = ({
  team,
  flipped = false,
}: {
  team: string;
  flipped?: boolean;
}) => (
  <div
    className={cn(
      flipped ? 'bg-m' : 'bg-md',
      'rounded-full px-5 py-1 font-normal text-white',
    )}
  >
    {team}
  </div>
);

const VotePromise = ({ promise }: { promise: string }) => (
  <div className="flex items-center gap-x-[10px]">
    <img src={VerifiedCheckIcon} alt="verifiedCheck" />
    {promise}
  </div>
);
