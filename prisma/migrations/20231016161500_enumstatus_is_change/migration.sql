/*
  Warnings:

  - The `status` column on the `services` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Booking_status" AS ENUM ('PENDING', 'ACCEPT', 'REJECT', 'CANCEL');

-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "status" "Booking_status" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "status",
ADD COLUMN     "status" "Service_status" NOT NULL DEFAULT 'UPCOMING';

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "User_role" NOT NULL DEFAULT 'user';
