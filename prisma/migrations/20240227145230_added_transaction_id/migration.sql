/*
  Warnings:

  - You are about to drop the column `transaction` on the `payments` table. All the data in the column will be lost.
  - Added the required column `transactionId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "transaction",
ADD COLUMN     "transactionId" TEXT NOT NULL;
