import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useForm } from 'react-hook-form';

import { cn } from '@/shared/utils';
import { Button, DatePickerBottomSheet, VoteCreateAppBar } from '@/shared/ui';

import {
  useVoteCreateContext,
  useElectionFormMode,
} from '@/features/vote-create/model';
import type { ElectionAllData } from '@/features/vote-create/types';

import VoteTypeBottomSheet from './VoteTypeBottomSheet';
import { useEffect } from 'react';

export default function VoteCreateContainer() {
  const { mode, setCandidateKey } = useVoteCreateContext();
  const { register, watch, setValue, handleSubmit } = useForm<ElectionAllData>({
    defaultValues: {
      election: {
        description: '투표에 참여해주세요!',
        campus: 'SUWON',
        collageMajorName: '소프트웨어경영대학',
        active: true,
      },
      candidate1: { nominee1: { main: true }, nominee2: { main: false } },
      candidate2: { nominee1: { main: true }, nominee2: { main: false } },
    },
  });

  const {
    MODE,
    handleBackClick,
    handleNextClick,
    isFormValid,
    buttonIntent,
    onSubmitClick,
  } = useElectionFormMode({ register, watch, setValue });

  useEffect(() => {
    if (mode !== 2) setCandidateKey('candidate1');
    else setCandidateKey('candidate2');
  }, [mode, setCandidateKey]);

  return (
    <>
      <AppScreen
        backgroundColor="#fff"
        appBar={VoteCreateAppBar('투표 생성', handleBackClick)}
      >
        <div className="fixed top-[58px] h-[6px] w-full bg-[#F5F5F5]">
          <div
            className={cn(
              mode === 0 ? 'w-1/3' : mode === 1 ? 'w-2/3' : 'w-full',
              'bg-m h-full rounded-r-full',
            )}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmitClick)}>
          <div className="p-normal scrollbar-hide h-full overflow-scroll pt-0 pb-38">
            {MODE!.form}
          </div>
          <div className="shadow-voteCreateDock px-normal fixed bottom-0 flex w-full gap-x-[9px] bg-white pt-4 pb-15">
            <Button intent="disabled" className="flex-1 text-lg">
              임시저장
            </Button>
            <Button
              disabled={!isFormValid}
              intent={buttonIntent}
              className="flex-1 text-lg"
              onClick={handleNextClick}
              type={watch('candidate2.info.description') ? 'submit' : 'button'}
            >
              다음
            </Button>
          </div>
        </form>
      </AppScreen>
      <VoteTypeBottomSheet />
      <DatePickerBottomSheet />
    </>
  );
}
