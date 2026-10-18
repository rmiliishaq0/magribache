import { ProductStats } from "../types";
import {
  Package,
  Leaf,
  ShoppingBasket,
  Box,
} from "lucide-react";

export const productstats: ProductStats[] = [
  {
    icon: Package,
    description: "Produits au total",
    style: "TOTAL",
    accessKey: "totalProducts",
  },
  {
    icon: Leaf,
    description: "Matières premières",
    style: "RAW_MATERIALS",
    accessKey: "rawMaterials",
  },
  {
    icon: ShoppingBasket,
    description: "Produits finis",
    style: "FINISHED_PRODUCTS",
    accessKey: "finishedProducts",
  },
  {
    icon: Box,
    description: "Autres articles",
    style: "OTHER",
    accessKey: "otherItems",
  },
];