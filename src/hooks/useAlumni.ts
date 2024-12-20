import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAlumni, createAlumni, updateAlumni, deleteAlumni } from '../services/alumni';
import type { Alumni } from '../types/alumni';

export function useAlumni() {
  const queryClient = useQueryClient();

  const alumni = useQuery({
    queryKey: ['alumni'],
    queryFn: fetchAlumni,
    staleTime: 1000, // Consider data stale after 1 second
  });

  const createMutation = useMutation({
    mutationFn: createAlumni,
    onSuccess: (newAlumni) => {
      queryClient.setQueryData(['alumni'], (old: Alumni[] = []) => [newAlumni, ...old]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Alumni> }) =>
      updateAlumni(id, data),
    onSuccess: (updatedAlumni) => {
      queryClient.setQueryData(['alumni'], (old: Alumni[] = []) =>
        old.map((item) => (item.id === updatedAlumni.id ? updatedAlumni : item))
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAlumni,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['alumni'], (old: Alumni[] = []) =>
        old.filter((item) => item.id !== deletedId)
      );
    },
  });

  return {
    alumni: alumni.data ?? [],
    isLoading: alumni.isLoading,
    error: alumni.error,
    createAlumni: createMutation.mutate,
    updateAlumni: updateMutation.mutate,
    deleteAlumni: deleteMutation.mutate,
  };
}
