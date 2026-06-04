/*
  Warnings:

  - You are about to drop the column `Catégories` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `IdentifiantFiscal` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `Pays` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `Téléphone` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `Ville` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `ContactsFournisseur` table. All the data in the column will be lost.
  - You are about to drop the column `supplier` on the `ContactsFournisseur` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Fournisseur` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Client_Email_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "Catégories",
DROP COLUMN "Email",
DROP COLUMN "IdentifiantFiscal",
DROP COLUMN "Pays",
DROP COLUMN "Téléphone",
DROP COLUMN "Ville",
ADD COLUMN     "catégories" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "identifiantFiscal" TEXT,
ADD COLUMN     "pays" TEXT,
ADD COLUMN     "téléphone" TEXT,
ADD COLUMN     "ville" TEXT;

-- AlterTable
ALTER TABLE "ContactsFournisseur" DROP COLUMN "phone",
DROP COLUMN "supplier",
ADD COLUMN     "Fournisseur" TEXT,
ADD COLUMN     "téléphone" TEXT;

-- AlterTable
ALTER TABLE "Fournisseur" DROP COLUMN "phone",
ADD COLUMN     "téléphone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
