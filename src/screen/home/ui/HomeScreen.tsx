import { AppScreen } from '@stackflow/plugin-basic-ui';

import { HomeBg } from '@/assets/image';
import { HomeAppBar } from '@/shared/ui';
import { HomeContainer } from '@/widgets/home/ui';
import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';
import { logout } from '@/shared/utils';

export default function HomeScreen() {
  const { replace, push } = useFlow();

  return (
    <AppScreen
      preventSwipeBack
      backgroundImage={`url(${HomeBg})`}
      appBar={HomeAppBar(
        () => {
          replace(PATH.LOGIN, {}, { animate: false });
          logout();
        },
        () => push(PATH.USER, {}),
      )}
    >
      <HomeContainer />
    </AppScreen>
  );
}
