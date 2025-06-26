import { useMutation } from '@tanstack/react-query';
import { REQUEST, userPost } from '@/shared/api';
import type {
  CandidatePost,
  ElectionPost,
  NomineePost,
  PledgePost,
} from '@/shared/types';

const submitElection = async (data: ElectionPost) => {
  const response = await userPost({
    request: REQUEST.ELECTION,
    data: data,
  });
  return response;
};

const submitCandidate = async (data: CandidatePost) => {
  const response = await userPost({
    request: REQUEST.CANDIDATE,
    data: data,
  });
  return response;
};

const submitNominee = async (data: NomineePost) => {
  const response = await userPost({
    request: REQUEST.NOMINEE_POST,
    data: data,
  });
  return response;
};

const submitPledge = async (data: PledgePost) => {
  const response = await userPost({
    request: REQUEST.PLEDGE_POST,
    data: data,
  });
  return response;
};

export const useSubmitElection = () => {
  return useMutation({
    mutationFn: (data: ElectionPost) => submitElection(data),
  });
};

export const useSubmitCandidate = () => {
  return useMutation({
    mutationFn: (data: CandidatePost) => submitCandidate(data),
  });
};

export const useSubmitNominee = () => {
  return useMutation({
    mutationFn: (data: NomineePost) => submitNominee(data),
  });
};

export const useSubmitPledge = () => {
  return useMutation({
    mutationFn: (data: PledgePost) => submitPledge(data),
  });
};
