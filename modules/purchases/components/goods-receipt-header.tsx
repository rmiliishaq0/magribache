"use client"

import Link from "next/link"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import StatsCard from "@/components/stats-card"
import { Ban, ClipboardList, PackageCheck, ReceiptText, Trash } from "lucide-react"
import { GoodsReceiptStatus } from "@/app/generated/prisma/enums"
import { useDeleteGoodsReceipt } from "../hooks/mutations/use-delete-goods-receipt"
import type { GoodsReceiptRow } from "../types"

export default function GoodsReceiptHeader({ receipt }: { receipt: GoodsReceiptRow }) {
  const mutation = useDeleteGoodsReceipt()
  const received = receipt.lines.reduce((total, line) => total + Number(line.quantityReceived), 0)
  const stats = [
    { title: "Lignes", value: receipt.lines.length, icon: ReceiptText, style: "text-blue-600" },
    { title: "Quantité reçue", value: received, icon: PackageCheck, style: "text-emerald-600" },
    { title: "Commande", value: receipt.purchaseOrder.reference, icon: ClipboardList, style: "text-violet-600" },
  ]

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="mt-2 text-2xl font-bold text-secondary">Fiche réception</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link href="/admin/purchases/goods-receipt">Réceptions</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{receipt.reference}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex gap-2">
          {receipt.status === GoodsReceiptStatus.COMPLETED && (
            <Button
              variant="outline"
              disabled={mutation.isPending}
              onClick={() => mutation.mutate({ reference: receipt.reference, cancel: true })}
            >
              <Ban /> Annuler
            </Button>
          )}
          {receipt.status === GoodsReceiptStatus.DRAFT && (
            <Button
              variant="destructive"
              disabled={mutation.isPending}
              onClick={() => mutation.mutate({ reference: receipt.reference, cancel: false })}
            >
              <Trash /> Supprimer
            </Button>
          )}
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
