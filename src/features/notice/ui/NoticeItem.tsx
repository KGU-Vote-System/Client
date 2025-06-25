import { MessageIcon, NotificationIcon } from '@/assets/icon';
import type { NoticeList } from '@/shared/types';

import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';
import { NOTICE_STATUS } from '../constants';

export default function NoticeItem({
  id,
  title,
  noticeStatus,
  startAt,
  endAt,
}: NoticeList) {
  const { push } = useFlow();
  const { label, bgColor, color } = NOTICE_STATUS[noticeStatus];

  return (
    <button
      name={`${id}`}
      className="flex w-full flex-shrink-0 cursor-pointer items-center overflow-hidden py-6 focus:outline-none"
      onClick={() =>
        push(PATH.NOTICE_CONTENT, {
          notice: { id, title, startAt, endAt, noticeStatus },
        })
      }
    >
      <div className="shadow-noticeItem grid place-items-center rounded-md px-2 py-1">
        <img
          src={noticeStatus === 'NOTIFY' ? NotificationIcon : MessageIcon}
          className="h-10 w-11"
        />
      </div>

      <div className="ml-[10px] flex w-full flex-col items-start">
        <div className="flex w-full justify-between text-lg font-semibold">
          <p className="w-52 overflow-hidden text-start font-normal text-nowrap text-ellipsis">
            {title}
          </p>
          <div
            className="flex w-13 items-center justify-center rounded-[6px] py-0.5 text-sm font-medium"
            style={{ backgroundColor: `${bgColor}`, color: `${color}` }}
          >
            {label}
          </div>
        </div>
        <p className="text-mid font-medium text-[#999]">{startAt}</p>
      </div>
    </button>
  );
}
