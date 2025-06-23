import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useKakaoLogin } from '@/screen/auth/api';
import { LoginBg } from '@/assets/image';

import { replace } from '@/shared/utils';
import { RAW_PATH } from '@/shared/constants';
import { userEmailAtom, userTokenAtom } from '@/shared/atom';
import { Loader } from '@/shared/ui';

export default function AuthScreen() {
  const setUserToken = useSetAtom(userTokenAtom);
  const setUserEmail = useSetAtom(userEmailAtom);
  const params = new URLSearchParams(location.search);

  const code = params.get('code');

  const { data, isError } = useKakaoLogin(code);

  useEffect(() => {
    if (data) {
      console.log('로그인 성공', data);
      if (data.signedUp) {
        const kakaoAccessToken = data.tokenDto.accessToken;
        setUserToken({
          accessToken: kakaoAccessToken,
        });
        replace(RAW_PATH.HOME);
      } else {
        const kakaoEmail = data.kakaoEmail;
        setUserEmail({
          kakaoEmail: kakaoEmail,
        });
        alert('회원가입 화면으로 이동합니다!');
        replace(RAW_PATH.SIGNUP);
      }
    }
    if (isError) {
      alert('로그인에 실패했어요. 다시 시도해 주세요!');
      replace(RAW_PATH.HOME);
    }
  }, [data, isError, setUserToken, setUserEmail]);

  return (
    <div className="container-mobile relative grid h-screen place-items-center overflow-hidden">
      <div className="mb-4 flex flex-col items-center justify-center">
        <Loader />
        <span className="text-m -m-4 text-xl font-medium">로그인 중...</span>
      </div>
      <img src={LoginBg} className="absolute inset-0 -z-1" />
    </div>
  );
}
