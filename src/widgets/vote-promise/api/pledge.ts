import { REQUEST, userGet } from '@/shared/api';
import type { Pledge } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';

interface PledgeResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
  };
  results: Pledge[];
}

const fetchPledgeByCandidate = async (id: number) => {
  const response = await userGet<PledgeResponse>({
    request: REQUEST.PLEDGE.split('{candidateId}').join(`${id}`),
  });
  return response.data;
};

export const useFetchPledgeData = (id: number) => {
  return useQuery({
    queryKey: [`candidate-${id}-pledge`],
    queryFn: () => fetchPledgeByCandidate(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });
};
