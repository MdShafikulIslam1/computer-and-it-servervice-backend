/*
  Warnings:

  - Added the required column `email` to the `feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedbackComments` to the `feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_userId_fkey";

-- AlterTable
ALTER TABLE "feedback" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "feedbackComments" TEXT NOT NULL,
ADD COLUMN     "isResolved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
