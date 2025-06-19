import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useFlow } from '@/app/stackflow';
import { CharacterComplete } from '@/assets/icon';
import { VoteBg } from '@/assets/image';
import { Button, NoBackLogoAppBar } from '@/shared/ui';
import { PATH } from '@/shared/constants';

export default function JoinCompleteScreen() {
  const { replace } = useFlow();
  return (
    <AppScreen
      preventSwipeBack
      appBar={NoBackLogoAppBar(VoteBg)}
      backgroundImage={`url(${VoteBg})`}
    >
      <div className="p-normal flex size-full flex-col">
        <p className="mt-mt mb-[14px] text-4xl leading-tight font-semibold">
          가입완료!
          <br />
          투표는 <span className="text-m">툭</span>하고 끝내요!
        </p>
        <p className="text-s mb-13 text-lg font-semibold">
          모든 투표정보는 블록체인으로 안전하게 보장
        </p>
        <img src={CharacterComplete} className="mb-9" />
        <Button
          intent="gradient"
          onClick={() => {
            replace(PATH.HOME, {});
          }}
        >
          시작하기
        </Button>
      </div>
    </AppScreen>
  );
}
