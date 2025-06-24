export type NoticeType = 'UPCOMING' | 'NOTIFY';

export type NoticeListType = NoticeType | 'ONGOING' | 'COMPLETED';

export type Notice = {
  id: number;
  title: string;
  startAt: string;
  endAt: string;
  noticeType: NoticeType;
};

export type NoticeList = Omit<Notice, 'noticeType'> & {
  noticeStatus: NoticeListType;
};
