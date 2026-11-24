"use client"

import { useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnFiltersState, type SortingState, type VisibilityState } from "@tanstack/react-table"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import DataTable from "@/components/data-table"
import FilterBoard from "@/components/filter-board"
import EntityDialog from "@/components/entity-dialog"
import TableCellViewerEntity from "@/components/table-cell-viewer-entity"
import StatsCard from "@/components/stats-card"
import { goodsReceiptFilterSchema } from "@/modules/purchases/schemas/goods-receipt-filter-schema"
import { useGoodsReceiptColumns } from "@/modules/purchases/columns/goods-receipts"
import { goodsReceiptStats } from "@/modules/purchases/constants/goods-receipt-stats"
import GoodsReceiptFilterForm from "@/modules/purchases/components/goods-receipt-filter-form"
import GoodsReceiptForm from "@/modules/purchases/components/goods-receipt-form"
import { useGetGoodsReceipts } from "@/modules/purchases/hooks/queries/use-get-goods-receipts"
import { useGetSuppliers } from "@/modules/suppliers/hooks/queries/use-get-suppliers"
import type { GoodsReceiptRow } from "@/modules/purchases/types"
import GoodsReceiptFormUpdate from "@/modules/purchases/components/goods-receipt-form-update";

export default function GoodsReceipt() {
  const form = useForm<z.infer<typeof goodsReceiptFilterSchema>>({
    resolver: zodResolver(goodsReceiptFilterSchema),
    defaultValues: {},
  })
  const [isOpen, setIsOpen] = useState(false)
  const [item, setItem] = useState<GoodsReceiptRow | null>(null)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const filters = form.watch()
  const activeFilters = useMemo(
    () => Object.fromEntries(Object.entries(filters).filter(([, value]) => {
      if (value === undefined || value === null) return false
      if (typeof value === "object" && "from" in value && "to" in value) return value.from || value.to
      return true
    })) as z.infer<typeof goodsReceiptFilterSchema>,
    [filters],
  )
  const query = useGetGoodsReceipts({ page: pagination.pageIndex + 1, limit: pagination.pageSize, activeFilters })
  const suppliersQuery = useGetSuppliers({ activeFilters: {} })
  const suppliers = suppliersQuery.data?.suppliers?.suppliers ?? []
  const receipts: GoodsReceiptRow[] = useMemo(() => query.data?.goodsReceipts ?? [], [query.data])
  const total = query.data?.total ?? 0

  useEffect(() => {
    if (query.isError) toast.error(query.error.message || "Une erreur s'est produite")
  }, [query.isError, query.error])

  const goodsReceiptColumns = useGoodsReceiptColumns({ setItem })
  const table = useReactTable({
    data: receipts,
    columns: goodsReceiptColumns,
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
  })

  return (
    <Card>
      <CardContent className="mb-4 space-y-6">
        <h2 className="mt-2 text-2xl font-bold text-secondary">Liste des réceptions</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {goodsReceiptStats.map((stat) => (
            <StatsCard key={stat.accessKey} Icon={stat.icon} description={stat.description} number={query.data?.stats?.[stat.accessKey] ?? 0} style={stat.style} />
          ))}
        </div>
        <FilterBoard form={form} setIsOpen={setIsOpen} table={table} title="réception">
          <GoodsReceiptFilterForm form={form} suppliers={suppliers} />
        </FilterBoard>
        <DataTable<GoodsReceiptRow> table={table} isPending={query.isPending} />
        <EntityDialog title="réception" open={isOpen} setIsOpen={setIsOpen}>
          <GoodsReceiptForm onSuccess={() => setIsOpen(false)} />
        </EntityDialog>
        <TableCellViewerEntity
          title={item?.reference ?? ""}
          item={item}
          setItem={setItem}
          link={`/admin/purchases/goods-receipt/${item?.reference}`}
        >
          {item && <GoodsReceiptFormUpdate item={item} setItem={setItem} onSuccess={() => setItem(null)} />}
        </TableCellViewerEntity>
      </CardContent>
    </Card>
  )
}