import { motion } from 'framer-motion';
import { Character, KakaoIcon, TextBoxIcon } from '@/assets/icon';
import { Button } from '@/shared/ui';
import { replace } from '@/shared/utils';
import { RAW_PATH } from '@/shared/constants';

export default function LoginContainer() {
  const handleClick = () => {
    replace(RAW_PATH.SIGNUP); // 개발용 임시
    // window.location.replace(
    //   `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}`,
    // );
  };

  return (
    <div className="flex size-full flex-col overflow-hidden">
      <div className="-ml-[14px] w-[500px]">
        <img src={Character} className="h-full w-full object-cover" />
      </div>
      <div className="absolute bottom-0 z-10 flex h-[70%] w-full flex-col items-center rounded-t-lg border-t-[2px] border-white bg-white/50 p-10 backdrop-blur-[2px]">
        <div className="relative">
          <img src={TextBoxIcon} className="w-63" />
          <span className="absolute top-2.25 left-1/2 z-20 -translate-x-1/2 text-lg font-semibold text-nowrap text-white">
            간단하게, 빠르게, 안전하게
          </span>
        </div>
        <motion.span
          className="text-m logo -mt-4 text-[86px] font-bold"
          animate={{ scale: [1.2, 1.0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          took!
        </motion.span>
        <div className="mt-16 w-full space-y-5">
          <Button
            intent="kakao"
            className="flex items-center justify-center gap-2 py-[14px] text-lg"
            onClick={handleClick}
          >
            <img src={KakaoIcon} />
            카카오 로그인
          </Button>
          <p className="text-s text-center text-lg">
            간편로그인 후 이용 가능합니다
          </p>
        </div>
      </div>
    </div>
  );
}
