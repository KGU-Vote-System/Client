import { REQUEST, userGet } from '@/shared/api';
import type { Candidate, Nominee } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';

interface CandidateDetailResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
  };
  results: Nominee[];
}

const fetchCandidateDetail = async (id: number) => {
  const response = await userGet<CandidateDetailResponse>({
    request: REQUEST.NOMINEE.split('{candidateId}').join(`${id}`).toString(),
  });
  return response.data;
};

export const useFetchCandidateDetail = (id?: number, candidate?: Candidate) => {
  return useQuery({
    queryKey: ['candidate-detail', `${id}`],
    queryFn: () => fetchCandidateDetail(id!),
    enabled: typeof candidate !== 'undefined',
  });
};
