import { useFetchAllElections } from '../api';
import CardStack from './CardStack';

export default function CardSection() {
  const { data, isFetching, isError } = useFetchAllElections();
  if (isFetching) return <></>;
  if (isError) return <></>;
  if (data && data.length === 0)
    return (
      <>
        <p className="mb-8 text-2xl font-semibold">진행중인 선거가 없어요</p>
        <div className="shadow-card flex h-fit w-full cursor-pointer flex-col rounded-lg bg-white p-6">
          <div className="flex w-full justify-between">투표가 없어여</div>
        </div>
      </>
    );
  if (data)
    return (
      <>
        <p className="mb-8 text-2xl font-semibold">진행중인 선거가 있어요!</p>
        <CardStack data={data} />
      </>
    );

  return <></>;
}
