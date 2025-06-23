import { useSetAtom } from 'jotai';
import { useMutation } from '@tanstack/react-query';

import { post, REQUEST } from '@/shared/api';
import { RAW_PATH } from '@/shared/constants';
import { replace } from '@/shared/utils';
import { userTokenAtom } from '@/shared/atom';
import type { Token, User } from '@/shared/types';

const submitUserJoin = async (data: User) => {
  const response = await post<User, Token>({
    request: REQUEST.JOIN,
    data: data,
  });
  return response.data;
};

export const useUserJoin = () => {
  const setUserToken = useSetAtom(userTokenAtom);
  return useMutation<Token, Error, { data: User }>({
    mutationFn: ({ data }) => submitUserJoin(data),
    onSuccess: data => {
      const accessToken = data.accessToken;
      setUserToken({
        accessToken: accessToken,
      });
      replace(RAW_PATH.SIGNUP_LOADING);
    },
    onError: () => {
      alert('회원가입에 실패했어요. 다시 시도해 주세요!');
      replace(RAW_PATH.HOME);
    },
  });
};
