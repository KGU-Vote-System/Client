import { AppScreen } from '@stackflow/plugin-basic-ui';

import { Button, TitleAppBar } from '@/shared/ui';
import { ProfileIcon } from '@/assets/icon';
import { fetchSessionData, logout } from '@/shared/utils';
import type { User } from '@/shared/types';
import { IoChevronForward } from 'react-icons/io5';

export default function UserScreen() {
  const { name, collegeMajorName } = fetchSessionData('userInfo') as User;

  return (
    <AppScreen backgroundColor="#fff" appBar={TitleAppBar('')}>
      <div className="p-normal flex size-full flex-col">
        <div className="mb-[35px] flex w-full flex-col items-center justify-center">
          <img src={ProfileIcon} className="size-25" />
          <p className="text-m mt-4 text-center text-2xl font-bold">{name}</p>
          <p className="mt-2.5">202311509</p>
          <p>{collegeMajorName}</p>
        </div>
        <div className="shadow-resultItem mb-[15px] flex h-42 w-full gap-x-3 rounded-lg bg-white px-3 py-[17px]">
          <InfoItem item="3회" label="나의 투표참여 횟수" />
          <div className="h-full w-[1px] bg-[#ECECEC]" />
          <InfoItem item="59%" label="전체 투표 참여율" />
          <div className="h-full w-[1px] bg-[#ECECEC]" />
          <InfoItem item="51%" label="학과 평균 참여율" />
        </div>
        <Button intent="gradient" className="mb-13">
          내 투표내역 보기
        </Button>
        <UserScreenButton label="문의하기" onClick={() => {}} />
        <UserScreenButton
          label="로그아웃"
          onClick={() => {
            logout();
          }}
        />
      </div>
    </AppScreen>
  );
}

const InfoItem = ({ item, label }: { item: string; label: string }) => (
  <div className="flex flex-1 flex-col items-center justify-center gap-y-[7px]">
    <p className="text-m text-2xl font-bold">{item}</p>
    <p className="text-[13px] font-light">{label}</p>
  </div>
);

const UserScreenButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    className="shadow-resultItem mb-4 flex items-center justify-between rounded-md px-[18px] py-5"
    onClick={onClick}
  >
    {label}
    <IoChevronForward size={20} />
  </button>
);
