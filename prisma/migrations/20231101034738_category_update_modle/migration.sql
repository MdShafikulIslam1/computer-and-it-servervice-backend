/*
  Warnings:

  - Made the column `description` on table `category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logo` on table `category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "category" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "logo" SET NOT NULL;
