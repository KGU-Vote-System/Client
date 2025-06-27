import { useBottomSheet } from '@/shared/hook';
import { BottomSheet } from '@/shared/ui';
import { BOTTOM_SHEET } from '@/shared/constants';
import { cn } from '@/shared/utils';
import { useVoteCreateContext } from '@/features/vote-create/model';

export default function DatePickerBottomSheet() {
  const { voteType, setVoteType } = useVoteCreateContext();
  const { closeBottomSheet, bottomSheetState } = useBottomSheet();
  const { isOpen } = bottomSheetState(BOTTOM_SHEET.VOTE_TYPE);
  const year = [
    '총학생회 선거',
    '인문대학 선거',
    '예술체육대학 선거',
    '사회과학대학 선거',
    '창의공과대학 선거',
    '소프트웨어경영대학 선거',
    '융합과학대학 선거',
    '관광문화대학 선거',
  ];

  const handleSelectYear = (selectedType: string) => {
    setVoteType(selectedType);
    closeBottomSheet(BOTTOM_SHEET.VOTE_TYPE);
  };

  return (
    <>
      {isOpen && (
        <BottomSheet sheetKey={BOTTOM_SHEET.VOTE_TYPE}>
          <div className="flex w-full justify-center">
            <div className="h-[6px] w-[46px] rounded-full bg-[#ECECEC]" />
          </div>
          <p className="my-[23px] text-center text-xl font-semibold">
            선거 유형을 선택해 주세요
          </p>
          <div className="scrollbar-hide flex h-[220px] w-full flex-col items-center gap-y-[23px] overflow-scroll">
            {year.map(y => (
              <button
                key={y}
                name={`${y}`}
                onClick={() => handleSelectYear(y)}
                className={cn(
                  voteType === y && 'text-ml',
                  'active:text-ml text-s focus:outline-none',
                )}
              >
                {y}
              </button>
            ))}
          </div>
        </BottomSheet>
      )}
    </>
  );
}
