"use client"
import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import DragHandle from "@/components/drag-handle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconDotsVertical } from "@tabler/icons-react"
import type { GoodsReceiptRow } from "../types"
import { goodsReceiptLabels } from "../option-goods-receipt"
import { useDeleteGoodsReceipt } from "../hooks/mutations/use-delete-goods-receipt"
import { GoodsReceiptStatus } from "@/app/generated/prisma/enums"

export const useGoodsReceiptColumns = ({
  setItem,
}: {
  setItem: React.Dispatch<React.SetStateAction<GoodsReceiptRow | null>>
}): ColumnDef<GoodsReceiptRow>[] => {
  const deleteMutation = useDeleteGoodsReceipt()

  return [
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
  },
  {
    accessorKey: "reference",
    header: "Référence",
    cell: ({ row }) => (
      <Button variant="link" className="px-0" onClick={() => setItem(row.original)}>
        {row.original.reference}
      </Button>
    ),
  },
  { accessorKey: "supplier", header: "Fournisseur", cell: ({ row }) => row.original.supplier.name },
  { accessorKey: "purchaseOrder", header: "Commande", cell: ({ row }) => row.original.purchaseOrder.reference },
  { accessorKey: "receiptDate", header: "Date", cell: ({ row }) => format(new Date(row.original.receiptDate), "PPP") },
  {
    id: "receivedQuantity",
    header: "Quantité reçue",
    cell: ({ row }) => row.original.lines.reduce((total, line) => total + Number(line.quantityReceived), 0),
  },
  { accessorKey: "supplierDocumentRef", header: "Document fournisseur", cell: ({ row }) => row.original.supplierDocumentRef || "-" },
  { accessorKey: "status", header: "Statut", cell: ({ row }) => <Badge variant="outline">{goodsReceiptLabels[row.original.status]}</Badge> },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Actions de réception</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          {row.original.status === GoodsReceiptStatus.DRAFT && (
            <DropdownMenuItem onClick={() => setItem(row.original)}>
              Modifier
            </DropdownMenuItem>
          )}
          {row.original.status === GoodsReceiptStatus.DRAFT && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate({
                  reference: row.original.reference,
                  cancel: false,
                })}
              >
                Supprimer
              </DropdownMenuItem>
            </>
          )}
          {row.original.status === GoodsReceiptStatus.COMPLETED && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate({
                  reference: row.original.reference,
                  cancel: true,
                })}
              >
                Annuler
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
}
