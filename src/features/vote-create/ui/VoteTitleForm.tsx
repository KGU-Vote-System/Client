import { VoteButton, VoteInput } from '@/features/vote-create/ui';
import type {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import type { ElectionAllData } from '../types';
import { BOTTOM_SHEET } from '@/shared/constants';
import { useBottomSheet } from '@/shared/hook';
import { useVoteCreateContext } from '@/features/vote-create/model';
import { useEffect } from 'react';
import { getDate } from '@/shared/utils';

interface VoteTitleFormProps {
  watch: UseFormWatch<ElectionAllData>;
  register: UseFormRegister<ElectionAllData>;
  setValue: UseFormSetValue<ElectionAllData>;
}

export default function VoteTitleForm({
  register,
  watch,
  setValue,
}: VoteTitleFormProps) {
  const { openBottomSheet } = useBottomSheet();
  const { voteType, startDate, endDate } = useVoteCreateContext();
  const isVoteTypeDone = voteType !== '';
  const isDateDone = startDate !== null && endDate !== null;

  useEffect(() => {
    if (voteType !== '') {
      setValue('election.title', voteType);
    }
  }, [voteType, setValue]);

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      setValue('election.startAt', startDate);
      setValue('election.endAt', endDate);
    }
  }, [startDate, endDate, setValue]);

  return (
    <div className='"p-normal scrollbar-hide pb-38" h-full overflow-scroll pt-0'>
      <p className="mt-11 text-lg font-semibold">선거 정보 등록하기</p>
      <div className="mt-[18px] flex w-full flex-col gap-[14px] font-semibold">
        <VoteButton
          label={isVoteTypeDone ? voteType : '투표 유형을 선택해 주세요'}
          type="button"
          onClick={() => {
            openBottomSheet(BOTTOM_SHEET.VOTE_TYPE);
          }}
          done={isVoteTypeDone}
        />
        <VoteButton
          label={
            isDateDone
              ? `${getDate(startDate, 'YYYY.MM.DD')} - ${getDate(
                  endDate,
                  'YYYY.MM.DD',
                )}`
              : '투표 기간을 선택하세요'
          }
          arrowDown
          type="button"
          onClick={() => {
            openBottomSheet(BOTTOM_SHEET.DATE_PICKER);
          }}
          done={isDateDone}
        />
      </div>
      <p className="mt-6 text-lg font-semibold">선거운동본부 등록하기</p>
      <div className="mt-[18px] flex w-full flex-col gap-[14px]">
        <VoteInput
          placeholder="후보팀명을 입력하세요"
          {...register('candidate1.info.name')}
          value={watch('candidate1.info.name')}
        />
        <VoteInput
          placeholder="후보팀명을 입력하세요"
          {...register('candidate2.info.name')}
          value={watch('candidate2.info.name')}
        />
      </div>
    </div>
  );
}
