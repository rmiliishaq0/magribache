"use client"
import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import DragHandle from "@/components/drag-handle"
import type { PurchaseOrderRow } from "../types"
import { labels } from "../option-to-frensh";

export const purchaseOrderColumns = ({
  setItem,
}: {
  setItem: React.Dispatch<React.SetStateAction<PurchaseOrderRow | null>>
}): ColumnDef<PurchaseOrderRow>[] => [
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
      <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Sélectionner la ligne" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "reference",
    header: "Référence",
    cell: ({ row }) => <Button variant="link" className="px-0" onClick={() => setItem(row.original)}>{row.original.reference}</Button>,
  },
  { accessorKey: "supplier", header: "Fournisseur", cell: ({ row }) => row.original.supplier.name },
  { accessorKey: "orderDate", header: "Date", cell: ({ row }) => format(new Date(row.original.orderDate), "PPP") },
  { accessorKey: "totalHT", header: "Total HT", cell: ({ row }) => `${row.original.totalHT.toFixed(2)} ${row.original.currency}` },
  { accessorKey: "totalTTC", header: "Total TTC", cell: ({ row }) => `${row.original.totalTTC.toFixed(2)} ${row.original.currency}` },
  { accessorKey: "status", header: "Statut", cell: ({ row }) => <Badge variant="outline">{labels[row.original.status]}</Badge> },
]
