"use client"
import {
  type ColumnDef,
} from "@tanstack/react-table"
import {
    DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import DragHandle from "@/components/drag-handle";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {  IconDotsVertical } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { productsSchemaWithId } from "../types";
import { Options } from "../constants/options-to-frensh";
import { productStatusColors, productTypeColors } from "../constants/colors";
import { useDeleteProduct } from "../hooks/mutations/use-delete-products";


export const columns = ({setItem}:{setItem:React.Dispatch<React.SetStateAction<productsSchemaWithId | null>>}):ColumnDef<productsSchemaWithId>[]=>{
  const deleteMutation = useDeleteProduct()
  return [
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
        <Button  onClick={() => setItem(row.original)} variant="link" className="w-fit px-0 text-left text-foreground">
          {row.original.reference}
        </Button>
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
  },{
    accessorKey:"type",
    header:"Type",
    cell:({row})=>(
      <Badge variant="outline" className={productTypeColors[row.original.type]}>
          {Options[row.original.type]}
        </Badge>
    )
  },
  {
    accessorKey:"status",
    header:"Statut",
    cell:({row})=>(
      <div className="min-w-32">
          <Badge variant="outline" className={productStatusColors[row.original.status]}>
          {Options[row.original.status]}
        </Badge>
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
    accessorKey: "capacityM3",
    header: "Capacité (m³)",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.capacityM3 || "aucune"}
      </div>
    ),
  },
  {
    "accessorKey":"dimensions",
    header:"Dimensions",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original.dimensions || "aucune"}
      </div>
    )
  },
  {
    accessorKey: "material",
    header: "Matériel",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.material || "aucun"}
      </div>
    ),
  },
  {
    accessorKey: "color",
    header: "Couleur",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.color || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "grammage",
    header: "Grammage",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.grammage || "aucun"}
      </div>
    ),
  },
  {
    accessorKey: "taxRate",
    header: "Taux de taxe",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.taxRate || "aucun"}
      </div>
    ),
  },
  {
    accessorKey: "salePriceHT",
    header: "Prix de vente (HT)",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.salePriceHT || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "purchasePriceHT",
    header: "Prix d'achat (HT)",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.purchasePriceHT || "aucune"}
      </div>
    ),
  },

  {
    accessorKey: "currentStock",
    header: "Stock actuel",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.currentStock || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "minimumStock",
    header: "Stock minimum",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.minimumStock || "aucun"}
      </div>
    ),
  },
  {
    accessorKey: "maximumStock",
    header: "Stock maximum",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.maximumStock || "aucun"}
      </div>
    ),
  },
  {
    accessorKey: "trackLot",
    header: "Suivi par lot",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.trackLot || "aucun"}
      </div>
    ),
  },{
    accessorKey: "trackSerialNumber",
    header: "Suivi par numéro de série",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.trackSerialNumber || "aucun"}
      </div>
    ),
  },
  
  
  {
    id: "actions",
    cell: ({row}) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => { setItem(row.original); }}>Modifier</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => {if(row.original.reference) deleteMutation.mutate(row.original.reference)}}>
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

}