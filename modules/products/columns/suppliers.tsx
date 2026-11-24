"use client"
import {
  type ColumnDef,
} from "@tanstack/react-table"

import DragHandle from "@/components/drag-handle";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { SupplierTable } from "../types";
import { productStatusColors } from "../constants/colors";


export const columns : ColumnDef<SupplierTable>[] =[
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
          {row.original.supplierReference}
      </div>
    },
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => (
      <div className="min-w-32">
        {row.original.name || "aucun"}
      </div>
    ),
  },
  {
    accessorKey: "purchasePriceHT",
    header: "Prix ​​d'achat",
    cell: ({ row }) => (
      <div className="min-w-32">
        {row.original.purchasePriceHT || "aucun"}
      </div>
    ),
  },{
    accessorKey:"isPreferred",
    header:"Statut",
    cell:({row})=>(
      <Badge variant="outline" className={productStatusColors[row.original.isPreferred ? "ACTIVE" : "INACTIVE"]}>
          {row.original.isPreferred ? "Principal" :"Secondaire"}
        </Badge>
    )
  },
  {
    accessorKey:"deliveryDelayDays",
    header:"Délai",
    cell:({row})=>(
      <div className="min-w-32">
          <Badge variant="outline" >
          {row.original.deliveryDelayDays}
        </Badge>
      </div>
    )}
]