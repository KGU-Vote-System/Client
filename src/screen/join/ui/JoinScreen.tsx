import { LoginBg } from '@/assets/image';
import { JoinContainer } from '@/widgets/join/ui';

export default function JoinScreen() {
  return (
    <div className="container-mobile relative h-screen overflow-hidden">
      <div className="px-normal top-0 flex h-[58px] w-full items-center">
        <span className="logo text-m ml-[4px] text-3xl font-semibold">
          took!
        </span>
      </div>
      <JoinContainer />
      <img src={LoginBg} className="absolute inset-0 -z-1" />
    </div>
  );
}
