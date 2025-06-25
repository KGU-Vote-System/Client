import { REQUEST, userGet } from '@/shared/api';
import type { Election, VoteStatus } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';

const fetchElectionByStatus = async (status: VoteStatus) => {
  const response = await userGet<Election[], { status: VoteStatus }>({
    request: REQUEST.ELECTION_STATUS,
    params: { status: status },
  });
  return response.data;
};

export const useFetchElectionByStatus = (status: VoteStatus) => {
  return useQuery({
    queryKey: ['election-status', `${status}`],
    queryFn: () => fetchElectionByStatus(status),
    staleTime: 60 * 5,
  });
};
