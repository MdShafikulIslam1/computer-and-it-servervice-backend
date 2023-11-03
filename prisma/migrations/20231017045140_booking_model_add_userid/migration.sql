/*
  Warnings:

  - Added the required column `userId` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "userId" TEXT NOT NULL;
