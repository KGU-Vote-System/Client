import React from 'react';
import type { MouseEvent } from 'react';
import type { ElectionAllData } from '@/features/vote-create/types';
import type {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import { useVoteCreateContext } from '@/features/vote-create/model';
import { useFlow } from '@/app/stackflow';
import { VoteDetailForm, VoteTitleForm } from '@/features/vote-create/ui';
import { PATH } from '@/shared/constants';

interface useElectionFormModeProps {
  register: UseFormRegister<ElectionAllData>;
  watch: UseFormWatch<ElectionAllData>;
  setValue: UseFormSetValue<ElectionAllData>;
  candidateKey?: 'candidate1' | 'candidate2';
}

export default function useElectionFormMode({
  register,
  watch,
  setValue,
}: useElectionFormModeProps) {
  const {
    mode,
    setMode,
    isCandidateMode,
    setIsCandidateMode,
    candidateKey,
    nomineeKey,
  } = useVoteCreateContext();
  const { pop, replace } = useFlow();

  const onSubmitClick = (data: ElectionAllData) => {
    replace(PATH.VOTE_CREATE_LOADING, { ...data });
  };

  const handleBackClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isCandidateMode) {
      setIsCandidateMode(false);
      return;
    }
    if (mode === 0) pop();
    else setMode(prev => prev - 1);
  };

  const handleNextClick = () => {
    if (isCandidateMode) {
      setIsCandidateMode(false);
    } else if (mode < 2) {
      setMode(prev => prev + 1);
    } else return;
  };

  const isNomineeValid = (
    candidateKey: 'candidate1' | 'candidate2',
    nomineeKey: 'nominee1' | 'nominee2',
  ) => {
    return !!(
      watch(`${candidateKey}.${nomineeKey}.name` as const) &&
      watch(`${candidateKey}.${nomineeKey}.studentId` as const) &&
      watch(`${candidateKey}.${nomineeKey}.college` as const) &&
      watch(`${candidateKey}.${nomineeKey}.department` as const) &&
      watch(`${candidateKey}.${nomineeKey}.description1` as const)
    );
  };

  const isCandidateValid = (candidateKey: 'candidate1' | 'candidate2') => {
    return (
      isNomineeValid(candidateKey, 'nominee1') &&
      isNomineeValid(candidateKey, 'nominee2') &&
      watch(`${candidateKey}.info.description`)
    );
  };

  const MODE = [
    {
      form: React.createElement(VoteTitleForm, { register, watch, setValue }),
      isFormValid:
        watch('election.title') &&
        watch('election.startAt') &&
        watch('election.endAt') &&
        watch('candidate1.info.name') &&
        watch('candidate2.info.name'),
    },
    {
      form: React.createElement(VoteDetailForm, {
        teamName: watch('candidate1.info.name'),
        watch,
        register,
        setValue,
      }),
      isFormValid: isCandidateValid('candidate1'),
    },
    {
      form: React.createElement(VoteDetailForm, {
        teamName: watch('candidate2.info.name'),
        watch,
        register,
        setValue,
      }),
      isFormValid: isCandidateValid('candidate2'),
    },
  ];

  const isFormValid = isCandidateMode
    ? isNomineeValid(candidateKey, nomineeKey)
    : MODE[mode]!.isFormValid;
  const buttonIntent = isFormValid
    ? ('gradient' as const)
    : ('disabled' as const);

  return {
    MODE: MODE[mode],
    handleBackClick,
    handleNextClick,
    isFormValid,
    buttonIntent,
    isCandidateValid,
    isNomineeValid,
    onSubmitClick,
  };
}
