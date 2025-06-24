import { useFetchNoticeContent } from '../api';

export default function NoticeContentSection({ id }: { id: number }) {
  const { data } = useFetchNoticeContent(id);
  if (data)
    return (
      <div className="text-s flex flex-col gap-1 font-normal">
        {data.content.split('\n').map((line, index) => (
          <div key={index} className="mb-1">
            {line}
          </div>
        ))}
      </div>
    );

  return <></>;
}
