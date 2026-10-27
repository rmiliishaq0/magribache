"use client"
import {
  type ColumnDef,
} from "@tanstack/react-table"


import DragHandle from "@/components/drag-handle";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Options } from "../constants/options-to-frensh";
import { productTypeColors } from "../constants/colors";
import { ProductMouvmentsType } from "../types";
import { format } from "date-fns";


export const columns: ColumnDef<ProductMouvmentsType>[] = [
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
          {row.original.reference}
      </div>
    },
    enableHiding: false,
  },
  {
    accessorKey:"type",
    header:"Type",
    cell:({row})=>(
      <Badge variant="outline" className={productTypeColors[row.original.type as keyof typeof productTypeColors]}>
          {Options[row.original.type as keyof typeof Options]}
        </Badge>
    )
  },
  {
    accessorKey:"quantity",
    header:"Quantité",
    cell:({row})=>(
      <div className="min-w-32">
        {row.original.quantity}
      </div>
    )
  },
  {
    accessorKey:"unit",
    header:"Unité",
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
          {row.original.totalCost || "aucune"}
      </div>
    ),
  },
  {
    "accessorKey":"createdAt",
    header:"Date",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original.createdAt ? format(new Date(row.original.createdAt ) ,"PPP") :  "aucune"}
      </div>
    )}
]
