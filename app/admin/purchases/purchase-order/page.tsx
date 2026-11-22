"use client"

import { useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnFiltersState, type SortingState, type VisibilityState } from "@tanstack/react-table"
import { Card, CardContent } from "@/components/ui/card"
import DataTable from "@/components/data-table"
import FilterBoard from "@/components/filter-board"
import EntityDialog from "@/components/entity-dialog"
import TableCellViewerEntity from "@/components/table-cell-viewer-entity"
import StatsCard from "@/components/stats-card"
import { toast } from "sonner"
import { useGetPurchaseOrders } from "@/modules/purchases/hooks/queries/use-get-purchase-orders"
import { purchaseOrderColumns } from "@/modules/purchases/columns/purchase-orders"
import type { PurchaseOrderRow } from "@/modules/purchases/types"
import PurchaseOrderForm from "@/modules/purchases/components/purchase-order-form"
import PurchaseOrderFilterForm from "@/modules/purchases/components/filter-board-form"
import { purchaseOrderFilterSchema } from "@/modules/purchases/schemas/filter-schema"
import { purchaseOrderStats } from "@/modules/purchases/constants/purchase-order-stats"
import { useGetSuppliers } from "@/modules/suppliers/hooks/queries/use-get-suppliers"
import type { z } from "zod"
import PurchaseOrderFormUpdate from "@/modules/purchases/components/purchase-order-form-update";

export default function PurchaseOrder() {
  const form = useForm<z.infer<typeof purchaseOrderFilterSchema>>({
    resolver: zodResolver(purchaseOrderFilterSchema),
    defaultValues: {},
  })
  const [isOpen, setIsOpen] = useState(false)
  const [item, setItem] = useState<PurchaseOrderRow | null>(null)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const filters = form.watch()
  const activeFilters = useMemo(() => Object.fromEntries(Object.entries(filters).filter(([, value]) => {
    if (value === undefined || value === null) return false
    if (typeof value === "object" && "from" in value && "to" in value) return value.from || value.to
    return true
  })) as z.infer<typeof purchaseOrderFilterSchema>, [filters])
  const query = useGetPurchaseOrders({ page: pagination.pageIndex + 1, limit: pagination.pageSize, activeFilters })
  const suppliersQuery = useGetSuppliers({})
  const suppliers = suppliersQuery.data?.suppliers?.suppliers ?? []
  const orders: PurchaseOrderRow[] = useMemo(() => query.data?.purchaseOrders ?? [], [query.data])
  const total = query.data?.total ?? 0
  useEffect(() => {
    if (query.isError) toast.error(query.error.message || "Une erreur s'est produite")
  }, [query.isError, query.error])
  const table = useReactTable({
    data: orders,
    columns: purchaseOrderColumns({ setItem }),
    state: { pagination, sorting, columnFilters, columnVisibility },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getRowId: (row) => String(row.id),
    manualPagination: true,
    pageCount: Math.max(1, Math.ceil(total / pagination.pageSize)),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableRowSelection: true,
  })

  return (
    <Card>
      <CardContent className="mb-4 space-y-6 ">
        <h2 className="mt-2 text-2xl font-bold text-secondary">Liste des commandes d&apos;achat</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {purchaseOrderStats.map((stat) => (
            <StatsCard key={stat.accessKey} Icon={stat.icon} description={stat.description} number={query.data?.stats?.[stat.accessKey] ?? 0} style={stat.style} />
          ))}
        </div>
        <FilterBoard form={form} setIsOpen={setIsOpen} table={table} title="commande d'achat">
          <PurchaseOrderFilterForm form={form} suppliers={suppliers} />
        </FilterBoard>
        <DataTable<PurchaseOrderRow> table={table} isPending={query.isPending} />
        <EntityDialog title="commande d'achat" open={isOpen} setIsOpen={setIsOpen}>
          <PurchaseOrderForm onSuccess={() => setIsOpen(false)} />
        </EntityDialog>
        <TableCellViewerEntity title={item?.reference ?? ""} item={item} setItem={setItem} link={`/admin/purchases/purchase-order/${item?.reference}`}>
          {item && <PurchaseOrderFormUpdate item={item} onSuccess={() => setItem(null)} />}
        </TableCellViewerEntity>
      </CardContent>
    </Card>
  )
}
