/*
  Warnings:

  - The `status` column on the `Submission` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."SubmissionStatus" AS ENUM ('PENDING', 'AI_GRADED', 'TEACHER_GRADED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."FeedbackSource" AS ENUM ('AI', 'TEACHER');

-- DropForeignKey
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Feedback" ADD COLUMN     "aiProvider" TEXT,
ADD COLUMN     "costUsd" DOUBLE PRECISION,
ADD COLUMN     "modelVersion" TEXT,
ADD COLUMN     "source" "public"."FeedbackSource" NOT NULL DEFAULT 'AI',
ADD COLUMN     "tokensOutput" INTEGER,
ADD COLUMN     "tokensPrompt" INTEGER,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Submission" ADD COLUMN     "aiCostUsd" DOUBLE PRECISION,
ADD COLUMN     "aiProvider" TEXT,
ADD COLUMN     "modelVersion" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."SubmissionStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "freeUsedWriting" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Feedback_submissionId_source_idx" ON "public"."Feedback"("submissionId", "source");

-- CreateIndex
CREATE INDEX "Feedback_userId_idx" ON "public"."Feedback"("userId");

-- CreateIndex
CREATE INDEX "Submission_userId_submittedAt_idx" ON "public"."Submission"("userId", "submittedAt");

-- CreateIndex
CREATE INDEX "Submission_status_submittedAt_idx" ON "public"."Submission"("status", "submittedAt");

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
