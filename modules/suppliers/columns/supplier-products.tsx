"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import DragHandle from "@/components/drag-handle"
import { Checkbox } from "@/components/ui/checkbox"
import { SupplierProductRow } from "../types";


export const supplierProductsColumns: ColumnDef<SupplierProductRow>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
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
  {
    accessorKey: "product",
    header: "Produit",
    cell: ({ row }) => (
      <div className="min-w-40">
        <div className="font-medium">{row.original.product.name}</div>
        <div className="text-xs text-muted-foreground">{row.original.product.reference}</div>
      </div>
    ),
  },
  {
    accessorKey: "purchasePriceHT",
    header: "Prix HT",
    cell: ({ row }) => String(row.original.purchasePriceHT ?? "-"),
  },
  {
    accessorKey: "deliveryDelayDays",
    header: "Délai",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.deliveryDelayDays == null ? "-" : `${row.original.deliveryDelayDays} j`}
      </Badge>
    ),
  },
  {
    accessorKey: "isPreferred",
    header: "Statut",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.isPreferred ? "Principal" : "Secondaire"}
      </Badge>
    ),
  },
]
