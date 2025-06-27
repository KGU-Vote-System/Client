import { AppScreen } from '@stackflow/plugin-basic-ui';

import { TitleAppBar } from '@/shared/ui';
import { AdminVoteResultContainer } from '@/widgets/admin-vote-result/ui';

export default function NoticeCreateScreen() {
  return (
    <AppScreen backgroundColor="#fff" appBar={TitleAppBar('내 투표내역 보기')}>
      <AdminVoteResultContainer />
    </AppScreen>
  );
}
