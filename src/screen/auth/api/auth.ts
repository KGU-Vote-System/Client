import { useQuery } from '@tanstack/react-query';

import { get, REQUEST } from '@/shared/api';

interface KakaoLoginRequest {
  code: string;
}

interface KakaoLoginResponse {
  kakaoEmail: string;
  tokenDto: {
    grantType: string;
    accessToken: string;
    accessTokenExpiresIn: number;
    refreshToken: string;
  };
  signedUp: boolean;
}

const submitKakaoLogin = async (code: string) => {
  const response = await get<KakaoLoginResponse, KakaoLoginRequest>({
    request: REQUEST.LOGIN,
    params: { code: code },
  });
  return response.data;
};

export const useKakaoLogin = (code: string) => {
  return useQuery<KakaoLoginResponse>({
    queryKey: ['kakaoLogin', code],
    queryFn: () => submitKakaoLogin(code),
  });
};
