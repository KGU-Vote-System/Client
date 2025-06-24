import { REQUEST, userGet } from '@/shared/api';
import type { Election } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';

interface ElectionResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
  };
  results: Election[];
}

const fetchAllElections = async () => {
  const response = await userGet<ElectionResponse>({
    request: REQUEST.ELECTION_ALL,
  });
  if (response.data.metadata.resultCount === 0) return [];
  return response.data.results;
};

export const useFetchAllElections = () => {
  return useQuery({
    queryKey: ['elections'],
    queryFn: fetchAllElections,
  });
};
