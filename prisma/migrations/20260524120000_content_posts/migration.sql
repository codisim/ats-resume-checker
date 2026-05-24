-- CreateEnum
CREATE TYPE "ContentKind" AS ENUM ('BLOG', 'CASE_STUDY');

-- AlterTable
ALTER TABLE "Blog"
ADD COLUMN     "kind" "ContentKind" NOT NULL DEFAULT 'BLOG',
ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Backfill existing rows to the default content type.
UPDATE "Blog"
SET "kind" = 'BLOG'
WHERE "kind" IS NULL;
