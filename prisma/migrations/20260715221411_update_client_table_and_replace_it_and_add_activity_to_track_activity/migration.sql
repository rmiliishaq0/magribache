/*
  Warnings:

  - You are about to drop the column `defaultColor` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `footerText` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `signature` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `localisation` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `prospect` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `statut` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Client` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContactsFournisseur" DROP CONSTRAINT "ContactsFournisseur_fournisseurId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_adminId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "defaultColor",
DROP COLUMN "footerText",
DROP COLUMN "signature";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "localisation",
DROP COLUMN "prospect",
DROP COLUMN "source",
DROP COLUMN "statut",
DROP COLUMN "type";

-- DropEnum
DROP TYPE "ClientType";

-- CreateTable
CREATE TABLE "Prospects" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prospect" TEXT,
    "email" TEXT,
    "téléphone" TEXT,
    "statut" TEXT,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "localisation" TEXT,

    CONSTRAINT "Prospects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prospects_email_key" ON "Prospects"("email");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactsFournisseur" ADD CONSTRAINT "ContactsFournisseur_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
