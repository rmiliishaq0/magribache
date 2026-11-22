"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import DragHandle from "@/components/drag-handle"
import type { PurchaseOrderLineRow } from "../types"

export const purchaseOrderLineColumns: ColumnDef<PurchaseOrderLineRow>[] = [
  { id: "drag", header: () => null, cell: ({ row }) => <DragHandle id={row.original.id} /> },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Sélectionner toutes les lignes"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner la ligne"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "designation", header: "Produit" },
  { accessorKey: "quantity", header: "Quantité" },
  { accessorKey: "unit", header: "Unité" },
  { accessorKey: "receivedQuantity", header: "Reçu" },
  { accessorKey: "unitPriceHT", header: "Prix HT", cell: ({ row }) => row.original.unitPriceHT.toFixed(2) },
  { accessorKey: "taxRate", header: "TVA %" },
  { accessorKey: "totalHT", header: "Total HT", cell: ({ row }) => row.original.totalHT.toFixed(2) },
  { accessorKey: "totalTTC", header: "Total TTC", cell: ({ row }) => row.original.totalTTC.toFixed(2) },
]
