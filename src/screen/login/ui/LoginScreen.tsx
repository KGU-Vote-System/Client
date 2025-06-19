import { AppScreen } from '@stackflow/plugin-basic-ui';

import { LoginBg } from '@/assets/image';
import { LoginContainer } from '@/widgets/login/ui';
import { NoBackLogoAppBar } from '@/shared/ui';

export default function LoginScreen() {
  return (
    <AppScreen
      preventSwipeBack
      backgroundImage={`url(${LoginBg})`}
      appBar={NoBackLogoAppBar(LoginBg)}
    >
      <LoginContainer />
    </AppScreen>
  );
}
