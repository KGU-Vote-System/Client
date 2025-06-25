import type { Campus } from '@/shared/types';
import { Alert, CharacterFlat } from '@/assets/icon';

import { useFetchNoticeByCampus } from '@/features/notice/api';
import type { NoticeList } from '@/features/notice/types';

import NoticeItem from './NoticeItem';

export default function NoticeList({ campus }: { campus: Campus }) {
  const { data, isError, isFetching } = useFetchNoticeByCampus(campus);

  const renderDataView = (data: NoticeList[]) => {
    if (isFetching) return <></>;
    if (data.length === 0 && isError) return <Error />;
    if (!isFetching && !isError && data.length === 0) return <NoData />;
    return (
      <>
        {data.map(notice => (
          <NoticeItem key={notice.id} {...notice} />
        ))}
      </>
    );
  };

  return (
    <div className="scrollbar-hide flex w-full flex-1 flex-shrink-0 flex-col divide-y divide-[#ECECEC] overflow-scroll">
      {renderDataView(data || [])}
    </div>
  );
}

const Error = () => (
  <div className="flex w-full flex-col items-center">
    <img src={Alert} className="mt-40 mb-4 size-[174px]" />
    <span className="text-md mb-[10px] text-2xl font-semibold">
      공지사항을 불러오지 못했어요
    </span>
    <span className="text-lg text-[#FA4545]">인터넷 연결을 확인해주세요</span>
  </div>
);

const NoData = () => (
  <div className="flex w-full flex-col items-center">
    <img src={CharacterFlat} className="mt-40 mb-20 w-fit" />
    <span className="text-md text-2xl font-semibold">
      아직 공지사항이 없어요!
    </span>
  </div>
);
