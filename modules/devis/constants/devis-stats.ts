import { CrmStats } from "@/modules/crm/types";
import { FileText, OctagonX, Send, Trophy } from "lucide-react";

export const devisStats: CrmStats[] = [
    {
        icon: FileText,
        description: "Total devis",
        style: "NEW",
        accessKey: "totalQuotes",
    },
    {
        icon: Send,
        description: "Envoyés ce mois",
        style: "TO_MONITOR",
        accessKey: "sentThisM",
    },
    {
        icon: Trophy,
        description: "Acceptés",
        style: "WON",
        accessKey: "accepted",
    },
    {
        icon: OctagonX,
        description: "Expirent bientôt",
        style: "LOST",
        accessKey: "expired",
    },
];