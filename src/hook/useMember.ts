import { queryKeys } from '@/constants';
import { useStore } from '@/store';
import { getMembersByTeam, uploadMember } from '@/util/member';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useGetMembersByTeam = () => {
  const team = useStore((state) => state.team);
  const { data, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: [queryKeys.MEMBER, team],
    queryFn: () => getMembersByTeam(team),
    staleTime: 0,
  });
  return isSuccess ? data : [];
};

const useUploadMember = () => {
  const setIsLoading = useStore((state) => state.setIsLoading);
  const router = useRouter();
  return useMutation({
    mutationFn: uploadMember,
    onSuccess: () => {
      router.push(`/result`);
      setIsLoading(false);
    },
  });
};

export const useMember = () => {
  const setIsLoading = useStore((state) => state.setIsLoading);
  const members = useGetMembersByTeam();
  const uploadMember = useUploadMember();
  useEffect(() => {
    setIsLoading(uploadMember.isPending);
  }, [setIsLoading, uploadMember.isPending]);
  return { members, uploadMember };
};
