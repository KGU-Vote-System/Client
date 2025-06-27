import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/stackflow';
import { Button, NoBackAppBar } from '@/shared/ui';
import { VoteBg } from '@/assets/image';
import { CreateCompleteIcon } from '@/assets/icon';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export default function VoteCreateCompleteScreen() {
  const { pop } = useFlow();

  return (
    <>
      <AppScreen
        preventSwipeBack
        backgroundImage={`url(${VoteBg})`}
        appBar={NoBackAppBar('', VoteBg)}
      >
        <div className="p-normal flex size-full flex-col">
          <p className="text-m mt-mt mb-2.5 text-center text-4xl font-bold">
            투표가 생성되었어요!
          </p>
          <p className="text-s mb-12 text-center text-xl font-semibold">
            투표는 대시보드에서 수정 가능해요
          </p>
          <div className="absolute top-70 left-1/2 -translate-x-1/2">
            <DotLottieReact
              style={{ width: 300, height: 300 }}
              src="https://lottie.host/a0efbf08-977e-49af-926d-01b31d530dd8/7e8jbdwS7b.lottie"
              autoplay
              className="scale-500"
            />
          </div>

          <img src={CreateCompleteIcon} alt="voteComplete" className="mb-20" />
          <Button intent="gradient" onClick={() => pop({ animate: false })}>
            홈으로 돌아가기
          </Button>
        </div>
      </AppScreen>
    </>
  );
}
