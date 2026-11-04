"use client"

import { useState } from "react"
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type PaginationState,
  type RowSelectionState,
} from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DataTable from "@/components/data-table"
import { supplierProductsColumns, } from "../columns/supplier-products"
import { purchaseOrdersColumns } from "../columns/purchase-orders"
import { PurchaseOrderRow, SupplierProductRow } from "../types";

export default function SupplierRelatedData({
  products,
  purchaseOrders,
}: {
  products: SupplierProductRow[]
  purchaseOrders: PurchaseOrderRow[]
}) {
  const [productsPagination, setProductsPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [ordersPagination, setOrdersPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [productsSelection, setProductsSelection] = useState<RowSelectionState>({})
  const [ordersSelection, setOrdersSelection] = useState<RowSelectionState>({})

  const productsTable = useReactTable({
    data: products,
    columns: supplierProductsColumns,
    state: { pagination: productsPagination, rowSelection: productsSelection },
    onPaginationChange: setProductsPagination,
    onRowSelectionChange: setProductsSelection,
    enableRowSelection: true,
    getRowId: (row) => String(row.id),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const ordersTable = useReactTable({
    data: purchaseOrders,
    columns: purchaseOrdersColumns,
    state: { pagination: ordersPagination, rowSelection: ordersSelection },
    onPaginationChange: setOrdersPagination,
    onRowSelectionChange: setOrdersSelection,
    enableRowSelection: true,
    getRowId: (row) => String(row.id),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-secondary">Produits liés</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <DataTable<SupplierProductRow> table={productsTable} isPending={false} />
        </CardContent>
      </Card>
      <Card >
        <CardHeader>
          <CardTitle className="text-lg font-bold text-secondary">Commandes d&apos;achat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <DataTable<PurchaseOrderRow> table={ordersTable} isPending={false} />
        </CardContent>
      </Card>
    </div>
  )
}
