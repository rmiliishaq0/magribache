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
import EntityDialog from "@/components/entity-dialog";
import { toast } from "sonner";
import TableCellViewerEntity from "@/components/table-cell-viewer-entity";
import ProspectFormUpdate from "@/modules/crm/components/prospect-form-update";
import { productstats } from "@/modules/products/constants/products-stats";
import { productTypeColors } from "@/modules/products/constants/colors";
import FilterBoardForm from "@/modules/products/components/filter-board-form";
import { useFilterBoard } from "@/modules/products/hooks/forms/use-filter-board";
import { Fournisseur, productsSchemaWithId } from "@/modules/products/types";
import { columns } from "@/modules/products/columns/products";
import ProductForm from "@/modules/products/components/products-form";
import { useGetProducts } from "@/modules/products/hooks/queries/use-get-products";
import { filterSchema } from "@/modules/products/schemas/filter";
import { useGetSuppliers } from "@/modules/products/hooks/queries/use-get-suppliers";
import ProductsFormUpdate from "@/modules/products/components/products-form-update";

export default function ProductsPage() {
    const form= useFilterBoard()
    const [pagination, setPagination] =useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([])
    const [isOpen,setIsOpen] =useState(false)

    const [item,setItem] = useState<productsSchemaWithId | null>(null)
    
    const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({
        color:false,
        grammage:false,
        taxRate:false,
        salePriceHT:false,
        purchasePriceHT:false,
        maximumStock:false,
        minimumStock:false,
        trackLot:false,
        trackSerialNumber:false,
        dimensions:false,
        material:false,
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
        
    const {isPending,isError,error,data} = useGetProducts({pagination:{...pagination,pageIndex:pagination.pageIndex+1},activeFilters})
    const suppliersData = useGetSuppliers()
    
    const products:productsSchemaWithId[] = useMemo(()=>{
        return data?.products?.products || []
    },[data])

    const suppliers:Fournisseur[] = useMemo(()=>{
        return suppliersData.data?.suppliers || []
    },[suppliersData])
    
    useEffect(()=>{
        if(isError) toast.error(error?.message  || "Une erreur s'est produite")
    },[isError])
    const total = useMemo(()=>{
        return data?.products?.total || 1
    },[data])
    const table = useReactTable({
    data:products,
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
            <h2 className="text-2xl font-bold text-secondary mt-2 mb-6">Liste Des Produits</h2>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    {productstats.map((i,index)=>(
                <StatsCard key={index} Icon={i.icon} description={i.description} number={data?.products?.[i.accessKey] || 0} style={productTypeColors[i.style]}/>
            ))}
                </div>
            <FilterBoard form={form} setIsOpen={setIsOpen} table={table} title="Produit" >
                <FilterBoardForm form={form} data={suppliers}/>
            </FilterBoard>
            <DataTable<productsSchemaWithId> table={table} isPending={isPending} />
                <EntityDialog  title="prospect" open={isOpen} setIsOpen={setIsOpen}>
                    <ProductForm suppliers={suppliers} setIsOpen={setIsOpen}/>
                </EntityDialog>  
            <TableCellViewerEntity link={`/admin/stock/products/${item?.reference}`} title={item?.reference || ""} item={item} setItem={setItem}>
                {
                    item && <ProductsFormUpdate item={item} setItem={setItem} />
                }
            </TableCellViewerEntity>    
            </CardContent>
        </Card>
    )
}