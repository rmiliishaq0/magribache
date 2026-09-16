/*
  Warnings:

  - You are about to drop the column `ajustement` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `dateDocument` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `dateValidite` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `devise` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `montantHT` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `montantTTC` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `montantTVA` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `objet` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `remise` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `article` on the `DocumentItem` table. All the data in the column will be lost.
  - You are about to drop the column `montantHT` on the `DocumentItem` table. All the data in the column will be lost.
  - You are about to drop the column `montantTTC` on the `DocumentItem` table. All the data in the column will be lost.
  - You are about to drop the column `prixUnitaire` on the `DocumentItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantite` on the `DocumentItem` table. All the data in the column will be lost.
  - You are about to drop the column `remise` on the `DocumentItem` table. All the data in the column will be lost.
  - You are about to drop the column `taxe` on the `DocumentItem` table. All the data in the column will be lost.
  - Added the required column `product` to the `DocumentItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Document_dateDocument_idx";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "ajustement",
DROP COLUMN "dateDocument",
DROP COLUMN "dateValidite",
DROP COLUMN "devise",
DROP COLUMN "montantHT",
DROP COLUMN "montantTTC",
DROP COLUMN "montantTVA",
DROP COLUMN "objet",
DROP COLUMN "remise",
ADD COLUMN     "adjustment" DECIMAL(15,2) NOT NULL DEFAULT 0,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'MAD',
ADD COLUMN     "discount" DECIMAL(15,2) NOT NULL DEFAULT 0,
ADD COLUMN     "documentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "subtotal" DECIMAL(15,2) NOT NULL DEFAULT 0,
ADD COLUMN     "taxAmount" DECIMAL(15,2) NOT NULL DEFAULT 0,
ADD COLUMN     "totalAmount" DECIMAL(15,2) NOT NULL DEFAULT 0,
ADD COLUMN     "validUntil" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "DocumentItem" DROP COLUMN "article",
DROP COLUMN "montantHT",
DROP COLUMN "montantTTC",
DROP COLUMN "prixUnitaire",
DROP COLUMN "quantite",
DROP COLUMN "remise",
DROP COLUMN "taxe",
ADD COLUMN     "product" TEXT NOT NULL,
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Document_documentDate_idx" ON "Document"("documentDate");
