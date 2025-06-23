import { MessageIcon, NotificationIcon } from '@/assets/icon';
import type { Notice } from '../types';

import { cn } from '@/shared/utils';
import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';

export default function NoticeItem({ id, title, type, date }: Notice) {
  const typeLabel = type === 'NOTIFICATION' ? '알림' : '예정';
  const { push } = useFlow();

  return (
    <button
      name={`${id}`}
      className="flex w-full flex-shrink-0 cursor-pointer items-center overflow-hidden py-6 focus:outline-none"
      onClick={() =>
        push(PATH.NOTICE_CONTENT, { notice: { id, title, type, date } })
      }
    >
      <div className="shadow-noticeItem grid place-items-center rounded-md px-2 py-1">
        <img
          src={type === 'NOTIFICATION' ? NotificationIcon : MessageIcon}
          className="h-10 w-11"
        />
      </div>

      <div className="ml-[10px] flex w-full flex-col items-start">
        <div className="flex w-full justify-between text-lg font-semibold">
          <p className="w-52 overflow-hidden text-start font-normal text-nowrap text-ellipsis">
            {title}
          </p>
          <div
            className={cn(
              type === 'NOTIFICATION'
                ? 'bg-red-500/20 text-red-600'
                : 'bg-mxl text-m',
              'flex w-13 items-center justify-center rounded-[6px] py-0.5 text-sm font-medium',
            )}
          >
            {typeLabel}
          </div>
        </div>
        <p className="text-mid font-medium text-[#999]">{date}</p>
      </div>
    </button>
  );
}
