/*
  Warnings:

  - The values [BOOKED] on the enum `Service_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Service_status_new" AS ENUM ('UPCOMING', 'AVAILABLE', 'NOT_AVAILABLE');
ALTER TYPE "Service_status" RENAME TO "Service_status_old";
ALTER TYPE "Service_status_new" RENAME TO "Service_status";
DROP TYPE "Service_status_old";
COMMIT;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "durationInMinutes" INTEGER NOT NULL DEFAULT 0;
