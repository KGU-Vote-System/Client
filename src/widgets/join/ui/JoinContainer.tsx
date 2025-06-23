import { JoinForm } from '@/features/join/ui';

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
          <JoinForm />
        </div>
      </div>
    </div>
  );
}
