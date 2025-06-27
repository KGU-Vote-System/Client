import { CardList } from '@/features/admin-dashboard/ui';
import { cn } from '@/shared/utils';
import { useState } from 'react';

export default function AdminDashboardContainer() {
  const [selected, setSelected] = useState(0);
  const STATUS = ['진행중', '종료', '예정'];

  return (
    <div className="py-normal flex size-full flex-col">
      <div className="px-normal flex h-12 w-full">
        {STATUS.map((status, index) => (
          <button
            key={index}
            name={status}
            className={cn(
              selected === index ? 'border-m text-m' : 'border-sxl',
              'flex-1 cursor-pointer border-b-2',
            )}
            onClick={() => setSelected(index)}
          >
            {status}
          </button>
        ))}
      </div>
      <CardList status={STATUS[selected]} />
    </div>
  );
}
