import { useQuery } from '@tanstack/react-query';

import { REQUEST, userGet } from '@/shared/api';
import type { Campus } from '@/shared/types';
import type { NoticeList } from '../types';

const fetchNoticeByCampus = async (campus: Campus) => {
  const response = await userGet<NoticeList[]>({
    request: REQUEST.NOTICE_CAMPUS + campus,
  });
  return response.data;
};

export const useFetchNoticeByCampus = (campus: Campus) => {
  return useQuery({
    queryKey: ['notices', campus],
    queryFn: () => fetchNoticeByCampus(campus),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
