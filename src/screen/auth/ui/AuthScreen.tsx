import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useKakaoLogin } from '@/screen/auth/api';
import { LoginBg } from '@/assets/image';

import { replace } from '@/shared/utils';
import { RAW_PATH } from '@/shared/constants';
import { userTokenAtom } from '@/shared/atom';

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

  const { data, isError, isFetching } = useKakaoLogin(getCode());

  useEffect(() => {
    if (data) {
      const kakaoAccessToken = data.tokenDto.accessToken;
      setUserToken({
        accessToken: kakaoAccessToken,
      });
      if (data.signedUp) {
        replace(RAW_PATH.HOME);

        if (data.signedUp) replace(RAW_PATH.HOME);
      } else {
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
    <div className="container-mobile grid h-screen place-items-center">
      {isFetching && <div className="flex flex-col" />}
      {isError && (
        <div className="flex w-full flex-col items-center justify-center gap-2 text-lg">
          <img src={LoginBg} />
        </div>
      )}
    </div>
  );
}
