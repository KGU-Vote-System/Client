import { useState, type ReactNode } from 'react';

import { VoteCreateContext } from '@/features/vote-create/model';

export default function VoteCreateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mode, setMode] = useState(0);
  const [isCandidateMode, setIsCandidateMode] = useState<boolean>(false);
  const [voteType, setVoteType] = useState<string>('');
  const [candidateKey, setCandidateKey] = useState<'candidate1' | 'candidate2'>(
    'candidate1',
  );
  const [nomineeKey, setNomineeKey] = useState<'nominee1' | 'nominee2'>(
    'nominee1',
  );
  const [date, setDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  return (
    <VoteCreateContext.Provider
      value={{
        mode,
        setMode,
        isCandidateMode,
        setIsCandidateMode,
        voteType,
        setVoteType,
        candidateKey,
        setCandidateKey,
        nomineeKey,
        setNomineeKey,
        date,
        setDate,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </VoteCreateContext.Provider>
  );
}
