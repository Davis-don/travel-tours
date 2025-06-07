-- DropForeignKey
ALTER TABLE "booking_tbl" DROP CONSTRAINT "booking_tbl_clientId_fkey";

-- AddForeignKey
ALTER TABLE "booking_tbl" ADD CONSTRAINT "booking_tbl_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client_tbl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
