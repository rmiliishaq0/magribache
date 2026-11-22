"use client"

import { useState } from "react"
import { getCoreRowModel, getPaginationRowModel, useReactTable, type PaginationState } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pen } from "lucide-react"
import DataTable from "@/components/data-table"
import GoodsReceiptForm from "./goods-receipt-form"
import { goodsReceiptLineColumns } from "../columns/goods-receipt-lines"
import { goodsReceiptLabels } from "../option-goods-receipt"
import { GoodsReceiptStatus } from "@/app/generated/prisma/enums"
import type { GoodsReceiptRow } from "../types"

export default function GoodsReceiptDetailSections({ receipt }: { receipt: GoodsReceiptRow }) {
  const [editing, setEditing] = useState(false)
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [rowSelection, setRowSelection] = useState({})
  const linesTable = useReactTable({
    data: receipt.lines,
    columns: goodsReceiptLineColumns,
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
          <CardTitle className="text-lg font-bold text-secondary">Informations réception</CardTitle>
          {receipt.status === GoodsReceiptStatus.DRAFT && (
            <div className="flex items-center gap-2">
              {editing ? (
                <Button variant="outline" onClick={() => setEditing(false)}>Annuler</Button>
              ) : (
                <Button variant="outline" onClick={() => setEditing(true)}><Pen /> Modifier</Button>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent>
          {editing ? (
            <GoodsReceiptForm embedded item={receipt} onSuccess={() => setEditing(false)} />
          ) : (
            <div className="grid grid-cols-2 items-center justify-center gap-4 md:grid-cols-3">
              <DataField field="Fournisseur" value={receipt.supplier.name} />
              <DataField field="Commande" value={receipt.purchaseOrder.reference} />
              <DataField field="Document fournisseur" value={receipt.supplierDocumentRef || "-"} />
              <DataField field="Date" value={formatDate(receipt.receiptDate)} />
              <DataField field="Statut" value={goodsReceiptLabels[receipt.status]} isBadge />
              <DataField field="Notes" value={receipt.notes || "-"} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-secondary">Lignes réceptionnées</CardTitle>
        </CardHeader>
        <CardContent>
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
