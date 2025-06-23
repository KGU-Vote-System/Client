import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useKakaoLogin } from '@/screen/auth/api';
import { LoginBg } from '@/assets/image';

import { replace } from '@/shared/utils';
import { RAW_PATH } from '@/shared/constants';
import { userTokenAtom } from '@/shared/atom';
import Loader from '@/shared/ui/Loader';

export default function AuthScreen() {
  const setUserToken = useSetAtom(userTokenAtom);
  const params = new URLSearchParams(location.search);

  const getCode = () => {
    const code = params.get('code');
    if (!code) {
      alert('로그인에 실패했어요. 다시 시도해 주세요!');
      replace(RAW_PATH.HOME);
      return '';
    }
    return code;
  };

  const { data, isError } = useKakaoLogin(getCode());

  useEffect(() => {
    if (data) {
      const kakaoAccessToken = data.tokenDto.accessToken;
      setUserToken({
        accessToken: kakaoAccessToken,
      });
      if (data.signedUp) replace(RAW_PATH.HOME);
      else {
        alert('회원가입 화면으로 이동합니다!');
        replace(RAW_PATH.SIGNUP);
      }
    }
    if (isError) {
      alert('로그인에 실패했어요. 다시 시도해 주세요!');
      replace(RAW_PATH.HOME);
    }
  }, [data, isError, setUserToken]);

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
