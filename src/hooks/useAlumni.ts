import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAlumni, createAlumni, updateAlumni, deleteAlumni } from '../services/alumni';
import type { Alumni } from '../types/alumni';
export function useAlumni() {
  const queryClient = useQueryClient();
  const alumni = useQuery({
    queryKey: ['alumni'],
    queryFn: fetchAlumni,
  });
  const createMutation = useMutation({
    mutationFn: createAlumni,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumni'] });
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Alumni> }) =>
      updateAlumni(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumni'] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteAlumni,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumni'] });
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
