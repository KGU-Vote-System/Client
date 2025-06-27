import { useQuery } from '@tanstack/react-query';
import { REQUEST, userGet } from '@/shared/api';
import type { Candidate } from '@/shared/types';

interface ElectionDetailResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
  };
  results: Candidate[];
}

const fetchElectionDetail = async (id: number) => {
  const response = await userGet<ElectionDetailResponse>({
    request: REQUEST.CANDIDATE_ALL + `${id}`,
  });
  return response.data;
};

export const useFetchElectionDetail = (id: number) => {
  return useQuery<ElectionDetailResponse>({
    queryKey: ['election-detail', `${id}`],
    queryFn: () => fetchElectionDetail(id),
  });
};
