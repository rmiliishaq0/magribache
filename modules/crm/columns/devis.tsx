"use client"
import {
  type ColumnDef,
} from "@tanstack/react-table"

import DragHandle from "@/components/drag-handle";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {  Devis } from "../types";
import { DOCUMENT_STATUS_STYLES, statusColors } from "../constants/colors";
import { Options } from "../constants/options-to-frensh";
import { formatDate } from "@/utils/format-date";
import { Eye } from "lucide-react";
import Link from "next/link";


export const devisColumn :ColumnDef<Devis & {id:number}>[]=[
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
        <Button   variant="link" className="w-fit px-0 text-left text-foreground">
          {row.original.numero}
        </Button>
      </div>
    },
    enableHiding: false,
  },
  {
    accessorKey: "Date",
    header: "Date",
    cell: ({ row }) => (
      <div className="min-w-32">
        {formatDate(new Date(row.original.createdAt)) || "aucune"}
      </div>
    ),
  },{
    accessorKey:"Produit",
    header:"Produit",
    cell:({row})=>(
      <div className="min-w-32">
          { "aucune"}
      </div>
    )
  },
  {
    accessorKey:"Capacité",
    header:"Capacité",
    cell:({row})=>(
      <div className="min-w-32">
          {"aucune"}
      </div>
    )
  },
  {
    accessorKey:"Montant",
    header:"Montant",
    cell:({row})=>(
      <div className="min-w-32">
          {row.original.montantTTC || "aucune"}
      </div>
    )
  },
  {
    accessorKey:"status",
    header:"Statut",
    cell:({row})=>(
      <div className="w-32">
        <Badge variant="outline" className={DOCUMENT_STATUS_STYLES[row.original.status]}>
          {Options[row.original.status]}
        </Badge>
      </div>
    )
  },
  {
    id: "actions",
    cell: () => (
      <Button variant={"outline"} >
        <Link href={"/admin/sales"}>
          <Eye/>
        </Link>
      </Button>
    ),
  },
]
