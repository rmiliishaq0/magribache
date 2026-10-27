"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/data-table"
import { SortingState, useReactTable } from "@tanstack/react-table";
import {
    ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { useState } from "react";
import {ProductStockLotType} from "@/modules/products/types"
import { columns } from "../columns/stock-lot";


export default function ProductStockLot({productStockLot}:{productStockLot:ProductStockLotType[] | undefined}){
    const data = null
     const [pagination, setPagination] =useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
    data:productStockLot || [],
    columns:columns,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold text-secondary">Lots de stock</CardTitle>
            </CardHeader>
            <CardContent>
                {data ? 
                <DataTable<ProductStockLotType> isPending={!data} table={table}/>
                : <div className="pb-6 text-muted-foreground flex items-center justify-center text-md ">Il n'y a pas de lots de stock</div>}
            </CardContent>
        </Card>
    )
}