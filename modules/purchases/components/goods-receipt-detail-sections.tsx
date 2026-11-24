"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pen } from "lucide-react"
import GoodsReceiptFormUpdate from "./goods-receipt-form-update"
import { goodsReceiptLabels } from "../option-goods-receipt"
import { GoodsReceiptStatus } from "@/app/generated/prisma/enums"
import type { GoodsReceiptRow } from "../types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function GoodsReceiptDetailSections({ receipt }: { receipt: GoodsReceiptRow }) {
  const [editing, setEditing] = useState(false)
  return (
    <>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-secondary">Informations réception</CardTitle>
          {receipt.status === GoodsReceiptStatus.DRAFT && (
            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <Button
                    form="goods-receipt-update-form"
                    type="submit"
                    variant="default"
                  >
                    <Pen /> Modifier
                  </Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>Annuler</Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setEditing(true)}><Pen /> Modifier</Button>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent>
          {editing ? (
            <GoodsReceiptFormUpdate
              item={receipt}
              onSuccess={() => setEditing(false)}
              embedded
            />
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
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Commandé</TableHead>
                  <TableHead>Déjà reçu avant</TableHead>
                  <TableHead>Reçu cette fois</TableHead>
                  <TableHead>Reliquat après</TableHead>
                  <TableHead>Unité</TableHead>
                  <TableHead>Lot</TableHead>
                  <TableHead>Qualité</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receipt.lines.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-20 text-center text-muted-foreground">
                      Aucune ligne réceptionnée.
                    </TableCell>
                  </TableRow>
                ) : (
                  receipt.lines.map((line) => {
                    const ordered = Number(line.quantityOrdered ?? 0)
                    const receivedNow = Number(line.quantityReceived)
                    const receivedBefore = Number(line.receivedBefore ?? line.receivedQuantity ?? 0)
                    const remainingAfter = Number(line.remainingAfter ?? Math.max(0, ordered - receivedBefore - receivedNow))
                    return (
                      <TableRow key={line.id}>
                        <TableCell className="font-medium">{line.designation || line.productName || "-"}</TableCell>
                        <TableCell>{ordered}</TableCell>
                        <TableCell>{receivedBefore}</TableCell>
                        <TableCell>{receivedNow}</TableCell>
                        <TableCell>{remainingAfter}</TableCell>
                        <TableCell>{line.unit}</TableCell>
                        <TableCell>{line.lotNumber || "-"}</TableCell>
                        <TableCell>{line.qualityStatus || (line.qualityChecked ? "Vérifiée" : "-")}</TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
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
