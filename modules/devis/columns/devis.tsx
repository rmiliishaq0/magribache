"use client"
import {
  type ColumnDef,
} from "@tanstack/react-table"
import { toast } from "sonner"
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
import { useDeleteProspect } from "@/modules/crm/hooks/mutations/use-delete-prospect";
import {  devisSchemaWithId } from "../schemas/devis";
import {formatDate} from "@/utils/format-date"


export const columns = ({setItem}:{setItem:React.Dispatch<React.SetStateAction<z.infer<typeof devisSchemaWithId> | null>>}):ColumnDef<z.infer<typeof devisSchemaWithId>>[]=>{
  const deleteMutation = useDeleteProspect()
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
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => (
      <div className="min-w-32">
        {row.original?.client?.fullName || "aucune"}
      </div>
    ),
  },{
    accessorKey:"phone",
    header:"Téléphone",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original?.client?.phone || "aucune"}
      </div>
    )
  },
  {
    accessorKey:"city",
    header:"Ville",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original?.client?.city || "aucune"}
      </div>
    )
  },
  {
    accessorKey:"date",
    header:"Date",
    cell:({row})=>(
      <div className="min-w-32">
          {(row.original?.devisDate && formatDate(new Date(row.original.devisDate))) || "aucune"}
      </div>
    )
  },
  {
    accessorKey: "montant",
    header: "Montant",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.montantHT || "aucune"}
      </div>
    ),
  },
  {
    "accessorKey":"statut",
    header:"Statut",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original?.statut || "aucune"}
      </div>
    )
  },
  {
    accessorKey: "validite",
    header: "Validité",
    cell: ({ row }) => (
      <div className="min-w-32">
          {(row.original?.dateValidite && formatDate(new Date(row.original.dateValidite))) || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "devise",
    header: "Devise",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.devise || "aucune"}
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
    accessorKey: "remise",
    header: "Remise",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.remise || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "ajustement",
    header: "Ajustement",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.ajustement || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "montantTVA",
    header: "Montant TVA",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.montantTVA || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "montantTTC",
    header: "Montant TTC",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original?.montantTTC || "aucune"}
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