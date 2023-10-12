/*
  Warnings:

  - The `warranty` column on the `services` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "review_rating" ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "warranty",
ADD COLUMN     "warranty" DOUBLE PRECISION;
