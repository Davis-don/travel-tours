-- CreateTable
CREATE TABLE "booking_tbl" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "travelDates" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "travelers" TEXT NOT NULL,
    "preferences" TEXT NOT NULL,
    "specialRequests" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_tbl_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booking_tbl" ADD CONSTRAINT "booking_tbl_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client_tbl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
