import { useState } from 'react';

import { cn } from '@/shared/utils';
import { NoticeList } from '@/features/notice/ui';
import type { Campus } from '@/shared/types';

export default function NoticeContainer() {
  const [selected, setSelected] = useState(0);
  const CAMPUS: Record<string, Campus> = {
    수원캠: 'SUWON',
    서울캠: 'SEOUL',
  };
  return (
    <div className="p-normal flex size-full flex-col pt-0">
      <div className="mt-mt mb-[22px] box-border flex h-13 w-full rounded-[16px] bg-[#F7F7F9] p-0.5 text-lg font-semibold">
        {Object.keys(CAMPUS).map((campusName, index) => (
          <button
            key={campusName}
            name={campusName}
            className={cn(
              selected === index ? 'text-m bg-white' : 'text-[#999]',
              'grid h-full flex-1 cursor-pointer place-items-center rounded-[16px] transition duration-150 focus:outline-none',
            )}
            onClick={() => setSelected(index)}
          >
            {campusName}
          </button>
        ))}
      </div>
      <NoticeList campus={Object.values(CAMPUS)[selected]} />
    </div>
  );
}
