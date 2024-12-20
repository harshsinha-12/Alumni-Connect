import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { signIn, signUp, signOut } from '../services/auth';
import { useState } from 'react';

export function useAuth() {
  const [error, setError] = useState<string | null>(null);

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
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
  });

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