import { useQuery } from '@tanstack/react-query';
import { REQUEST, userGet } from '../api';
import { fetchLoginStatus } from '../utils';
import type { Role } from '../types';

interface UserInfoResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
  };
  results: [
    {
      id: 1;
      name: string;
      collegeMajorName: string;
      kakaoEmail: string;
      refreshToken: string;
      role: Role;
      studentVerified: boolean;
      studentEmail: string;
      walletAddress: string;
    },
  ];
}

export const fetchUserInfo = async () => {
  const response = await userGet<UserInfoResponse>({
    request: REQUEST.USER,
  });
  return response.data;
};

export const useFetchUserInfo = () => {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: fetchUserInfo,
    retry: 1,
    enabled: fetchLoginStatus(),
  });
};
