import { NoticeIcon, ResultIcon } from '@/assets/icon';
import { useFlow } from '@/app/stackflow';
import type { PathItem } from '@/shared/types';
import { PATH } from '@/shared/constants';
import { CardSection } from '@/features/home/ui';

interface ServiceButtonProps {
  title: string;
  description: string;
  icon: string;
  to: PathItem;
}

export default function HomeContainer() {
  return (
    <div className="size-full flex-col items-center p-6">
      <CardSection />
      <p className="mt-10 mb-4 text-xl font-semibold">이런 서비스도 있어요</p>
      <div className="flex w-full flex-col gap-[14px]">
        <ServiceButton
          title="선거결과"
          description="역대 선거결과를 확인해보세요"
          icon={ResultIcon}
          to={PATH.VOTE_RESULT}
        />
        <ServiceButton
          title="공지사항"
          description="예정된 선거를 확인해보세요"
          icon={NoticeIcon}
          to={PATH.NOTICE}
        />
      </div>
    </div>
  );
}

const ServiceButton = ({
  title,
  description,
  icon,
  to,
}: ServiceButtonProps) => {
  const { push } = useFlow();

  return (
    <button
      name={title}
      className="shadow-button flex w-full cursor-pointer justify-between rounded-lg border-[1px] border-white bg-white/50 p-5 focus:outline-none"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={() => push(to, { notice: {} as any })}
      /**해당 라인의 경우 notice content screen으로 절대 이동하지 않을 버튼입니다.
       * 하지만 타입 에러가 발생하여 다음과 같이 불가피하게 any 타입으로 처리합니다.
       */
    >
      <div className="flex flex-col items-start">
        <span className="text-lg font-semibold">{title}</span>
        <span className="text-s text-sm font-medium">{description}</span>
      </div>
      <img src={icon} alt="notice" className="w-[48px]" />
    </button>
  );
};
