import { Button } from '@/shared/ui';
import { useFetchAllElections } from '../api';
import CardStack from './CardStack';
import { getDate } from '@/shared/utils';

export default function CardSection() {
  const { data, isFetching, isError } = useFetchAllElections();
  const currentYear = Number(getDate(new Date(), 'YYYY'));

  if (isFetching) return <></>;
  if (isError) return <></>;
  if (data && data.length === 0)
    return (
      <>
        <p className="mb-8 text-2xl font-semibold">진행중인 선거가 없어요</p>
        <div className="relative h-[266px]">
          <div
            className="bg-m/60 absolute left-1/2 h-[100px] w-full -translate-x-1/2 rounded-lg"
            style={{ scale: 0.97 }}
          />
          <div className="shadow-card bg-m absolute top-4 z-10 flex h-fit w-full cursor-pointer flex-col rounded-lg p-6">
            <p className="mb-2.5 text-2xl font-semibold text-white">
              {currentYear + 1}
              <br />
              투표가 시작되지 않았어요
            </p>
            <p className="mb-6 text-white">
              {currentYear} 투표는 종료되었습니다
              <br />
              새로운 투표가 생기면 알려드릴게요
            </p>
            <Button intent="home" size="lg">
              {currentYear} 선거결과 보러가기
            </Button>
          </div>
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
