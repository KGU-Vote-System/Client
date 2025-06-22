import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { post, REQUEST } from '@/shared/api';
import { RAW_PATH } from '@/shared/constants';
import { userTokenAtom } from '@/shared/atom';
import { replace } from '@/shared/utils';

interface KakaoTokenRequest {
  code: string;
}

interface KakaoTokenResponse {
  kakaoEmail: string;
  tokenDto: {
    grantType: string;
    accessToken: string;
    accessTokenExpiresIn: number;
    refreshToken: string;
  };
  signedUp: boolean;
}

const submitKakaoToken = async (code: string) => {
  const response = await post<KakaoTokenRequest, KakaoTokenResponse>({
    request: REQUEST.LOGIN,
    data: { code: code },
  });
  return response.data;
};

export const useKakaoToken = () => {
  const setKakaoToken = useSetAtom(userTokenAtom);

  return useMutation<KakaoTokenResponse, Error, { code: string }>({
    mutationFn: ({ code }) => submitKakaoToken(code),
    onSuccess: data => {
      const kakaoAccessToken = data.tokenDto.accessToken;
      setKakaoToken({
        accessToken: kakaoAccessToken,
      });
      if (data.signedUp) replace(RAW_PATH.HOME);
      else {
        alert('회원가입 화면으로 이동합니다!');
        replace(RAW_PATH.SIGNUP);
      }
    },
    onError: () => {
      alert('로그인에 실패했어요. 다시 시도해 주세요!');
      replace(RAW_PATH.HOME);
    },
  });
};
