/*
  Warnings:

  - You are about to drop the column `conditions` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "conditions",
DROP COLUMN "currency",
ADD COLUMN     "bank" TEXT,
ADD COLUMN     "chequeNum" TEXT,
ADD COLUMN     "paymentMethod" TEXT;
