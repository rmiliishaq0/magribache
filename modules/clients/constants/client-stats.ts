import { CrmStats } from "@/modules/crm/types";
import { Banknote, Eye, FileText, ShoppingCart } from "lucide-react";

export const clientStats: CrmStats[] = [
    {
        icon: FileText,
        description: "Total devis",
        style: "QUOTE_TO_PREPARE",
        accessKey: "totalQuotes",
    },
    {
        icon: ShoppingCart,
        description: "Total commandes",
        style: "WON",
        accessKey: "totalOrders",
    },
    {
        icon: Banknote,
        description: "Chiffre d'affaires",
        style: "GOOD_CLIENT",
        accessKey: "revenue",
    },
    {
        icon: Eye,
        description: "SAV ouverts",
        style: "TO_MONITOR",
        accessKey: "openSupport",
    },
];