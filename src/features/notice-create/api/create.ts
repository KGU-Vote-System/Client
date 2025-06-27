import { useFlow } from '@/app/stackflow';
import { useMutation } from '@tanstack/react-query';

import { REQUEST, userPost } from '@/shared/api';
import type { Replace, WholeCampus, Notice } from '@/shared/types';

const submitNotice = async (data: Replace<Notice, 'campus', WholeCampus>) => {
  const response = await userPost({
    request: REQUEST.NOTICE.slice(0, -1),
    data: data,
  });
  return response;
};

export const useSubmitNotice = () => {
  const { pop } = useFlow();

  return useMutation({
    mutationFn: (data: Replace<Notice, 'campus', WholeCampus>) =>
      submitNotice(data),
    onSuccess: () => {
      alert('공지 등록 성공!');
      pop({ animate: false });
    },
  });
};
