import type { Campus } from '@/shared/types';

export type NoticeStatus = 'UPCOMING' | 'NOTIFY' | 'ONGOING' | 'COMPLETED';
export type NoticeType = 'NOTIFY' | 'ELECTION';

export type Notice = {
  title: string;
  content: string;
  noticeType: NoticeType;
  campus: Campus;
  startAt: string;
  endAt: string;
};

export type NoticeList = Omit<Notice, 'noticeType' | 'content' | 'campus'> & {
  noticeStatus: NoticeStatus;
  id: number;
};
