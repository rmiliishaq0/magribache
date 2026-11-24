"use client"

import { useState } from "react"
import { getCoreRowModel, getPaginationRowModel, useReactTable, type PaginationState } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DataTable from "@/components/data-table"
import { Pen } from "lucide-react"
import PurchaseOrderForm from "./purchase-order-form"
import type { PurchaseOrderRow } from "../types"
import { purchaseOrderLineColumns } from "../columns/purchase-order-lines"

export default function PurchaseOrderDetailSections({ order }: { order: PurchaseOrderRow }) {
  const [editingSection, setEditingSection] = useState<"info" | "lines" | null>(null)
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [rowSelection, setRowSelection] = useState({})
  const linesTable = useReactTable({
    data: order.lines,
    columns: purchaseOrderLineColumns,
    onPaginationChange: setPagination,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: { pagination, rowSelection },
    getRowId: (row) => String(row.id),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-secondary">Informations commande</CardTitle>
          <div className="flex gap-4 items-center">
            {!editingSection && <Button variant="outline" onClick={() => setEditingSection("info")}><Pen /> Modifier</Button>}
            {editingSection === "info" && <Button variant="outline" onClick={() => setEditingSection(null)}>Annuler</Button>}
          </div>
        </CardHeader>
        <CardContent>
          {editingSection === "info" ? (
            <PurchaseOrderForm embedded item={order} onSuccess={() => setEditingSection(null)} />
          ) : (
            <div className="grid grid-cols-2 items-center justify-center gap-4 md:grid-cols-3">
              <DataField field="Fournisseur" value={order.supplier.name} />
              <DataField field="Statut" value={order.status} isBadge />
              <DataField field="Date commande" value={formatDate(order.orderDate)} />
              <DataField field="Date prévue" value={order.expectedDate ? formatDate(order.expectedDate) : "-"} />
              <DataField field="Devise" value={order.currency} />
              <DataField field="Conditions paiement" value={order.paymentTerms || "-"} />
              <DataField field="Total HT" value={`${order.totalHT} ${order.currency}`} />
              <DataField field="Taxe" value={`${order.taxAmount} ${order.currency}`} />
              <DataField field="Total TTC" value={`${order.totalTTC} ${order.currency}`} />
              <DataField field="Notes" value={order.notes || "-"} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-secondary">Lignes de commande</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable table={linesTable} isPending={false} />
        </CardContent>
      </Card>
    </>
  )
}

function formatDate(value: Date | string) {
  return new Date(value).toLocaleDateString("fr-FR", { dateStyle: "medium" })
}

function DataField({ field, value, isBadge = false }: { field: string; value: string; isBadge?: boolean }) {
  return (
    <div>
      <h3 className="flex items-center gap-4 text-start text-[16px] font-medium text-secondary">
        {field} : {isBadge ? <Badge variant="outline">{value}</Badge> : <span className="font-semibold">{value}</span>}
      </h3>
    </div>
  )
}
