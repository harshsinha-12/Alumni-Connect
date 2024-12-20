export interface Alumni {
  id: string;
  user_id: string;
  name: string;
  batch: number;
  graduation_year: number;
  degree: string;
  branch: string;
  email: string;
  linkedin_url: string;
  company: string;
  profile_image?: string;
  created_at: string;
}

export type FilterOptions = {
  batch?: number;
  graduation_year?: number;
  degree?: string;
  branch?: string;
  company?: string;
}