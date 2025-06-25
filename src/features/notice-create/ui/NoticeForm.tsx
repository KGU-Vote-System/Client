import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import type {
  Campus,
  Replace,
  WholeCampus,
  Notice,
  NoticeType,
} from '@/shared/types';
import { CAMPUS, NOTICE_TYPE } from '@/shared/constants';
import { keys } from '@/shared/utils';
import { Button } from '@/shared/ui';

import { useSubmitNotice } from '@/features/notice-create/api';

import NoticeFormButton from './NoticeFormButton';
import NoticeFormInput from './NoticeFormInput';
import NoticeFormItem from './NoticeFormItem';

export default function NoticeForm() {
  const { mutate } = useSubmitNotice();
  const [noticeType, setNoticeType] = useState<NoticeType | undefined>();
  const [campus, setCampus] = useState<Campus[]>([]);
  const { register, handleSubmit, watch, setValue } = useForm<
    Replace<Notice, 'campus', WholeCampus>
  >({
    defaultValues: {
      startAt: '2025-06-27',
      endAt: '2025-06-28',
    },
  });
  const isFormValid =
    watch('title') &&
    watch('campus') &&
    watch('content') &&
    watch('noticeType');

  useEffect(() => {
    const value = campus.length > 1 ? ('ALL' as const) : campus[0];
    setValue('campus', value);
  }, [campus, setValue]);

  return (
    <form onSubmit={handleSubmit(data => mutate(data))}>
      <div className="p-normal scrollbar-hide size-full space-y-6 overflow-scroll pb-38">
        <NoticeFormItem label="공지 유형이 무엇인가요?" required>
          <div className="items-center space-x-[10px]">
            {keys(NOTICE_TYPE).map(noti => (
              <NoticeFormButton
                key={noti}
                label={NOTICE_TYPE[noti]}
                selected={noti === noticeType}
                onClick={() => {
                  setNoticeType(noti);
                  setValue('noticeType', noti);
                }}
              />
            ))}
          </div>
        </NoticeFormItem>
        <NoticeFormItem label="어떤 캠퍼스 공지인가요?">
          <div className="items-center space-x-[10px]">
            {keys(CAMPUS).map(cam => (
              <NoticeFormButton
                key={cam}
                label={CAMPUS[cam]}
                selected={campus.includes(cam)}
                onClick={() => {
                  setCampus(prev => {
                    if (!prev?.includes(cam)) return [cam, ...prev];
                    else return prev.filter(c => c !== cam);
                  });
                }}
              />
            ))}
          </div>
        </NoticeFormItem>
        <NoticeFormItem label="기간">
          <div className="flex w-full items-center gap-x-[10px]">
            <div className="border-sl h-[46px] flex-1 rounded-md border-[1px] px-5 py-[11px] focus:outline-none" />
            ~
            <div className="border-sl h-[46px] flex-1 rounded-md border-[1px] px-5 py-[11px] focus:outline-none" />
          </div>
        </NoticeFormItem>
        <NoticeFormItem label="제목">
          <NoticeFormInput {...register('title')} />
        </NoticeFormItem>
        <NoticeFormItem label="내용">
          <textarea
            className="border-sl h-42 w-full resize-none rounded-md border-[1px] px-5 py-[18px] focus:outline-none"
            {...register('content')}
          />
        </NoticeFormItem>
      </div>
      <div className="shadow-voteCreateDock px-normal fixed bottom-0 flex w-full gap-x-[9px] bg-white pt-4 pb-15">
        <Button
          intent={isFormValid ? 'gradient' : 'disabled'}
          disabled={!isFormValid}
          className="flex-1 text-lg"
          type="submit"
        >
          작성 완료
        </Button>
      </div>
    </form>
  );
}
