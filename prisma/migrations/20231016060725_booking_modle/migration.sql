-- CreateTable
CREATE TABLE "booking" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "emergencyContactNo" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "bookingItems" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);
