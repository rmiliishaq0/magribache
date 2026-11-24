/*
  Warnings:

  - The `productId` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `FinishedProductUnit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `FinishedProductUnit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `productionOrderId` column on the `FinishedProductUnit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `GoodsReceipt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GoodsReceipt` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `GoodsReceiptLine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GoodsReceiptLine` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PurchaseOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PurchaseOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PurchaseOrderLine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PurchaseOrderLine` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `StockLot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `StockLot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `supplierId` column on the `StockLot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `goodsReceiptId` column on the `StockLot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `StockMovement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `StockMovement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `stockLotId` column on the `StockMovement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Supplier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Supplier` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SupplierProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SupplierProduct` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `productId` on the `FinishedProductUnit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `supplierId` on the `GoodsReceipt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `purchaseOrderId` on the `GoodsReceipt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `goodsReceiptId` on the `GoodsReceiptLine` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `purchaseOrderLineId` on the `GoodsReceiptLine` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `productId` on the `GoodsReceiptLine` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `supplierId` on the `PurchaseOrder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `purchaseOrderId` on the `PurchaseOrderLine` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `productId` on the `PurchaseOrderLine` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `productId` on the `StockLot` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `productId` on the `StockMovement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `supplierId` on the `SupplierProduct` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `productId` on the `SupplierProduct` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_productId_fkey";

-- DropForeignKey
ALTER TABLE "FinishedProductUnit" DROP CONSTRAINT "FinishedProductUnit_productId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsReceipt" DROP CONSTRAINT "GoodsReceipt_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsReceipt" DROP CONSTRAINT "GoodsReceipt_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsReceiptLine" DROP CONSTRAINT "GoodsReceiptLine_goodsReceiptId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsReceiptLine" DROP CONSTRAINT "GoodsReceiptLine_productId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsReceiptLine" DROP CONSTRAINT "GoodsReceiptLine_purchaseOrderLineId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrderLine" DROP CONSTRAINT "PurchaseOrderLine_productId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrderLine" DROP CONSTRAINT "PurchaseOrderLine_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "StockLot" DROP CONSTRAINT "StockLot_productId_fkey";

-- DropForeignKey
ALTER TABLE "StockLot" DROP CONSTRAINT "StockLot_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "StockMovement" DROP CONSTRAINT "StockMovement_productId_fkey";

-- DropForeignKey
ALTER TABLE "StockMovement" DROP CONSTRAINT "StockMovement_stockLotId_fkey";

-- DropForeignKey
ALTER TABLE "SupplierProduct" DROP CONSTRAINT "SupplierProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "SupplierProduct" DROP CONSTRAINT "SupplierProduct_supplierId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER;

-- AlterTable
ALTER TABLE "FinishedProductUnit" DROP CONSTRAINT "FinishedProductUnit_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER NOT NULL,
DROP COLUMN "productionOrderId",
ADD COLUMN     "productionOrderId" INTEGER,
ADD CONSTRAINT "FinishedProductUnit_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GoodsReceipt" DROP CONSTRAINT "GoodsReceipt_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "supplierId",
ADD COLUMN     "supplierId" INTEGER NOT NULL,
DROP COLUMN "purchaseOrderId",
ADD COLUMN     "purchaseOrderId" INTEGER NOT NULL,
ADD CONSTRAINT "GoodsReceipt_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GoodsReceiptLine" DROP CONSTRAINT "GoodsReceiptLine_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "goodsReceiptId",
ADD COLUMN     "goodsReceiptId" INTEGER NOT NULL,
DROP COLUMN "purchaseOrderLineId",
ADD COLUMN     "purchaseOrderLineId" INTEGER NOT NULL,
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "GoodsReceiptLine_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "supplierId",
ADD COLUMN     "supplierId" INTEGER NOT NULL,
ADD CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PurchaseOrderLine" DROP CONSTRAINT "PurchaseOrderLine_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "purchaseOrderId",
ADD COLUMN     "purchaseOrderId" INTEGER NOT NULL,
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "PurchaseOrderLine_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StockLot" DROP CONSTRAINT "StockLot_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER NOT NULL,
DROP COLUMN "supplierId",
ADD COLUMN     "supplierId" INTEGER,
DROP COLUMN "goodsReceiptId",
ADD COLUMN     "goodsReceiptId" INTEGER,
ADD CONSTRAINT "StockLot_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StockMovement" DROP CONSTRAINT "StockMovement_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER NOT NULL,
DROP COLUMN "stockLotId",
ADD COLUMN     "stockLotId" INTEGER,
ADD CONSTRAINT "StockMovement_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SupplierProduct" DROP CONSTRAINT "SupplierProduct_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "supplierId",
ADD COLUMN     "supplierId" INTEGER NOT NULL,
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "SupplierProduct_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "FinishedProductUnit_productId_idx" ON "FinishedProductUnit"("productId");

-- CreateIndex
CREATE INDEX "GoodsReceipt_purchaseOrderId_idx" ON "GoodsReceipt"("purchaseOrderId");

-- CreateIndex
CREATE INDEX "GoodsReceipt_supplierId_idx" ON "GoodsReceipt"("supplierId");

-- CreateIndex
CREATE INDEX "GoodsReceiptLine_goodsReceiptId_idx" ON "GoodsReceiptLine"("goodsReceiptId");

-- CreateIndex
CREATE INDEX "GoodsReceiptLine_productId_idx" ON "GoodsReceiptLine"("productId");

-- CreateIndex
CREATE INDEX "PurchaseOrder_supplierId_idx" ON "PurchaseOrder"("supplierId");

-- CreateIndex
CREATE INDEX "PurchaseOrderLine_purchaseOrderId_idx" ON "PurchaseOrderLine"("purchaseOrderId");

-- CreateIndex
CREATE INDEX "PurchaseOrderLine_productId_idx" ON "PurchaseOrderLine"("productId");

-- CreateIndex
CREATE INDEX "StockLot_productId_entryDate_idx" ON "StockLot"("productId", "entryDate");

-- CreateIndex
CREATE INDEX "StockLot_supplierId_idx" ON "StockLot"("supplierId");

-- CreateIndex
CREATE INDEX "StockMovement_productId_idx" ON "StockMovement"("productId");

-- CreateIndex
CREATE INDEX "StockMovement_stockLotId_idx" ON "StockMovement"("stockLotId");

-- CreateIndex
CREATE INDEX "SupplierProduct_productId_idx" ON "SupplierProduct"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierProduct_supplierId_productId_key" ON "SupplierProduct"("supplierId", "productId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierProduct" ADD CONSTRAINT "SupplierProduct_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierProduct" ADD CONSTRAINT "SupplierProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderLine" ADD CONSTRAINT "PurchaseOrderLine_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderLine" ADD CONSTRAINT "PurchaseOrderLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceipt" ADD CONSTRAINT "GoodsReceipt_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceipt" ADD CONSTRAINT "GoodsReceipt_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptLine" ADD CONSTRAINT "GoodsReceiptLine_goodsReceiptId_fkey" FOREIGN KEY ("goodsReceiptId") REFERENCES "GoodsReceipt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptLine" ADD CONSTRAINT "GoodsReceiptLine_purchaseOrderLineId_fkey" FOREIGN KEY ("purchaseOrderLineId") REFERENCES "PurchaseOrderLine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptLine" ADD CONSTRAINT "GoodsReceiptLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLot" ADD CONSTRAINT "StockLot_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLot" ADD CONSTRAINT "StockLot_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_stockLotId_fkey" FOREIGN KEY ("stockLotId") REFERENCES "StockLot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedProductUnit" ADD CONSTRAINT "FinishedProductUnit_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
