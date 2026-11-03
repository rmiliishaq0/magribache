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
import { fournisseurStats } from "@/modules/suppliers/constants/suppliers-stats";

import StatsCard from "@/components/stats-card";
import { toast } from "sonner";
import TableCellViewerEntity from "@/components/table-cell-viewer-entity";
import DevisFormUpdate from "@/modules/devis/components/devis-form-update";
import {fournisseurStatsColors} from "@/modules/suppliers/constants/colors"

import FilterBoardForm from "@/modules/suppliers/components/filter-board-form";
import { SuppliersSchemaWithId } from "@/modules/suppliers/types";
import { useFilterBoard } from "@/modules/suppliers/hooks/forms/use-filter-board";
import {suppliers} from "@/modules/suppliers/columns/suppliers"
import { filterSchema } from "@/modules/suppliers/schemas/filter-schema";
import { useGetSuppliers } from "@/modules/suppliers/hooks/queries/use-get-suppliers";
import EntityDialog from "@/components/entity-dialog";
import SupplierForm from "@/modules/suppliers/components/supplier-form";
import SupplierFormUpdate from "@/modules/suppliers/components/supplier-form-update";

export default function Suppliers() {
    const [isOpen,setIsOpen] =useState(false)
    const form= useFilterBoard()
    const [pagination, setPagination] =useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([])

    const [item,setItem] = useState<SuppliersSchemaWithId | null>(null)
    
    const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({
        currency:false,
        date:false,
        country:false,
        ifNumber:false,
        notes:false,
        ice:false
    })

    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    
    const filters = form.watch()


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
        
    const {isPending,isError,error,data} = useGetSuppliers({pagination:{...pagination,pageIndex:pagination.pageIndex+1},activeFilters})

    const suppliersData:SuppliersSchemaWithId[] = useMemo(()=>{
        return data?.suppliers?.suppliers || []
    },[data])
    
    
    useEffect(()=>{
        if(isError) toast.error(error?.message  || "Une erreur s'est produite")
    },[isError])

    const total = useMemo(()=>{
        return data?.suppliers?.total || 1
    },[data])

    const table = useReactTable({
    data:suppliersData,
    columns:suppliers({setItem}),
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
            <h2 className="text-2xl font-bold text-secondary mt-2 mb-6">Liste Des Fournisseurs</h2>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    {fournisseurStats.map((i,index)=>(
                <StatsCard key={index} Icon={i.icon} description={i.description} number={data?.suppliers?.[i.accessKey] || 0} style={fournisseurStatsColors[i.style]}/>
            ))}
                </div>
            <FilterBoard form={form} setIsOpen={setIsOpen} table={table} title="Fournisseur" >
                <FilterBoardForm form={form} data={suppliersData}/>
            </FilterBoard>
            <EntityDialog  title="fournisseur" open={isOpen} setIsOpen={setIsOpen}>
                    <SupplierForm setIsOpen={setIsOpen}/>
                </EntityDialog>  
            <DataTable<SuppliersSchemaWithId> table={table} isPending={isPending} />
            <TableCellViewerEntity  title={item?.reference || ""} item={item} setItem={setItem} link={`/admin/purchases/suppliers/${item?.reference}`} >
                {
                    item && <SupplierFormUpdate item={item} setItem={setItem} />
                }
            </TableCellViewerEntity>    
            </CardContent>
        </Card>
    )
}