/*
  Warnings:

  - You are about to drop the column `contactNo` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "booking" DROP COLUMN "contactNo",
DROP COLUMN "email",
DROP COLUMN "name";
