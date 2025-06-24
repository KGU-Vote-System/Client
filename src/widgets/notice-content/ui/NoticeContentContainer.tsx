import { NoticeContentSection } from '@/features/notice-content/ui';

interface NoticeContainerProps {
  title: string;
  id: number;
  date: string;
}

export default function NoticeContainer({
  title,
  id,
  date,
}: NoticeContainerProps) {
  return (
    <div className="p-normal scrollbar-hide flex size-full flex-col overflow-scroll">
      <p className="mt-mt mb-1.5 font-medium">{title}</p>
      <p className="mb-[14px] text-sm font-medium tracking-wide text-[#999]">
        {date}
      </p>
      <hr className="mb-10 text-[#DADADA]" />
      <NoticeContentSection id={id} />
    </div>
  );
}
