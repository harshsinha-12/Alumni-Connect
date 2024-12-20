/*
  # Add branch column to alumni table

  1. Changes
    - Add `branch` column to `alumni` table
      - Required text field to store the academic branch/specialization
      - e.g., "Computer Science", "Mechanical Engineering", etc.

  2. Security
    - No changes to RLS policies needed as the column inherits existing table policies
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'alumni' AND column_name = 'branch'
  ) THEN
    ALTER TABLE alumni ADD COLUMN branch text NOT NULL DEFAULT '';
  END IF;
END $$;