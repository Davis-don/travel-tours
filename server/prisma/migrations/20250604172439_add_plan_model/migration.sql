-- CreateTable
CREATE TABLE "plan_tbl" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "estimatedPrice" TEXT NOT NULL,
    "agentNotes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plan_tbl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "plan_tbl_bookingId_key" ON "plan_tbl"("bookingId");

-- AddForeignKey
ALTER TABLE "plan_tbl" ADD CONSTRAINT "plan_tbl_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking_tbl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
