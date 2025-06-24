import { useFlow } from '@/app/stackflow';

import { PATH } from '@/shared/constants';
import { cn, hexToRgba } from '@/shared/utils';
import { Button, DateBadge } from '@/shared/ui';
import type { PathItem } from '@/shared/types';

interface CardProps {
  isStackCard?: boolean;
  className?: string;
  campus: string;
  status?: string;
  title: string;
  date: string;
  customTo?: PathItem;
}

export default function Card({
  isStackCard = false,
  className,
  campus,
  status = '진행중',
  title,
  date,
  customTo,
}: CardProps) {
  const { push } = useFlow();

  const STATUS: Record<
    string,
    { color: string; to: PathItem; button: string }
  > = {
    진행중: {
      color: '#32CD32',
      to: PATH.ADMIN_VOTE_STATUS,
      button: '진행상황',
    },
    종료: { color: '#999', to: PATH.ADMIN_VOTE_RESULT, button: '자세히 보기' },
    예정: {
      color: '#FFD503',
      to: PATH.ADMIN_VOTE_EDIT,
      button: '투표 수정하기',
    },
  };

  const { color, to, button } = STATUS[status];
  const background = hexToRgba(color, 0.1);

  const CardContent = ({ to }: { to: PathItem }) => (
    <>
      <div className="mb-5 flex w-full justify-between">
        <div className="flex gap-x-1">
          <div className="bg-m/10 text-m rounded-full px-[12px] py-[6px] text-[13px] font-light">
            {campus}
          </div>
          <div
            className="rounded-full px-[12px] py-[6px] text-[13px] font-light"
            style={{ backgroundColor: background, color: color }}
          >
            {status}
          </div>
        </div>
        {status === '진행중' && <DateBadge date={7} />}
      </div>
      <p className="text-md mb-2.5 text-2xl font-semibold">{title}</p>
      <p className="text-s mb-[34px] font-normal">{date}</p>
      <Button
        intent="gradient"
        size="md"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={() => push(to, { notice: {} as any })}
      >
        {to === PATH.VOTE ? '투표하기' : button}
      </Button>
    </>
  );

  if (isStackCard) return <CardContent to={PATH.VOTE} />;

  return (
    <div
      className={cn(
        className,
        'shadow-card flex h-fit w-full cursor-pointer flex-col rounded-lg bg-white p-6',
      )}
    >
      <CardContent to={customTo ?? to} />
    </div>
  );
}
