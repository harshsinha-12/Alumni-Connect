import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { signIn, signUp, signOut } from '../services/auth';
import { useState } from 'react';

export function useAuth() {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const session = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      setError(null);
      try {
        return await signUp(email, password);
      } catch (err: any) {
        setError(err.message || 'Failed to create account');
        throw err;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['session'], data.session);
    },
  });

  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      setError(null);
      try {
        return await signIn(email, password);
      } catch (err: any) {
        setError(err.message || 'Invalid login credentials');
        throw err;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['session'], data.session);
    },
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData(['session'], null);
    },
  });

  // Listen for auth state changes
  React.useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(['session'], session);
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  return {
    session: session.data,
    isLoading: session.isLoading,
    error,
    signUp: signUpMutation.mutate,
    signIn: signInMutation.mutate,
    signOut: signOutMutation.mutate,
    isSigningUp: signUpMutation.isPending,
    isSigningIn: signInMutation.isPending,
  };
}
