/*
  Warnings:

  - You are about to drop the column `defaultColor` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "defaultColor",
ADD COLUMN     "tableBgColor" TEXT NOT NULL DEFAULT '#D97706',
ADD COLUMN     "tableFontColor" TEXT NOT NULL DEFAULT '#ffffff',
ADD COLUMN     "titlesColor" TEXT NOT NULL DEFAULT '#D97706';
