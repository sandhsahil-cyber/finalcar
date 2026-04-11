-- AlterTable
ALTER TABLE "Deal" ADD COLUMN "incentiveAmount" REAL;
ALTER TABLE "Deal" ADD COLUMN "incentiveStatus" TEXT;
ALTER TABLE "Deal" ADD COLUMN "rtoNumberPlateIssued" BOOLEAN DEFAULT false;
