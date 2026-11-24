/*
  Warnings:

  - The values [PAYE] on the enum `DocumentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `dateValidite` column on the `Document` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `remise` on the `Document` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(15,2)`.
  - You are about to alter the column `ajustement` on the `Document` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(15,2)`.
  - You are about to alter the column `montantHT` on the `Document` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(15,2)`.
  - You are about to alter the column `montantTVA` on the `Document` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(15,2)`.
  - You are about to alter the column `montantTTC` on the `Document` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(15,2)`.
  - Made the column `devise` on table `Document` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('NON_PAYEE', 'PARTIELLEMENT_PAYEE', 'PAYEE', 'EN_RETARD');

-- AlterEnum
BEGIN;
CREATE TYPE "DocumentStatus_new" AS ENUM ('BROUILLON', 'ENVOYE', 'EN_NEGOCIATION', 'ACCEPTE', 'REFUSE', 'EXPIRE', 'TRANSFORME_EN_COMMANDE', 'VALIDE', 'ANNULE', 'CLOTURE');
ALTER TABLE "public"."Document" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Document" ALTER COLUMN "status" TYPE "DocumentStatus_new" USING ("status"::text::"DocumentStatus_new");
ALTER TYPE "DocumentStatus" RENAME TO "DocumentStatus_old";
ALTER TYPE "DocumentStatus_new" RENAME TO "DocumentStatus";
DROP TYPE "public"."DocumentStatus_old";
ALTER TABLE "Document" ALTER COLUMN "status" SET DEFAULT 'BROUILLON';
COMMIT;

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_clientId_fkey";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'NON_PAYEE',
DROP COLUMN "dateValidite",
ADD COLUMN     "dateValidite" TIMESTAMP(3),
ALTER COLUMN "devise" SET NOT NULL,
ALTER COLUMN "remise" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "ajustement" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "montantHT" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "montantTVA" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "montantTTC" SET DATA TYPE DECIMAL(15,2);

-- CreateIndex
CREATE INDEX "Document_type_idx" ON "Document"("type");

-- CreateIndex
CREATE INDEX "Document_status_idx" ON "Document"("status");

-- CreateIndex
CREATE INDEX "Document_paymentStatus_idx" ON "Document"("paymentStatus");

-- CreateIndex
CREATE INDEX "Document_clientId_idx" ON "Document"("clientId");

-- CreateIndex
CREATE INDEX "Document_dateDocument_idx" ON "Document"("dateDocument");

-- CreateIndex
CREATE INDEX "DocumentItem_documentId_idx" ON "DocumentItem"("documentId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "BusinessPartner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
