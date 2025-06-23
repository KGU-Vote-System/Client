// import { useMutation } from '@tanstack/react-query';

// import { post, REQUEST } from '@/shared/api';
// import { RAW_PATH } from '@/shared/constants';
// import { replace } from '@/shared/utils';
// import { userTokenAtom } from '@/shared/atom';
// import { useSetAtom } from 'jotai';

// interface KakaoLoginRequest {
//   code: string;
// }

// interface KakaoLoginResponse {
//   kakaoEmail: string;
//   tokenDto: {
//     grantType: string;
//     accessToken: string;
//     accessTokenExpiresIn: number;
//     refreshToken: string;
//   };
//   signedUp: boolean;
// }

// const submitKakaoLogin = async (code: string) => {
//   const response = await post<KakaoLoginRequest, KakaoLoginResponse>({
//     request: REQUEST.LOGIN,
//     data: { code: code },
//   });
//   return response.data;
// };

// export const useKakaoLogin = () => {
//   const setKakaoLogin = useSetAtom(userTokenAtom);
//   return useMutation<KakaoLoginResponse, Error, { code: string }>({
//     mutationFn: ({ code }) => submitKakaoLogin(code),
//     onSuccess: data => {
//       const kakaoAccessToken = data.tokenDto.accessToken;
//       setKakaoLogin({
//         accessToken: kakaoAccessToken,
//       });
//       if (data.signedUp) replace(RAW_PATH.HOME);
//       else {
//         alert('회원가입 화면으로 이동합니다!');
//         replace(RAW_PATH.SIGNUP);
//       }
//     },
//     onError: () => {
//       alert('로그인에 실패했어요. 다시 시도해 주세요!');
//       replace(RAW_PATH.HOME);
//     },
//   });
// };

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
