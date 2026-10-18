/*
  Warnings:

  - The values [BROUILLON,ENVOYE,EN_NEGOCIATION,ACCEPTE,REFUSE,EXPIRE,TRANSFORME_EN_COMMANDE,VALIDE,ANNULE,CLOTURE] on the enum `DocumentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [NON_PAYEE,PARTIELLEMENT_PAYEE,PAYEE,EN_RETARD] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DocumentStatus_new" AS ENUM ('DRAFT', 'SENT', 'UNDER_NEGOTIATION', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CONVERTED_TO_ORDER', 'VALIDATED', 'CANCELLED', 'CLOSED');
ALTER TABLE "public"."Document" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Document" ALTER COLUMN "status" TYPE "DocumentStatus_new" USING ("status"::text::"DocumentStatus_new");
ALTER TYPE "DocumentStatus" RENAME TO "DocumentStatus_old";
ALTER TYPE "DocumentStatus_new" RENAME TO "DocumentStatus";
DROP TYPE "public"."DocumentStatus_old";
ALTER TABLE "Document" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('UNPAID', 'PARTIALLY_PAID', 'PAID', 'OVERDUE');
ALTER TABLE "public"."Document" ALTER COLUMN "paymentStatus" DROP DEFAULT;
ALTER TABLE "Document" ALTER COLUMN "paymentStatus" TYPE "PaymentStatus_new" USING ("paymentStatus"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "public"."PaymentStatus_old";
ALTER TABLE "Document" ALTER COLUMN "paymentStatus" SET DEFAULT 'UNPAID';
COMMIT;

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "status" SET DEFAULT 'DRAFT',
ALTER COLUMN "paymentStatus" SET DEFAULT 'UNPAID';
