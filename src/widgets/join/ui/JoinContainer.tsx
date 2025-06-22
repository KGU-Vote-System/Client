import { RAW_PATH } from '@/shared/constants';
import { Button, Input } from '@/shared/ui';
import { replace } from '@/shared/utils';

export default function LoginContainer() {
  return (
    <div className="p-normal z-10 grid size-full place-items-center">
      <div className="shadow-login box-border grid h-[530px] w-full place-items-center rounded-lg border-[1px] border-white bg-white/50 p-6 backdrop-blur-sm">
        <div className="flex w-full flex-col justify-center space-y-12">
          <p className="text-md text-3xl leading-tight font-semibold">
            재학생 인증 후
            <br />
            선거에 참여할 수 있어요!
          </p>
          <div className="w-full space-y-3">
            <Input intent="login" placeholder="학번" />
            <Input intent="login" placeholder="비밀번호" type="password" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-s h-[0.5px] flex-1" />
              <span className="text-s text-sm">가입 방식</span>
              <div className="bg-s h-[0.5px] flex-1" />
            </div>
            <Button
              intent="login"
              className="py-[14px] text-lg"
              onClick={() => replace(RAW_PATH.SIGNUP_LOADING)}
            >
              학생으로 시작하기
            </Button>
            <Button
              intent="loginWhite"
              className="py-[14px] text-lg"
              onClick={() => replace(RAW_PATH.SIGNUP_LOADING)}
            >
              관리자로 시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
