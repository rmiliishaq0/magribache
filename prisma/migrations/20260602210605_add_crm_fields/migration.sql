-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "entreprise" TEXT NOT NULL,
    "Téléphone" TEXT,
    "Email" TEXT,
    "Catégories" TEXT,
    "ICE" TEXT,
    "IdentifiantFiscal" TEXT,
    "Ville" TEXT,
    "Pays" TEXT,
    "actif" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactsFournisseur" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "supplier" TEXT,
    "city" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactsFournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fournisseur" (
    "id" TEXT NOT NULL,
    "fournisseur" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "ICE" TEXT,
    "IdentifiantFiscal" TEXT,
    "ville" TEXT,
    "pays" TEXT,
    "catégories" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contactsFournisseurId" TEXT NOT NULL,

    CONSTRAINT "Fournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prospects" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prospect" TEXT,
    "email" TEXT,
    "téléphone" TEXT,
    "statut" TEXT,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "localisation" TEXT,

    CONSTRAINT "Prospects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contrats" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "sujet" TEXT,
    "client" TEXT,
    "modèleContrat" TEXT,
    "dateDepart" TEXT,
    "dateFin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contrats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "civilité" TEXT,
    "email" TEXT,
    "téléphone" TEXT,
    "entreprise" TEXT,
    "ville" TEXT,
    "pays" TEXT,
    "actif" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_Email_key" ON "Client"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "ContactsFournisseur_email_key" ON "ContactsFournisseur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Fournisseur_email_key" ON "Fournisseur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Prospects_email_key" ON "Prospects"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contacts_email_key" ON "Contacts"("email");

-- AddForeignKey
ALTER TABLE "Fournisseur" ADD CONSTRAINT "Fournisseur_contactsFournisseurId_fkey" FOREIGN KEY ("contactsFournisseurId") REFERENCES "ContactsFournisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
