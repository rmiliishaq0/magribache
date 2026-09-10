"use client"

import DataTable from "@/components/data-table";
import FilterBoard from "@/components/filter-board";
import { Card, CardContent } from "@/components/ui/card";
import {useEffect, useMemo, useState} from "react"
import z from "zod";
import {
    ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"

import StatsCard from "@/components/stats-card";
import { statusColors } from "@/modules/crm/constants/colors";
import { toast } from "sonner";
import TableCellViewerEntity from "@/components/table-cell-viewer-entity";
import ProspectFormUpdate from "@/modules/crm/components/prospect-form-update";
import { devisStats } from "@/modules/devis/constants/devis-stats";
import { useFilterBoard } from "@/modules/devis/hooks/forms/use-filter-board";
import FilterBoardForm from "@/modules/devis/components/filter-board-form"
import { columns } from "@/modules/devis/columns/devis";
import { devisSchemaWithId } from "@/modules/devis/schemas/devis";
import { useGetDevis } from "@/modules/devis/hooks/queries/use-get-devis";
import { filterSchema } from "@/modules/devis/schemas/devis-filter-schema";
import { useGetClientsWithDevis } from "@/modules/devis/hooks/queries/use-get-clients";
import { CLientWithDevis } from "@/modules/devis/types";

export default function Devis() {
    const form= useFilterBoard()
    const [pagination, setPagination] =useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([])

    const [item,setItem] = useState<z.infer<typeof devisSchemaWithId> | null>(null)
    
    const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({
        montantTTC:false,
        montantTVA:false,
        ajustement:false,
        remise:false,
        notes:false,
        devise:false
    })

    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    
    const filters = form.watch()

    console.log("filters",filters)

    const activeFilters:z.infer<typeof filterSchema> = useMemo(() => {
        return Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => {
            if (value === "" || value === undefined || value === null) {
                return false;
            }

            if (
                typeof value === "object" &&
                value !== null &&
                "from" in value &&
                "to" in value
            ) {
                return value.from || value.to;
            }

            return true;
            })
        );
        }, [filters]);
        
    const {isPending,isError,error,data} = useGetDevis({pagination:{...pagination,pageIndex:pagination.pageIndex+1},activeFilters})
    const clientsWithDevis = useGetClientsWithDevis()

    const devis:z.infer<typeof devisSchemaWithId>[] = useMemo(()=>{
        return data?.devis?.devis || []
    },[data])
    const getClientsWithDevis:CLientWithDevis[] = useMemo(()=>{
        return clientsWithDevis?.data?.clients || []
    },[clientsWithDevis])
    
    useEffect(()=>{
        if(isError) toast.error(error?.message  || "Une erreur s'est produite")
    },[isError])
    const total = useMemo(()=>{
        return data?.devis?.total || 1
    },[data])
    const table = useReactTable({
    data:devis,
    columns:columns({setItem}),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination:true,
    pageCount:Math.ceil(total/pagination.pageSize),
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
            <CardContent className=" space-y-6 mb-4">
            <h2 className="text-2xl font-bold text-secondary mt-2 mb-6">Liste Des Devis</h2>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    {devisStats.map((i,index)=>(
                <StatsCard key={index} Icon={i.icon} description={i.description} number={data?.devis?.[i.accessKey] || 0} style={statusColors[i.style]}/>
            ))}
                </div>
            <FilterBoard form={form} link="admin/devis/create" table={table} title="devis" >
                <FilterBoardForm form={form} data={getClientsWithDevis}/>
            </FilterBoard>
            <DataTable<z.infer<typeof devisSchemaWithId>> table={table} isPending={isPending} />
            <TableCellViewerEntity  title={item?.reference || ""} item={item} setItem={setItem}>
                {
                    item && <ProspectFormUpdate item={item} setItem={setItem} />
                }
            </TableCellViewerEntity>    
            </CardContent>
        </Card>
    )
}