-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('DEVIS', 'FACTURE');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('BROUILLON', 'ENVOYE', 'PAYE', 'ANNULE');

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'BROUILLON',
    "reference" TEXT,
    "objet" TEXT,
    "clientId" TEXT NOT NULL,
    "dateDocument" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateValidite" TIMESTAMP(3),
    "devise" TEXT DEFAULT 'MAD',
    "notes" TEXT,
    "conditions" TEXT,
    "remise" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ajustement" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "montantHT" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "montantTVA" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "montantTTC" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentItem" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "description" TEXT,
    "quantite" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "prixUnitaire" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxe" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "remise" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "montantHT" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "montantTTC" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_numero_key" ON "Document"("numero");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentItem" ADD CONSTRAINT "DocumentItem_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
