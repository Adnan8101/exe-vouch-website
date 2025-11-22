-- AlterTable
-- Remove autoincrement from vouchNumber field
-- This allows manual control of vouchNumber to avoid gaps when vouches are deleted

-- Drop the default sequence for vouchNumber
ALTER TABLE "Vouch" ALTER COLUMN "vouchNumber" DROP DEFAULT;

-- Drop the sequence if it exists
DROP SEQUENCE IF EXISTS "Vouch_vouchNumber_seq";
