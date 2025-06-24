import { AppScreen } from '@stackflow/plugin-basic-ui';

import { TitleAppBar } from '@/shared/ui';
import type { Notice } from '@/features/notice/types';
import type { ActivityComponentType } from '@stackflow/react';
import { NoticeContentContainer } from '@/widgets/notice-content/ui';

const NoticeContentScreen: ActivityComponentType<{
  notice: Omit<Notice, 'noticeType'>;
}> = ({ params }: { params: { notice: Omit<Notice, 'noticeType'> } }) => {
  const { title, id, startAt, endAt } = params.notice;
  return (
    <AppScreen backgroundColor="#fff" appBar={TitleAppBar('공지사항')}>
      <NoticeContentContainer
        title={title}
        id={id}
        date={`${startAt} - ${endAt}`}
      />
    </AppScreen>
  );
};

export default NoticeContentScreen;
