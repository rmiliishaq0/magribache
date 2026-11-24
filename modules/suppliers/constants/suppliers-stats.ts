import {
    Users,
    CircleCheck,
    Ban,
    ShoppingCart,
    FileText,
} from "lucide-react";
import {SuppliersStats} from "../types";

export const fournisseurStats: SuppliersStats[] = [
    {
        icon: Users,
        description: "Fournisseurs total",
        style: "TOTAL",
        accessKey: "total",
    },
    {
        icon: CircleCheck,
        description: "Fournisseurs actifs",
        style: "ACTIVE",
        accessKey: "activeSuppliers",
    },
    {
        icon: Ban,
        description: "Fournisseurs inactifs",
        style: "INACTIVE",
        accessKey: "inactiveSuppliers",
    },
    {
        icon: ShoppingCart,
        description: "Total achats (année)",
        style: "PURCHASES",
        accessKey: "totalPurchases",
    }
];