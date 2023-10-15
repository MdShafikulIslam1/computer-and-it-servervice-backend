/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" TEXT,
ADD COLUMN     "availability" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "contactNo" TEXT,
ADD COLUMN     "dateOfBirth" TEXT,
ADD COLUMN     "emergencyContactNo" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "profileImage" TEXT;

-- DropTable
DROP TABLE "profile";
