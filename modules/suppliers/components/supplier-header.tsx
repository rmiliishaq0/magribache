"use client"

import Link from "next/link"
import { CalendarDays, FileText, OctagonX, RotateCcw } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import StatsCard from "@/components/stats-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useUpdateSupplier } from "../hooks/mutations/use-update-supplier"
import { supplierStatusLabels } from "../constants/options-to-frensh"
import { SupplierStatus } from "@/app/generated/prisma/enums"
import type { SuppliersSchema } from "../types"

type SupplierHeaderProps = {
  supplier: SuppliersSchema
  productCount: number
}

export default function SupplierHeader({ supplier, productCount }: SupplierHeaderProps) {
  const mutate = useUpdateSupplier()
  const [note, setNote] = useState(supplier.notes ?? "")
  const nextStatus =
    supplier.status === SupplierStatus.ACTIVE
      ? SupplierStatus.INACTIVE
      : SupplierStatus.ACTIVE

  const update = (data: Partial<SuppliersSchema>) => {
    mutate.mutate({ ...supplier, ...data, products: undefined })
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="space-y-2">
          <h2 className="mt-2 text-2xl font-bold text-secondary">Fiche fournisseur</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/purchases/suppliers">Fournisseurs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{supplier.reference}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline"><FileText /> Ajouter une note</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 space-y-3 p-4" align="end">
              <Textarea value={note} onChange={(event) => setNote(event.target.value)} />
              <Button
                disabled={!note.trim() || note === supplier.notes || mutate.isPending}
                onClick={() => update({ notes: note })}
              >
                Enregistrer
              </Button>
            </PopoverContent>
          </Popover>
          <Button
            variant={nextStatus === SupplierStatus.ACTIVE ? "outline" : "destructive"}
            disabled={mutate.isPending}
            onClick={() => update({ status: nextStatus })}
          >
            {nextStatus === SupplierStatus.ACTIVE ? <RotateCcw /> : <OctagonX />}
            {nextStatus === SupplierStatus.ACTIVE ? "Réactiver" : "Désactiver"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatsCard
          Icon={CalendarDays}
          description="Statut"
          number={supplierStatusLabels[supplier.status ?? SupplierStatus.ACTIVE]}
          style={supplier.status === SupplierStatus.ACTIVE ? "text-emerald-600" : "text-orange-600"}
        />
        <StatsCard
          Icon={FileText}
          description="Produits liés"
          number={String(productCount)}
          style="text-blue-600"
        />
        <StatsCard
          Icon={CalendarDays}
          description="Délai livraison"
          number={`${supplier.deliveryDelayDays ?? 0} jours`}
          style="text-violet-600"
        />
        <StatsCard
          Icon={CalendarDays}
          description="Créé le"
          number={supplier.createdAt ? format(new Date(supplier.createdAt), "dd/MM/yyyy") : "-"}
          style="text-slate-600"
          extra={<Badge variant="outline">{supplier.currency ?? "MAD"}</Badge>}
        />
      </div>
    </>
  )
}
