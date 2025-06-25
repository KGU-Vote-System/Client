import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { TitleAppBar } from '@/shared/ui';
import { VotePromiseBg } from '@/assets/image';
import { VotePromiseContainer } from '@/widgets/vote-promise/ui';
import type { Candidate, Nominee } from '@/shared/types';

const VotePledgeScreen: ActivityComponentType<{
  nominees: Array<Nominee[]>;
  candidates: Array<Candidate>;
}> = ({
  params,
}: {
  params: { nominees: Array<Nominee[]>; candidates: Array<Candidate> };
}) => {
  return (
    <AppScreen
      backgroundImage={`url(${VotePromiseBg})`}
      appBar={TitleAppBar('', VotePromiseBg)}
    >
      <VotePromiseContainer
        nomineeData={params.nominees}
        candidateData={params.candidates}
      />
    </AppScreen>
  );
};

export default VotePledgeScreen;
