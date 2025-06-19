import { AppScreen } from '@stackflow/plugin-basic-ui';

import { VoteBg } from '@/assets/image';
import { TitleAppBar } from '@/shared/ui';
import { EntryContainer } from '@/widgets/entry/ui';

export default function EntryScreen() {
  return (
    <AppScreen
      preventSwipeBack
      backgroundImage={`url(${VoteBg})`}
      appBar={TitleAppBar('', VoteBg)}
    >
      <EntryContainer />
    </AppScreen>
  );
}
