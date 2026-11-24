"use client"
import {
  type ColumnDef,
} from "@tanstack/react-table"
import { z } from "zod"
import {
    DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import DragHandle from "@/components/drag-handle";
import { Checkbox } from "@/components/ui/checkbox";
import {  IconDotsVertical } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {format} from "date-fns"
import { SuppliersSchemaWithId } from "@/modules/suppliers/types";
import { fournisseurStatsColors } from "../constants/colors";
import { Badge } from "@/components/ui/badge";
import { supplierStatusLabels } from "../constants/options-to-frensh";
import { useDeleteSupplier } from "../hooks/mutations/use-delete-supplier";


export const suppliers = ({setItem}:{setItem:React.Dispatch<React.SetStateAction<SuppliersSchemaWithId | null>>}):ColumnDef<SuppliersSchemaWithId>[]=>{
  const {mutate} = useDeleteSupplier()
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
        {row.original?.name || "aucune"}
      </div>
    ),
  },{
    accessorKey:"contactName",
    header:"Nom du contact",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original?.contactName|| "aucune"}
      </div>
    )
  },
  {
    accessorKey:"phone",
    header:"Téléphone",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original?.phone|| "aucune"}
      </div>
    )
  },
  {
    accessorKey:"date",
    header:"Date",
    cell:({row})=>(
      <div className="min-w-32">
          {(row.original?.createdAt && format(new Date(row.original.createdAt),"PPP")) || "aucune"}
      </div>
    )
  },
  {
    accessorKey: "whatsapp",
    header: "Whatsapp",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.whatsapp || "aucune"}
      </div>
    ),
  },
  {
    "accessorKey":"statut",
    header:"Statut",
    cell:({row})=>(
      <div className="min-w-32">
          <Badge variant="outline" className={fournisseurStatsColors[row.original.status as keyof typeof fournisseurStatsColors]}>
                {(row.original.status && supplierStatusLabels[row.original.status]) || "aucune"}
          </Badge>
      </div>
    )
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.email || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "country",
    header: "Pays",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.country || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "city",
    header: "Ville",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.city || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Adresse",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.address || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "ice",
    header: "ICE",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.ice || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "ifNumber",
    header: "IF Number",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.ifNumber || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "paymentTerms",
    header: "Conditions de paiement",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.paymentTerms || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "currency",
    header: "Devise",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.currency || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "deliveryDelayDays",
    header: "Délai de livraison (jours)",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.deliveryDelayDays || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.notes || "aucune"}
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
          <DropdownMenuItem variant="destructive" onClick={() => {if(row.original.reference) mutate(row.original.reference)}}>
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

}