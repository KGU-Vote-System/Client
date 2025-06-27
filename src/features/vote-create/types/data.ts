import type { CandidatePost, ElectionPost, NomineePost } from '@/shared/types';

export type ElectionAllData = {
  election: ElectionPost;
  candidate1: {
    info: CandidatePost;
    nominee1: Omit<NomineePost, 'description'> & {
      description1: string;
      description2?: string;
      description3?: string;
    };
    nominee2: Omit<NomineePost, 'description'> & {
      description1: string;
      description2?: string;
      description3?: string;
    };
  };
  candidate2: {
    info: CandidatePost;
    nominee1: Omit<NomineePost, 'description'> & {
      description1: string;
      description2?: string;
      description3?: string;
    };
    nominee2: Omit<NomineePost, 'description'> & {
      description1: string;
      description2?: string;
      description3?: string;
    };
  };
};
