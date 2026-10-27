"use client"
import {
  type ColumnDef,
} from "@tanstack/react-table"

import DragHandle from "@/components/drag-handle";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {  ProductStockLotType } from "../types";
import { productStatusColors } from "../constants/colors";
import { format } from "date-fns";


export const columns:ColumnDef<ProductStockLotType>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "reference",
    header: "Référence",
    cell: ({ row }) => {
      return <div className="min-w-32">
          {row.original.lotNumber}
      </div>
    },
    enableHiding: false,
  },
  {
    accessorKey: "entryDate",
    header: "Date de réception",
    cell: ({ row }) => (
      <div className="min-w-32">
        {row.original.entryDate ? format(row.original.entryDate,"PPP") : "aucun"}
      </div>
    ),
  },
  {
    accessorKey:"status",
    header:"Statut",
    cell:({row})=>(
      <div className="min-w-32">
          <Badge variant="outline" className={productStatusColors[row.original.isBlocked ? "ACTIVE":"INACTIVE"]}>
          {row.original.isBlocked ? "Disponible" :"Pas disponible"}
        </Badge>
      </div>
    )
  },
  {
    accessorKey:"quantityInitial",
    header:"Quantité initiale",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original.quantityInitial || "aucune"}
      </div>
    )
  },
  {
    accessorKey: "quantityAvailable",
    header: "Quantité disponible",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.quantityAvailable || "aucune"}
      </div>
    ),
  },
  {
    "accessorKey":"unit",
    header:"unité",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original.unit || "aucune"}
      </div>
    )
  },
  {
    accessorKey: "totalCost",
    header: "Coût total",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.totalCost || "aucun"}
      </div>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: "Date d’expiration",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.expiryDate ? format(new Date(row.original.expiryDate),"PPP") : "aucune"}
      </div>
    ),
  }
]