"use client"

import Link from "next/link"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import StatsCard from "@/components/stats-card"
import { ClipboardList, Coins, FileText, PackageCheck, Trash } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useDeletePurchaseOrder } from "../hooks/mutations/use-delete-purchase-order"
import { useUpdatePurchaseOrder } from "../hooks/mutations/use-update-purchase-order"

type PurchaseOrderHeaderData = {
  reference: string
  totalHT: number
  totalTTC: number
  currency: string
  id: number
  supplierId: number
  orderDate: Date | string
  expectedDate?: Date | string | null
  status: string
  paymentTerms?: string | null
  notes?: string | null
  lines: Array<{
    receivedQuantity: number
    productId: number
    designation: string
    specification?: string | null
    quantity: number
    unit: string
    unitPriceHT: number
    taxRate: number
  }>
}

export default function PurchaseOrderHeader({ order }: { order: PurchaseOrderHeaderData }) {
  const deleteMutation = useDeletePurchaseOrder()
  const updateMutation = useUpdatePurchaseOrder()
  const [note, setNote] = useState(order.notes ?? "")
  const received = order.lines.reduce((total: number, line: { receivedQuantity: number }) => total + Number(line.receivedQuantity), 0)
  const stats = [
    { title: "Lignes", value: order.lines.length, icon: ClipboardList, style: "text-blue-600" },
    { title: "Articles reçus", value: received, icon: PackageCheck, style: "text-violet-600" },
    { title: "Total HT", value: `${order.totalHT} ${order.currency}`, icon: Coins, style: "text-emerald-600" },
    { title: "Total TTC", value: `${order.totalTTC} ${order.currency}`, icon: Coins, style: "text-green-600" },
  ]

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="mt-2 text-2xl font-bold text-secondary">Fiche commande d&apos;achat</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link href="/admin/purchases/purchase-order">Commandes d&apos;achat</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{order.reference}</BreadcrumbPage></BreadcrumbItem>
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
                disabled={!note.trim() || note === order.notes || updateMutation.isPending}
                onClick={() => updateMutation.mutate({
                  id: order.id,
                  data: {
                    supplierId: order.supplierId,
                    orderDate: new Date(order.orderDate),
                    expectedDate: order.expectedDate ? new Date(order.expectedDate) : undefined,
                    status: order.status,
                    currency: order.currency,
                    paymentTerms: order.paymentTerms ?? undefined,
                    notes: note,
                    lines: order.lines.map((line) => ({
                      productId: line.productId,
                      designation: line.designation,
                      specification: line.specification ?? undefined,
                      quantity: line.quantity,
                      unit: line.unit,
                      unitPriceHT: line.unitPriceHT,
                      taxRate: line.taxRate,
                    })),
                  },
                })}
              >
                Enregistrer
              </Button>
            </PopoverContent>
          </Popover>
          <Button
            disabled={deleteMutation.isPending}
            variant="destructive"
            onClick={() => deleteMutation.mutate(order.reference)}
          >
            <Trash /> Supprimer
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} Icon={stat.icon} description={stat.title} number={stat.value} style={stat.style} />
        ))}
      </div>
    </>
  )
}
