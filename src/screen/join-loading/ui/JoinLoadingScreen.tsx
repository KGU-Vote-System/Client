import { JoinLoadingContainer } from '@/widgets/join-loading/ui';
import { AppScreen } from '@stackflow/plugin-basic-ui';

export default function JoinLoadingScreen() {
  return (
    <AppScreen preventSwipeBack>
      <JoinLoadingContainer />
    </AppScreen>
  );
}
