import { AppScreen } from '@stackflow/plugin-basic-ui';

import { LoginBg } from '@/assets/image';
import { JoinContainer } from '@/widgets/join/ui';
import { NoBackLogoAppBar } from '@/shared/ui';

export default function JoinScreen() {
  return (
    <AppScreen
      preventSwipeBack
      backgroundImage={`url(${LoginBg})`}
      appBar={NoBackLogoAppBar(LoginBg)}
    >
      <JoinContainer />
    </AppScreen>
  );
}
