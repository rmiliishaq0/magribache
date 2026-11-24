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

import {columns} from "@/modules/crm/columns/prospect"
import { crmScemaWithId } from "@/modules/crm/types";
import StatsCard from "@/components/stats-card";
import { crmStats } from "@/modules/crm/constants/prospects-stats";
import { statusColors } from "@/modules/crm/constants/colors";
import EntityDialog from "@/components/entity-dialog";
import ProspectForm from "@/modules/crm/components/prospect-form";
import { useGetProspects } from "@/modules/crm/hooks/queries/use-get-prospects";
import { useFilterBoard } from "@/modules/crm/hooks/forms";
import { toast } from "sonner";
import { filterSchema } from "@/modules/crm/schemas/filter";
import TableCellViewerEntity from "@/components/table-cell-viewer-entity";
import ProspectFormUpdate from "@/modules/crm/components/prospect-form-update";
import FilterBoardForm from "@/modules/crm/components/filter-board-form";

export default function CrmPage() {
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
        
    const {isPending,isError,error,data} = useGetProspects({pagination:{...pagination,pageIndex:pagination.pageIndex+1},activeFilters})
    const dataWithoutFilters = useGetProspects({})

    const prospects:z.infer<typeof crmScemaWithId>[] = useMemo(()=>{
        return data?.prospects?.prospects || []
    },[data])
    const prospectsWithoutFilters:z.infer<typeof crmScemaWithId>[] = useMemo(()=>{
        return dataWithoutFilters?.data?.prospects?.prospects || []
    },[dataWithoutFilters])
    
    useEffect(()=>{
        if(isError) toast.error(error?.message  || "Une erreur s'est produite")
    },[isError])
    const total = useMemo(()=>{
        return data?.prospects?.total || 1
    },[data])
    const table = useReactTable({
    data:prospects,
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
            <h2 className="text-2xl font-bold text-secondary mt-2 mb-6">Liste Des Prospects</h2>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    {crmStats.map((i,index)=>(
                <StatsCard key={index} Icon={i.icon} description={i.description} number={data?.prospects?.[i.accessKey] || 0} style={statusColors[i.style]}/>
            ))}
                </div>
            <FilterBoard form={form} setIsOpen={setIsOpen} table={table} title="prospect" >
                <FilterBoardForm form={form} data={prospectsWithoutFilters}/>
            </FilterBoard>
            <DataTable<z.infer<typeof crmScemaWithId>> table={table} isPending={isPending} />
                <EntityDialog  title="prospect" open={isOpen} setIsOpen={setIsOpen}>
                    <ProspectForm setIsOpen={setIsOpen}/>
                </EntityDialog>  
            <TableCellViewerEntity link={`/admin/crm/${item?.reference}`} title={item?.reference || ""} item={item} setItem={setItem}>
                {
                    item && <ProspectFormUpdate item={item} setItem={setItem} />
                }
            </TableCellViewerEntity>    
            </CardContent>
        </Card>
    )
}