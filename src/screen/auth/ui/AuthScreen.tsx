import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useKakaoLogin } from '@/screen/auth/api';
import { LoginBg } from '@/assets/image';

import { replace } from '@/shared/utils';
import { RAW_PATH } from '@/shared/constants';
import { userEmailAtom, userTokenAtom } from '@/shared/atom';
import { Loader } from '@/shared/ui';
import { useFetchUserInfo } from '@/shared/hook';

export default function AuthScreen() {
  const setUserToken = useSetAtom(userTokenAtom);
  const setUserEmail = useSetAtom(userEmailAtom);
  const params = new URLSearchParams(location.search);

  const code = params.get('code');

  const { data, isError } = useKakaoLogin(code);
  const { refetch: fetchUserData } = useFetchUserInfo();

  useEffect(() => {
    const handleLogin = async () => {
      if (!data) return;
      if (data.signedUp) {
        try {
          const kakaoAccessToken = data.tokenDto.accessToken;
          await setUserToken({ accessToken: kakaoAccessToken });
          const userData = await fetchUserData();
          const userInfo = userData.data?.results?.[0];
          if (userInfo) {
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
          }
          replace(RAW_PATH.HOME);
        } catch (error) {
          console.error('로그인 후 처리 중 오류', error);
          alert('사용자 정보를 불러오는 데 실패했어요. 다시 시도해 주세요.');
          replace(RAW_PATH.HOME);
        }
      } else {
        setUserEmail({ kakaoEmail: data.kakaoEmail });
        alert('회원가입 화면으로 이동합니다!');
        replace(RAW_PATH.SIGNUP);
      }
    };

    if (data) handleLogin();
    if (isError) {
      alert('로그인에 실패했어요. 다시 시도해 주세요!');
      replace(RAW_PATH.HOME);
    }
  }, [data, isError, setUserToken, setUserEmail, fetchUserData]);

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
