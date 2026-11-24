/*
  Warnings:

  - The values [PROSPECT,CLIENT,ARCHIVED] on the enum `PartnerStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `partnerId` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BusinessPartner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `BusinessPartner` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `clientId` on the `Document` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PartnerType" AS ENUM ('PROSPECT', 'CLIENT', 'ARCHIVED');

-- AlterEnum
BEGIN;
CREATE TYPE "PartnerStatus_new" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'QUOTE_TO_PREPARE', 'QUOTE_SENT', 'NEGOTIATION', 'WON', 'LOST', 'FOLLOW_UP_LATER', 'ACTIVE', 'GOOD_CLIENT', 'TO_MONITOR', 'INACTIVE', 'BLOCKED');
ALTER TABLE "public"."BusinessPartner" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "BusinessPartner" ALTER COLUMN "status" TYPE "PartnerStatus_new" USING ("status"::text::"PartnerStatus_new");
ALTER TYPE "PartnerStatus" RENAME TO "PartnerStatus_old";
ALTER TYPE "PartnerStatus_new" RENAME TO "PartnerStatus";
DROP TYPE "public"."PartnerStatus_old";
ALTER TABLE "BusinessPartner" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_partnerId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_clientId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "partnerId",
ADD COLUMN     "partnerId" INTEGER;

-- AlterTable
ALTER TABLE "BusinessPartner" DROP CONSTRAINT "BusinessPartner_pkey",
ADD COLUMN     "type" "PartnerType" NOT NULL DEFAULT 'PROSPECT',
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'NEW',
ADD CONSTRAINT "BusinessPartner_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "clientId",
ADD COLUMN     "clientId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Activity_partnerId_idx" ON "Activity"("partnerId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "BusinessPartner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "BusinessPartner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
