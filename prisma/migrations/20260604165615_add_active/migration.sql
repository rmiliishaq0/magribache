/*
  Warnings:

  - You are about to drop the column `entreprise` on the `Contacts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contacts" DROP COLUMN "entreprise";

-- AlterTable
ALTER TABLE "ContactsFournisseur" ADD COLUMN     "actif" TEXT;
