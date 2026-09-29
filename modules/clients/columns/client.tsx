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
import { Badge } from "@/components/ui/badge";
import {  IconDotsVertical } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { crmScemaWithId } from "@/modules/crm/types";
import { Options } from "@/modules/crm/constants/options-to-frensh";
import { statusColors } from "@/modules/crm/constants/colors";
import { useDeleteClient } from "../hooks/mutations/use-delete-client";


export const columns = ({setItem}:{setItem:React.Dispatch<React.SetStateAction<z.infer<typeof crmScemaWithId> | null>>}):ColumnDef<z.infer<typeof crmScemaWithId>>[]=>{
  const deleteMutation = useDeleteClient()
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
    accessorKey: "fullName",
    header: "Nom",
    cell: ({ row }) => (
      <div className="min-w-32">
        {row.original.fullName || "aucune"}
      </div>
    ),
  },{
    accessorKey:"companyName",
    header:"Nom de l'entreprise",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original.companyName || "aucune"}
      </div>
    )
  },
  {
    accessorKey:"email",
    header:"Email",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original.email || "aucune"}
      </div>
    )
  },
  {
    accessorKey:"whatsapp",
    header:"Whatsapp",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original.whatsapp || "aucune"}
      </div>
    )
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.phone || "aucune"}
      </div>
    ),
  },
  {
    "accessorKey":"website",
    header:"Website",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original.website || "aucune"}
      </div>
    )
  },
  {
    accessorKey: "city",
    header: "Ville",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.city || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "adresse",
    header: "Adresse",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.address || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "region",
    header: "Région",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.region || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "country",
    header: "Pays",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.country || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "ice",
    header: "ICE",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.ice || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "rc",
    header: "Rc",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.rc || "aucune"}
      </div>
    ),
  },
  {
    accessorKey: "ifNumber",
    header: "IfNumber",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.ifNumber || "aucune"}
      </div>
    ),
  },
  {
    accessorKey:"status",
    header:"Statut",
    cell:({row})=>(
      <div className="w-32">
        <Badge variant="outline" className={statusColors[row.original.status]}>
          {Options[row.original.status]}
        </Badge>
      </div>
    )
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => (
      <div className="min-w-32">
          {row.original.notes || "aucune"}
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