import type { NoticeStatus } from '@/shared/types';

type StatusStyle = {
  label: string;
  bgColor: string;
  color: string;
};

export const NOTICE_STATUS: Record<NoticeStatus, StatusStyle> = {
  COMPLETED: { label: '종료', bgColor: '#F5F5F5', color: '#999' },
  NOTIFY: {
    label: '알림',
    bgColor: 'rgba(255, 95, 95, 0.10)',
    color: '#FA4545',
  },
  ONGOING: {
    label: '진행',
    bgColor: 'rgba(50, 205, 50, 0.10)',
    color: '#32CD32',
  },
  UPCOMING: { label: '예정', bgColor: '#E9F6FF', color: '#377FF8' },
};
