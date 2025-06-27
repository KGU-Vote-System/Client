import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Loader } from '@/shared/ui';
import type { ActivityComponentType } from '@stackflow/react';
import type { ElectionAllData } from '@/features/vote-create/types';
import { useSubmitElection } from '@/features/vote-create/api';
import type { NomineePost } from '@/shared/types';
import { VoteBg } from '@/assets/image';

const VoteCreateLoadingScreen: ActivityComponentType<ElectionAllData> = ({
  params,
}: {
  params: ElectionAllData;
}) => {
  const getNomineeData = (
    nominee: Omit<NomineePost, 'description'> & {
      description1: string;
      description2?: string;
      description3?: string;
    },
  ): NomineePost => {
    const description = `${nominee.description1}\n${nominee.description2 || ''}\n${nominee.description3 || ''}`;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { description1, description2, description3, ...rest } = nominee;
    return { description: description, ...rest };
  };

  const candidates = [params.candidate1.info, params.candidate2.info];
  const nominees = [
    [
      getNomineeData(params.candidate1.nominee1),
      getNomineeData(params.candidate1.nominee2),
    ],
    [
      getNomineeData(params.candidate2.nominee1),
      getNomineeData(params.candidate2.nominee2),
    ],
  ];
  const pledges = [
    params.candidate1.info.description.split('\n'),
    params.candidate2.info.description.split('\n'),
  ];

  const { mutate: submitElection } = useSubmitElection(
    candidates,
    nominees,
    pledges,
  );

  useEffect(() => {
    submitElection({
      ...params.election,
      title: `${params.election.startAt.slice(0, 4)}년도 ${params.election.title}`,
    });
  }, [submitElection, params]);

  const letters = ['생', '성', '중', '.', '.', '.'];

  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  useEffect(() => {
    let step = 0;

    const interval = setInterval(() => {
      if (step < letters.length) {
        setVisibleIndex(step);
      } else if (step === letters.length) {
        setVisibleIndex(null);
      } else {
        setVisibleIndex(-1); // 모두 사라짐
      }
      step = (step + 1) % (letters.length + 2); // 순환
    }, 800);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppScreen backgroundImage={`url(${VoteBg})`}>
      <div className="grid h-screen w-full place-items-center">
        <div className="flex flex-col items-center justify-center">
          <Loader />
          <p className="text-m -mt-7 text-center text-lg font-semibold">
            투표
            {letters.map((char, i) => (
              <motion.span
                key={char + i}
                initial={{ opacity: 0 }}
                animate={{
                  opacity:
                    visibleIndex === null
                      ? 1
                      : visibleIndex === -1
                        ? 0
                        : i <= visibleIndex
                          ? 1
                          : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                {char}
              </motion.span>
            ))}
          </p>
        </div>
      </div>
    </AppScreen>
  );
};

export default VoteCreateLoadingScreen;
