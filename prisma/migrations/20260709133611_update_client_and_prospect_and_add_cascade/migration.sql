/*
  Warnings:

  - You are about to drop the `Prospects` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('CLIENT', 'PROSPECT');

-- DropForeignKey
ALTER TABLE "ContactsFournisseur" DROP CONSTRAINT "ContactsFournisseur_fournisseurId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_adminId_fkey";

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "localisation" TEXT,
ADD COLUMN     "prospect" TEXT,
ADD COLUMN     "source" TEXT,
ADD COLUMN     "statut" TEXT,
ADD COLUMN     "type" "ClientType" NOT NULL DEFAULT 'CLIENT';

-- DropTable
DROP TABLE "Prospects";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactsFournisseur" ADD CONSTRAINT "ContactsFournisseur_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
