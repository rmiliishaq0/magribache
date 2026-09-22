"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { COMPANY_SECTIONS } from "@/modules/settings/constants/company-sections";
import CompanyProfileForm from "./company-profile-form";
import CompanySections from "./company-sections";
import LegalInformationForm from "./legal-information-form";
import VisualIdentityForm from "./visual-identity-form";
import DocumentStructureForm from "./document-structure-form";

export default function SettingsPage() {
  const [active, setActive] =
    useState<(typeof COMPANY_SECTIONS)[number]["id"]>("identity");

  const currentSection =
    COMPANY_SECTIONS.find((section) => section.id === active)!;

  return (
    <div className="mb-4 grid w-full min-w-0 max-w-full gap-6 lg:grid-cols-[286px_minmax(0,1fr)]">
      <div className="col-span-full min-w-0">
        <h2 className="text-2xl font-bold text-secondary">
          Paramètres & Modèles
        </h2>

        <p className="mt-1 text-xs text-muted-foreground">
          Configurez les coordonnées de votre société, vos identifiants légaux,
          logos, filigranes et numérotation.
        </p>
      </div>

      <div className="min-w-0">
        <CompanySections
          active={active}
          setIsActive={setActive}
        />
      </div>

      <div className="min-w-0">
        {active === "identity" ? (
          <CompanyProfileForm />
        ) : active === "identifiers" ? (
          <LegalInformationForm />
        ) : active === "branding" ? (
          <VisualIdentityForm />
        ) : active === "structure" ? (
          <DocumentStructureForm />
        ) : (
          <Card className="px-6 py-6">
            <h1 className="text-sm font-bold text-slate-900">
              {currentSection.title}
            </h1>

            <p className="mt-1 text-xs text-slate-500">
              Cette section est prête à recevoir sa configuration.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}