/*
  Warnings:

  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactsFournisseur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contrats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fournisseur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prospects` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PartnerStatus" AS ENUM ('PROSPECT', 'CLIENT', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('INDIVIDUAL', 'FARMER', 'COMPANY', 'RESELLER', 'ADMINISTRATION', 'ASSOCIATION');

-- CreateEnum
CREATE TYPE "PartnerPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "PartnerSource" AS ENUM ('PHONE', 'WHATSAPP', 'FACEBOOK', 'INSTAGRAM', 'WEBSITE', 'TIKTOK', 'LINKEDIN', 'VISIT', 'REFERRAL', 'OTHER');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('CREATED', 'UPDATED', 'DELETED', 'NOTE', 'CALL', 'EMAIL', 'WHATSAPP', 'MEETING', 'STATUS_CHANGED', 'PDF_GENERATED', 'SENT', 'PAYMENT_RECEIVED', 'STARTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('PARTNER', 'DOCUMENT', 'PRODUCTION', 'DELIVERY', 'INVENTORY', 'PRODUCT');

-- DropForeignKey
ALTER TABLE "ContactsFournisseur" DROP CONSTRAINT "ContactsFournisseur_fournisseurId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_adminId_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "defaultColor" TEXT,
ADD COLUMN     "footerText" TEXT,
ADD COLUMN     "signature" TEXT;

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Contacts";

-- DropTable
DROP TABLE "ContactsFournisseur";

-- DropTable
DROP TABLE "Contrats";

-- DropTable
DROP TABLE "Fournisseur";

-- DropTable
DROP TABLE "Prospects";

-- CreateTable
CREATE TABLE "BusinessPartner" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "status" "PartnerStatus" NOT NULL DEFAULT 'PROSPECT',
    "companyType" "CompanyType" NOT NULL DEFAULT 'INDIVIDUAL',
    "companyName" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "website" TEXT,
    "address" TEXT,
    "city" TEXT,
    "region" TEXT,
    "country" TEXT DEFAULT 'Maroc',
    "ice" TEXT,
    "rc" TEXT,
    "ifNumber" TEXT,
    "activity" TEXT,
    "source" "PartnerSource" NOT NULL DEFAULT 'OTHER',
    "priority" "PartnerPriority" NOT NULL DEFAULT 'MEDIUM',
    "notes" TEXT,
    "nextFollowUpAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "entityType" "EntityType" NOT NULL,
    "action" "ActivityType" NOT NULL,
    "note" TEXT,
    "partnerId" TEXT,
    "documentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessPartner_reference_key" ON "BusinessPartner"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessPartner_email_key" ON "BusinessPartner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessPartner_phone_key" ON "BusinessPartner"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessPartner_whatsapp_key" ON "BusinessPartner"("whatsapp");

-- CreateIndex
CREATE INDEX "BusinessPartner_status_idx" ON "BusinessPartner"("status");

-- CreateIndex
CREATE INDEX "Activity_partnerId_idx" ON "Activity"("partnerId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "BusinessPartner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "BusinessPartner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
