/*
  Warnings:

  - You are about to drop the column `IdentifiantFiscal` on the `Fournisseur` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fournisseur" DROP COLUMN "IdentifiantFiscal",
ADD COLUMN     "identifiantFiscal" TEXT;
