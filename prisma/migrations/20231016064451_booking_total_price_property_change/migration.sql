/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `booking` table. All the data in the column will be lost.
  - Added the required column `price` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" DROP COLUMN "totalPrice",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
