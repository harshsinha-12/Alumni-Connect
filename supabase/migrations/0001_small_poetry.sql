/*
  # Create Alumni Database Schema

  1. New Tables
    - `alumni`
      - `id` (uuid, primary key)
      - `name` (text)
      - `batch` (integer)
      - `graduation_year` (integer)
      - `degree` (text)
      - `email` (text, unique)
      - `linkedin_url` (text)
      - `company` (text)
      - `profile_image` (text, nullable)
      - `created_at` (timestamp with timezone)
      - `user_id` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `alumni` table
    - Add policies for:
      - Anyone can view alumni profiles
      - Only authenticated users can create their own profile
      - Users can only update their own profile
*/

CREATE TABLE alumni (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  batch integer NOT NULL,
  graduation_year integer NOT NULL,
  degree text NOT NULL,
  email text UNIQUE NOT NULL,
  linkedin_url text NOT NULL,
  company text NOT NULL,
  profile_image text,
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_batch_year CHECK (batch > 1900 AND batch <= date_part('year', CURRENT_DATE)),
  CONSTRAINT valid_graduation_year CHECK (graduation_year >= batch AND graduation_year <= date_part('year', CURRENT_DATE) + 10)
);

-- Enable RLS
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view alumni profiles"
  ON alumni
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create their own profile"
  ON alumni
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON alumni
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);