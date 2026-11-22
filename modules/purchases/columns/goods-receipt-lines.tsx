"use client"
import type { ColumnDef } from "@tanstack/react-table"
import type { GoodsReceiptLineRow } from "../types"

export const goodsReceiptLineColumns: ColumnDef<GoodsReceiptLineRow>[] = [
  { accessorKey: "designation", header: "Produit" },
  { accessorKey: "quantityOrdered", header: "Commandé" },
  { accessorKey: "receivedBefore", header: "Déjà reçu avant" },
  { accessorKey: "quantityReceived", header: "Reçu cette fois" },
  { accessorKey: "remainingAfter", header: "Reliquat après" },
  { accessorKey: "unit", header: "Unité" },
  { accessorKey: "lotNumber", header: "Lot", cell: ({ row }) => row.original.lotNumber || "-" },
  { accessorKey: "qualityStatus", header: "Qualité", cell: ({ row }) => row.original.qualityStatus || "-" },
]
