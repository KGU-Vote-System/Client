import { createContext, type Dispatch, type SetStateAction } from 'react';

export const VoteCreateContext = createContext<{
  mode: number;
  setMode: Dispatch<SetStateAction<number>>;
  isCandidateMode: boolean;
  setIsCandidateMode: Dispatch<SetStateAction<boolean>>;
  voteType: string;
  setVoteType: Dispatch<SetStateAction<string>>;
  candidateKey: 'candidate1' | 'candidate2';
  setCandidateKey: Dispatch<SetStateAction<'candidate1' | 'candidate2'>>;
  nomineeKey: 'nominee1' | 'nominee2';
  setNomineeKey: Dispatch<SetStateAction<'nominee1' | 'nominee2'>>;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  startDate: string | null;
  setStartDate: Dispatch<SetStateAction<string | null>>;
  endDate: string | null;
  setEndDate: Dispatch<SetStateAction<string | null>>;
} | null>(null);
