-- Add the fiscal and legal information displayed in the company settings.
ALTER TABLE "Admin"
  ADD COLUMN "ice" TEXT,
  ADD COLUMN "rc" TEXT,
  ADD COLUMN "fiscalId" TEXT,
  ADD COLUMN "patente" TEXT,
  ADD COLUMN "cnss" TEXT,
  ADD COLUMN "shareCapital" TEXT;
