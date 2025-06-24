import { REQUEST, userGet } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

interface NoticeResponse {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const fetchNoticeContent = async (id: number) => {
  const response = await userGet<NoticeResponse>({
    request: REQUEST.NOTICE + `${id}`,
  });
  return response.data;
};

export const useFetchNoticeContent = (id: number) => {
  return useQuery({
    queryKey: [`${id}`, 'notice-content'],
    queryFn: () => fetchNoticeContent(id),
  });
};
