import { useMutation } from '@tanstack/react-query';
import { REQUEST, userPost } from '@/shared/api';
import type {
  Candidate,
  CandidatePost,
  Election,
  ElectionPost,
  NomineePost,
  PledgePost,
} from '@/shared/types';
import type { BaseResponse } from '@/shared/types/response';
import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';

interface ElectionResponse extends BaseResponse {
  results: Election[];
}

interface CandidateResponse extends BaseResponse {
  results: Candidate[];
}

const submitElection = async (data: ElectionPost) => {
  const response = await userPost<ElectionPost, ElectionResponse>({
    request: REQUEST.ELECTION,
    data: data,
  });
  return response.data;
};

const submitCandidate = async (data: CandidatePost, electionId: number) => {
  const response = await userPost<
    CandidatePost & Pick<Candidate, 'electionId'>,
    CandidateResponse
  >({
    request: REQUEST.CANDIDATE,
    data: { ...data, electionId: electionId },
  });
  return response.data;
};

const submitNominee = async (data: NomineePost, candidateId: number) => {
  const response = await userPost<NomineePost>({
    request: REQUEST.NOMINEE_POST + `${candidateId}`,
    data: data,
  });
  return response.data;
};

const submitPledge = async (data: PledgePost[], candidateId: number) => {
  const response = await userPost({
    request: REQUEST.PLEDGE_POST + `${candidateId}`,
    data: data,
  });
  return response;
};

export const useSubmitElection = (
  candidates: CandidatePost[],
  nominees: NomineePost[][],
  pledges: string[][],
) => {
  const { mutateAsync: submitCandidate1 } = useSubmitCandidate(
    nominees[0],
    pledges[0],
  );
  const { mutateAsync: submitCandidate2 } = useSubmitCandidate(
    nominees[1],
    pledges[1],
  );

  return useMutation({
    mutationFn: (data: ElectionPost) => submitElection(data),
    onSuccess: data => {
      const electionId = data.results[0].id;
      submitCandidate1({
        data: candidates[0],
        electionId: electionId,
      }).then(() =>
        submitCandidate2({
          data: candidates[1],
          electionId: electionId,
        }),
      );
    },
  });
};

export const useSubmitCandidate = (
  nominees: NomineePost[],
  pledges: string[],
) => {
  const { mutateAsync: submitNominee } = useSubmitNominee();
  const { mutate } = useSubmitPledge();

  return useMutation({
    mutationFn: ({
      data,
      electionId,
    }: {
      data: CandidatePost;
      electionId: number;
    }) => submitCandidate(data, electionId),
    onSuccess: data => {
      const candidateId = data.results[0].id;
      submitNominee({ data: nominees[0], candidateId: candidateId }).then(() =>
        submitNominee({ data: nominees[1], candidateId: candidateId }).then(
          () =>
            mutate({
              data: pledges.map(pledge => ({ description: pledge })),
              candidateId: candidateId,
            }),
        ),
      );
    },
  });
};

export const useSubmitNominee = () => {
  return useMutation({
    mutationFn: ({
      data,
      candidateId,
    }: {
      data: NomineePost;
      candidateId: number;
    }) => submitNominee(data, candidateId),
  });
};

export const useSubmitPledge = () => {
  const { replace } = useFlow();

  return useMutation({
    mutationFn: ({
      data,
      candidateId,
    }: {
      data: PledgePost[];
      candidateId: number;
    }) => submitPledge(data, candidateId),
    onSuccess: () => replace(PATH.VOTE_CREATE_COMPLETE, {}),
  });
};
