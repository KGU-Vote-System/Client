import { useEffect } from 'react';
import { useKakaoToken } from '@/screen/auth/api';
import { LoginBg } from '@/assets/image';

export default function AuthScreen() {
  const params = new URLSearchParams(location.search);
  const code = params.get('code');

  const { mutate, isPending, isError } = useKakaoToken();

  useEffect(() => {
    if (code) mutate({ code });
  }, [code, mutate]);

  return (
    <div className="container-mobile grid h-screen place-items-center">
      {isPending && <div className="flex flex-col"></div>}
      {isError && (
        <div className="flex w-full flex-col items-center justify-center gap-2 text-lg">
          <img src={LoginBg} />
        </div>
      )}
    </div>
  );
}
