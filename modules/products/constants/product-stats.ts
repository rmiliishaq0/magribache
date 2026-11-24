import {
  Link2,
  TriangleAlert,
  Truck,
  Coins,
} from "lucide-react";

export const stockStats = [
  {
    title: "Stock actuel",
    accessKey: "currentStock",
    icon: Link2,
    style: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    title: "Stock minimum",
    accessKey: "minimumStock",
    icon: TriangleAlert,
    style: "bg-amber-50 text-amber-600 border-amber-200",
  },
  {
    title: "Fournisseurs",
    accessKey: "suppliers",
    icon: Truck,
    style: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    title: "Dernier prix d'achat",
    accessKey: "purchasePriceHT",
    icon: Coins,
    style: "bg-green-50 text-green-600 border-green-200",
  },
] as const;