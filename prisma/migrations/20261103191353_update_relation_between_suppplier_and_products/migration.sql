/*
  Warnings:

  - You are about to drop the column `productId` on the `SupplierProduct` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `SupplierProduct` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[supplierReference,productReference]` on the table `SupplierProduct` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productReference` to the `SupplierProduct` table without a default value. This is not possible if the table is not empty.
  - Made the column `supplierReference` on table `SupplierProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SupplierProduct" DROP CONSTRAINT "SupplierProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "SupplierProduct" DROP CONSTRAINT "SupplierProduct_supplierId_fkey";

-- DropIndex
DROP INDEX "SupplierProduct_productId_idx";

-- DropIndex
DROP INDEX "SupplierProduct_supplierId_productId_key";

-- AlterTable
ALTER TABLE "SupplierProduct" DROP COLUMN "productId",
DROP COLUMN "supplierId",
ADD COLUMN     "productReference" TEXT NOT NULL,
ADD COLUMN     "supplierItemReference" TEXT,
ALTER COLUMN "supplierReference" SET NOT NULL;

-- CreateIndex
CREATE INDEX "SupplierProduct_productReference_idx" ON "SupplierProduct"("productReference");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierProduct_supplierReference_productReference_key" ON "SupplierProduct"("supplierReference", "productReference");

-- AddForeignKey
ALTER TABLE "SupplierProduct" ADD CONSTRAINT "SupplierProduct_supplierReference_fkey" FOREIGN KEY ("supplierReference") REFERENCES "Supplier"("reference") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierProduct" ADD CONSTRAINT "SupplierProduct_productReference_fkey" FOREIGN KEY ("productReference") REFERENCES "Product"("reference") ON DELETE CASCADE ON UPDATE CASCADE;
