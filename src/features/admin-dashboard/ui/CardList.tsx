import type { Election, VoteStatus } from '@/shared/types';
import { Card } from '@/shared/ui';
import { getDate } from '@/shared/utils';

import { useFetchElectionByStatus } from '@/features/admin-dashboard/api';

export default function CardList({ status }: { status: string }) {
  const VOTE_STATUS: Record<string, VoteStatus> = {
    진행중: 'ongoing',
    예정: 'upcoming',
    종료: 'ended',
  };
  const { data, isError, isFetching } = useFetchElectionByStatus(
    VOTE_STATUS[status],
  );

  const renderElection = (data: Election[]) => {
    if (isError)
      return (
        <div className="px-normal mt-8 w-full text-center">
          투표를 가져오던 중 오류가 발생했어요!
        </div>
      );
    if (!isFetching && data.length === 0)
      return (
        <div className="px-normal mt-8 w-full text-center">투표가 없어요</div>
      );
    if (data && data.length > 0)
      return (
        <>
          {data.map(({ id, campus, title, startAt, endAt }, index) => (
            <Card
              className={index === 0 ? 'mt-8' : ''}
              id={id}
              key={id}
              campus={campus}
              status={status}
              title={title}
              date={`${getDate(startAt, 'YYYY.MM.DD')} - ${getDate(endAt, 'YYYY.MM.DD')}`}
            />
          ))}
        </>
      );
    return <></>;
  };

  return (
    <div className="scrollbar-hide px-normal flex size-full flex-1 flex-col gap-y-[26px] overflow-scroll">
      {renderElection(data || [])}
    </div>
  );
}
