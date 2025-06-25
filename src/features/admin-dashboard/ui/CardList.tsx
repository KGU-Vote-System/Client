import type { VoteStatus } from '@/shared/types';
// import { Card } from '@/shared/ui';

export default function CardList({ status }: { status: VoteStatus }) {
  const data = VOTE_MOCK.filter(
    ({ status: voteStatus }) => voteStatus === status,
  );
  console.log(data);
  
  return (
    <div className="scrollbar-hide px-normal flex size-full flex-1 flex-col gap-y-[26px] overflow-scroll">
{/*       {data.map(({ id, campus, status, title, date }, index) => (
        <Card
          className={index === 0 ? 'mt-8' : ''}
          key={id}
          campus={campus}
          status={status}
          title={title}
          date={date}
        />
      ))} */}
    </div>
  );
}
