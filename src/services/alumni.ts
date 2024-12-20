import { supabase } from '../lib/supabase';
import type { Alumni } from '../types/alumni';

export async function fetchAlumni() {
  const { data, error } = await supabase
    .from('alumni')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createAlumni(alumni: Omit<Alumni, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('alumni')
    .insert([alumni])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateAlumni(id: string, alumni: Partial<Alumni>) {
  const { data, error } = await supabase
    .from('alumni')
    .update(alumni)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAlumni(id: string) {
  const { error } = await supabase
    .from('alumni')
    .delete()
    .eq('id', id);

  if (error) throw error;
}