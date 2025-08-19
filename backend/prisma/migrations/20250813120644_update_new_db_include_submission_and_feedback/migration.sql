-- AlterTable
ALTER TABLE "public"."Feedback" ADD COLUMN     "coherence" DOUBLE PRECISION,
ADD COLUMN     "grammar" DOUBLE PRECISION,
ADD COLUMN     "highlights" JSONB,
ADD COLUMN     "lexical" DOUBLE PRECISION,
ADD COLUMN     "taskResponse" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."Submission" ADD COLUMN     "gradedAt" TIMESTAMP(3),
ADD COLUMN     "promptId" INTEGER,
ADD COLUMN     "teacherScore" DOUBLE PRECISION,
ADD COLUMN     "wordCount" INTEGER;
