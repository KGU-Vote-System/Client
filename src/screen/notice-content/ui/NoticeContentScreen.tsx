import { AppScreen } from '@stackflow/plugin-basic-ui';

import { TitleAppBar } from '@/shared/ui';
import type { NoticeList } from '@/shared/types';
import type { ActivityComponentType } from '@stackflow/react';
import { NoticeContentContainer } from '@/widgets/notice-content/ui';

const NoticeContentScreen: ActivityComponentType<{
  notice: NoticeList;
}> = ({ params }: { params: { notice: NoticeList } }) => {
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
