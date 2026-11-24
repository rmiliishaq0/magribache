import {
  Building2,
  ShieldCheck,
  Palette,
  FileText,
} from "lucide-react";

export const COMPANY_SECTIONS = [
  {
    id: "identity",
    title: "Coordonnées & société",
    description:
      "Identité de l'entreprise & devis…",
    badge: "SOCIÉTÉ",
    icon: Building2,
  },
  {
    id: "identifiers",
    title: "Identifiants fiscaux",
    description:
      "ICE, RC, IF, patente & CNSS",
    badge: "ICE / RC",
    icon: ShieldCheck,
  },
  {
    id: "branding",
    title: "Logos, filigrane &…",
    description:
      "Logo en-tête, filigrane, cachet …",
    badge: "DESIGN",
    icon: Palette,
  },
  {
    id: "structure",
    title: "Structure & numérotation",
    description:
      "Numérotation, colonnes, affich…",
    badge: "PDF",
    icon: FileText,
  },
] as const;
