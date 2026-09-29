/*
  Warnings:

  - The `documentId` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Document` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `numero` on the `Document` table. All the data in the column will be lost.
  - The `id` column on the `Document` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `DocumentItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `DocumentItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[reference]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - Made the column `reference` on table `Document` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `documentId` on the `DocumentItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_documentId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentItem" DROP CONSTRAINT "DocumentItem_documentId_fkey";

-- DropIndex
DROP INDEX "Document_numero_key";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "documentId",
ADD COLUMN     "documentId" INTEGER;

-- AlterTable
ALTER TABLE "Document" DROP CONSTRAINT "Document_pkey",
DROP COLUMN "numero",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "reference" SET NOT NULL,
ADD CONSTRAINT "Document_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DocumentItem" DROP CONSTRAINT "DocumentItem_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "documentId",
ADD COLUMN     "documentId" INTEGER NOT NULL,
ADD CONSTRAINT "DocumentItem_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Document_reference_key" ON "Document"("reference");

-- CreateIndex
CREATE INDEX "DocumentItem_documentId_idx" ON "DocumentItem"("documentId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentItem" ADD CONSTRAINT "DocumentItem_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
