import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';

import { cn } from '@/shared/utils';

import { BottomSheet, Button } from '@/shared/ui';
import { useBottomSheet } from '@/shared/hook';
import { BOTTOM_SHEET } from '@/shared/constants';
import { useVoteCreateContext } from '@/features/vote-create/model';

export default function DatePickerBottomSheet() {
  const { closeBottomSheet, bottomSheetState } = useBottomSheet();
  const { isOpen } = bottomSheetState(BOTTOM_SHEET.DATE_PICKER);

  const handleClick = async () => {
    closeBottomSheet(BOTTOM_SHEET.DATE_PICKER);
  };

  return (
    <>
      {isOpen && (
        <BottomSheet sheetKey={BOTTOM_SHEET.DATE_PICKER}>
          <div className="flex w-full justify-center">
            <div className="h-[6px] w-[46px] rounded-full bg-[#ECECEC]" />
          </div>
          <p className="my-[23px] text-center text-xl font-semibold">
            선거 기간을 선택해 주세요
          </p>
          <Calendar />
          <Button onClick={handleClick} intent={'gradient'}>
            완료
          </Button>
        </BottomSheet>
      )}
    </>
  );
}

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = () => {
  const {
    date: contextDate,
    setDate,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useVoteCreateContext();
  const date = contextDate ?? new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const today = new Date();

  const dayCnt = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const firstWeek = Array.from({ length: firstDay.getDay() }, () => '');
  const wholeDay = Array.from({ length: dayCnt }, (_, i) => i + 1);
  const lastWeek = Array.from(
    {
      length: (7 - ((firstWeek.length + wholeDay.length) % 7)) % 7,
    },
    () => '',
  );
  const formattedDay = [...firstWeek, ...wholeDay, ...lastWeek] as (
    | number
    | ''
  )[];

  // 주 단위로 분할
  const weeks: (number | '')[][] = [];
  for (let i = 0; i < formattedDay.length; i += 7) {
    weeks.push(formattedDay.slice(i, i + 7));
  }

  const handleDateClick = (clickedDate: Date) => {
    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);
    if (clickedDate < todayStart) return;
    const clickedDateStart = new Date(clickedDate);
    clickedDateStart.setHours(0, 0, 0, 0);
    const isoDate = clickedDateStart.toISOString();
    if (!startDate || (startDate && endDate)) {
      setStartDate(isoDate);
      setEndDate(null);
    } else {
      const startDateObj = new Date(startDate);
      startDateObj.setHours(0, 0, 0, 0);
      if (clickedDateStart < startDateObj) {
        setStartDate(isoDate);
        setEndDate(startDate);
      } else {
        setEndDate(isoDate);
      }
    }
  };

  const isDateInRange = (renderDate: Date) => {
    if (!startDate || !endDate) return false;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(renderDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const currentMonthStart = new Date(currentYear, currentMonth, 1);
    const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0);
    return (
      date >= start &&
      date <= end &&
      date >= currentMonthStart &&
      date <= currentMonthEnd
    );
  };

  const isStartDate = (renderDate: Date) => {
    if (!startDate) return false;
    const start = new Date(startDate);
    const date = new Date(renderDate);
    start.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const currentMonthStart = new Date(currentYear, currentMonth, 1);
    const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0);
    return (
      date.getTime() === start.getTime() &&
      date >= currentMonthStart &&
      date <= currentMonthEnd
    );
  };

  const isEndDate = (renderDate: Date) => {
    if (!endDate) return false;
    const end = new Date(endDate);
    const date = new Date(renderDate);
    end.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const currentMonthStart = new Date(currentYear, currentMonth, 1);
    const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0);
    return (
      date.getTime() === end.getTime() &&
      date >= currentMonthStart &&
      date <= currentMonthEnd
    );
  };

  return (
    <div className="my-6">
      <div className="flex w-full items-center justify-center gap-4">
        <button
          disabled={date.getMonth() <= today.getMonth()}
          className="cursor-pointer focus:outline-none disabled:text-gray-400"
          onClick={() => {
            const newDate = new Date(date);
            newDate.setMonth(currentMonth - 1);
            const todayStart = new Date(today);
            todayStart.setHours(0, 0, 0, 0);
            if (newDate < todayStart) setDate(today);
            else setDate(newDate);
          }}
        >
          <IoChevronBackSharp />
        </button>
        {currentYear}년 {currentMonth + 1}월
        <button
          className="cursor-pointer focus:outline-none"
          onClick={() => {
            const newDate = new Date(date);
            newDate.setMonth(currentMonth + 1);
            setDate(newDate);
          }}
        >
          <IoChevronForwardSharp />
        </button>
      </div>
      <div className="grid grid-cols-7">
        {WEEK.map((w, i) => (
          <div
            key={w}
            className={cn(
              'flex h-11 w-full items-center justify-center text-sm font-medium',
              i === 0 && 'text-important',
            )}
          >
            {w}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-0 text-sm">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className={cn('grid grid-cols-7')}>
            {week.map((d, dayIdx) => {
              if (!d || typeof d !== 'number') {
                return (
                  <div key={dayIdx} className="cursor-pointer font-light">
                    <button
                      disabled
                      className="text-sl grid h-11 w-full place-items-center rounded-[50%] text-sm"
                    >
                      {d}
                    </button>
                  </div>
                );
              }
              const renderDate = new Date(currentYear, currentMonth, d);
              const todayStart = new Date(today);
              todayStart.setHours(0, 0, 0, 0);
              const inRange = isDateInRange(renderDate);
              if (renderDate < todayStart) {
                return (
                  <div key={dayIdx} className="cursor-pointer font-light">
                    <button
                      disabled
                      className="text-sl grid h-11 w-full place-items-center rounded-[50%]"
                    >
                      {d}
                    </button>
                  </div>
                );
              } else {
                return (
                  <div
                    key={dayIdx}
                    className={cn(
                      'cursor-pointer font-light',
                      inRange &&
                        !isStartDate(renderDate) &&
                        !isEndDate(renderDate) &&
                        'bg-[#6DA2FE1A]',
                    )}
                  >
                    <button
                      className={cn(
                        'grid h-11 w-full place-items-center rounded-[50%]',
                        isStartDate(renderDate) && 'text-white',
                        isEndDate(renderDate) && 'text-white',
                      )}
                      style={
                        isStartDate(renderDate) || isEndDate(renderDate)
                          ? { background: '#6DA2FE' }
                          : undefined
                      }
                      onClick={() => handleDateClick(renderDate)}
                    >
                      {d}
                    </button>
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
