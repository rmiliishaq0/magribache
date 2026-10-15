/*
  Warnings:

  - The `nextFollowUpAt` column on the `BusinessPartner` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "BusinessPartner" DROP COLUMN "nextFollowUpAt",
ADD COLUMN     "nextFollowUpAt" TIMESTAMP(3);
