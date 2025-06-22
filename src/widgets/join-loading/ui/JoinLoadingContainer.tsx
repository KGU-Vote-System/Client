import { CharacterFlat } from '@/assets/icon';
import { RAW_PATH } from '@/shared/constants';
import { useEffect, useState } from 'react';
import { TEXT } from '../constants';
import ProgressBar from './ProgressBar';
import { replace } from '@/shared/utils';

export default function JoinLoadingContainer() {
  const [progress, setProgress] = useState(0);
  const text = progress > 50 ? 1 : 0;

  useEffect(() => {
    if (progress >= 100) replace(RAW_PATH.SIGNUP_COMPLETE);
  }, [progress]);

  return (
    <div className="grid size-full place-items-center">
      <div className="flex flex-col items-center">
        <div className="mb-5 flex flex-col items-center">
          <span className="bg-m rounded-full px-6 py-2 text-lg text-white">
            {TEXT[text].textbox}
          </span>
          <div className="border-t-m h-0 w-0 border-t-[12px] border-r-[8px] border-l-[8px] border-r-transparent border-l-transparent" />
        </div>
        <img src={CharacterFlat} className="mb-14" />
        <div className="flex flex-col items-center gap-y-8">
          <p className="text-md text-2xl font-semibold">{TEXT[text].title}</p>
          <ProgressBar
            progress={progress}
            setProgress={setProgress}
            speed={20}
          />
        </div>
        <button
          className="mt-24 cursor-pointer text-sm text-[#999] underline focus:outline-none"
          onClick={() => replace(RAW_PATH.SIGNUP)}
        >
          취소하기
        </button>
      </div>
    </div>
  );
}
