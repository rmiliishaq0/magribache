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

import { crmScemaWithId } from "@/modules/crm/types";
import StatsCard from "@/components/stats-card";
import { statusColors } from "@/modules/crm/constants/colors";
import EntityDialog from "@/components/entity-dialog";
import { useGetProspects } from "@/modules/crm/hooks/queries/use-get-prospects";
import { useFilterBoard } from "@/modules/crm/hooks/forms";
import { toast } from "sonner";
import { filterSchema } from "@/modules/crm/schemas/filter";
import TableCellViewerEntity from "@/components/table-cell-viewer-entity";
import ProspectFormUpdate from "@/modules/crm/components/prospect-form-update";
import { clientsStats } from "@/modules/clients/constants/clients-stats";
import FilterBoardForm from "@/modules/clients/components/filter-board-form";
import ClientForm from "@/modules/clients/components/client-form";
import { columns } from "@/modules/clients/columns/client";
import { useGetClients } from "@/modules/clients/hooks/queries/use-get-clients";
import ClientFormUpdate from "@/modules/clients/components/client-form-update";


export default function Clients() {
    const form= useFilterBoard()
    const [pagination, setPagination] =useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([])
    const [isOpen,setIsOpen] =useState(false)

    const [item,setItem] = useState<z.infer<typeof crmScemaWithId> | null>(null)
    
    const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({
        companyName:false,
        website:false,
        adresse:false,
        region:false,
        country:false,
        ice:false,
        rc:false,
        ifNumber:false
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
        
    const {isPending,isError,error,data} = useGetClients({pagination:{...pagination,pageIndex:pagination.pageIndex+1},activeFilters})

    const dataWithoutFilters = useGetClients({})

    const clientsWithoutFilters:z.infer<typeof crmScemaWithId>[]  = useMemo(()=>{
        return dataWithoutFilters?.data?.clients?.clients || []
    },[dataWithoutFilters])    
    const clients:z.infer<typeof crmScemaWithId>[] = useMemo(()=>{
        return data?.clients?.clients || []
    },[data])
    
    useEffect(()=>{
        if(isError) toast.error(error?.message  || "Une erreur s'est produite")
    },[isError])
    const total = useMemo(()=>{
        return data?.clients?.total || 1
    },[data])
    const table = useReactTable({
    data:clients,
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
    onPaginationChange: setPagination,
    manualPagination:true,
    pageCount:Math.ceil(total/pagination.pageSize),
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
            <h2 className="text-2xl font-bold text-secondary mt-2 mb-6">Liste Des Clients</h2>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    {clientsStats.map((i,index)=>(
                <StatsCard key={index} Icon={i.icon} description={i.description} number={data?.clients?.[i.accessKey] || 0} style={statusColors[i.style]}/>
            ))}
                </div>
            <FilterBoard form={form} setIsOpen={setIsOpen} table={table} title="clients" >
                <FilterBoardForm form={form} data={clientsWithoutFilters}/>
            </FilterBoard>
            <DataTable<z.infer<typeof crmScemaWithId>> table={table} isPending={isPending} />
                <EntityDialog title="prospect" open={isOpen} setIsOpen={setIsOpen}>
                    <ClientForm setIsOpen={setIsOpen}/>
                </EntityDialog>  
            <TableCellViewerEntity link={`/admin/clients/${item?.reference}`} title={item?.reference || ""} item={item} setItem={setItem}>
                {
                    item && <ClientFormUpdate item={item} setItem={setItem} />
                }
            </TableCellViewerEntity>    
            </CardContent>
        </Card>
    )
}