import { CharacterComplete } from '@/assets/icon';
import { VoteBg } from '@/assets/image';
import { Button } from '@/shared/ui';
import { RAW_PATH } from '@/shared/constants';
import { replace } from '@/shared/utils';

export default function JoinCompleteScreen() {
  return (
    <div className="container-mobile relative h-screen overflow-hidden">
      <div className="px-normal top-0 flex h-[58px] w-full items-center">
        <span className="logo text-m ml-[4px] text-3xl font-semibold">
          took!
        </span>
      </div>
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
            replace(RAW_PATH.HOME);
          }}
        >
          시작하기
        </Button>
      </div>
      <img src={VoteBg} className="absolute inset-0 -z-1" />
    </div>
  );
}
