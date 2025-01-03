import { useQuery } from '@tanstack/react-query';
import { contestsApi } from '@/api/contest';

export const contestsQueryKeys = {
  all: ['contests'] as const,
};

export const useContests = () => {
  return useQuery({
    queryKey: contestsQueryKeys.all,
    queryFn: contestsApi.getContests,
  });
};
