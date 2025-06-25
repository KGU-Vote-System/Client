import { AppScreen } from '@stackflow/plugin-basic-ui';
import type { ActivityComponentType } from '@stackflow/react';

import { TitleAppBar } from '@/shared/ui';
import { VoteBg } from '@/assets/image';
import { VoteContainer } from '@/widgets/vote/ui';

const VoteScreen: ActivityComponentType<{
  id: number;
  title: string;
}> = ({ params }: { params: { id: number; title: string } }) => {
  return (
    <AppScreen
      backgroundImage={`url(${VoteBg})`}
      appBar={TitleAppBar('', VoteBg)}
    >
      <VoteContainer electionId={params.id} title={params.title} />
    </AppScreen>
  );
};

export default VoteScreen;
