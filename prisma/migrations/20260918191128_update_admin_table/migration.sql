-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('MAD', 'EUR', 'USD');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'MAD',
ADD COLUMN     "tva" DOUBLE PRECISION NOT NULL DEFAULT 20;
