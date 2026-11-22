-- AlterEnum
ALTER TYPE "EntityType" ADD VALUE 'PURCHASE_ORDER';

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "purchaseOrderId" INTEGER;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
