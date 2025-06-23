import { useEffect } from 'react';
import { useKakaoLogin } from '@/screen/auth/api';
import { LoginBg } from '@/assets/image';

import Loader from '@/shared/ui/Loader';

export default function AuthScreen() {
  const params = new URLSearchParams(location.search);
  const code = params.get('code');

  const { mutate } = useKakaoLogin();

  useEffect(() => {
    if (code) mutate({ code });
  }, [code, mutate]);

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
