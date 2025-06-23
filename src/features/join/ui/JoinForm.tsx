import { useSetAtom } from 'jotai';
import { useForm } from 'react-hook-form';

import { userModeAtom } from '@/shared/atom';
import { Button, Input } from '@/shared/ui';
import type { User } from '@/shared/types';
import { useUserJoin } from '../api';
import { fetchSessionData } from '@/shared/utils';

export default function JoinForm() {
  const setUserMode = useSetAtom(userModeAtom);
  const userEmail = fetchSessionData<{ kakaoEmail: string }>('userEmail');
  const { mutate } = useUserJoin();

  const generateRandomString = (length = 19) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const { register, handleSubmit } = useForm<User>({
    defaultValues: {
      kakaoEmail: userEmail?.kakaoEmail || '',
      name: '',
      collegeMajorName: '컴퓨터공학전공',
      studentEmail: `${generateRandomString()}@kyonggi.ac.kr`,
      walletAddress: '0x1234abcd5678',
      keyId: 'kas-key-id',
      krn: 'krn:1001:abcd',
    },
  });

  return (
    <form
      className="flex flex-col gap-y-12"
      onSubmit={handleSubmit(data => {
        mutate({ data });
      })}
    >
      <div className="w-full space-y-3">
        <Input
          intent="login"
          placeholder="이름"
          {...register('name', { required: true })}
        />
        <Input intent="login" placeholder="비밀번호" type="password" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-s h-[0.5px] flex-1" />
          <span className="text-s text-sm">가입 방식</span>
          <div className="bg-s h-[0.5px] flex-1" />
        </div>
        <Button
          intent="login"
          className="py-[14px] text-lg"
          type="submit"
          onClick={() => {
            setUserMode({ mode: 'STUDENT' as const });
          }}
        >
          학생으로 시작하기
        </Button>
        <Button
          intent="loginWhite"
          className="py-[14px] text-lg"
          type="submit"
          onClick={() => {
            setUserMode({ mode: 'ADMIN' as const });
          }}
        >
          관리자로 시작하기
        </Button>
      </div>
    </form>
  );
}
