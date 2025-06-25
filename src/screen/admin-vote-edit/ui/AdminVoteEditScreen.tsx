import { AppScreen } from '@stackflow/plugin-basic-ui';

import { Card, TitleAppBar } from '@/shared/ui';
import { VoteBg } from '@/assets/image';
import { PATH } from '@/shared/constants';

export default function AdminVoteEditScreen() {
  return (
    <>
      <AppScreen
        backgroundImage={`url(${VoteBg})`}
        appBar={TitleAppBar('', VoteBg)}
      >
        <div className="p-normal size-full">
          <p className="mt-mt mb-11 text-2xl font-bold">
            내용을 수정할
            <br />
            <span className="text-m">선거운동본부</span>를 선택해주세요.
          </p>
          <Card
            campus="SUWON"
            title="구름 선거운동본부"
            status="예정"
            date="25-05-29"
            className="mb-7"
            customTo={PATH.VOTE_EDIT}
          />
          <Card
            campus="SUWON"
            title="구름 선거운동본부"
            status="예정"
            date="25-05-29"
            customTo={PATH.VOTE_EDIT}
          />
        </div>
      </AppScreen>
    </>
  );
}
