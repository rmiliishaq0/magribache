"use client"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import { filterBoard } from "@/types/filter-board";
import { Button } from "./ui/button";
import {Download, Plus, RefreshCcw} from "lucide-react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { IconChevronDown, IconLayoutColumns } from "@tabler/icons-react";
import { useExport } from "@/modules/crm/hooks/export/use-export-to-csv";
import { useRouter } from "next/navigation";

export default function FilterBoard({title,table,setIsOpen,children,form,link}:filterBoard){ 
    const {exportCsv}= useExport({filename:title,table})
    const router = useRouter()
    return(
        <Card className="p-4">
            <CardHeader>
                {children}
            </CardHeader>
            <CardContent className="flex gap-4 mt-2 flex-wrap justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Button onClick={()=>{form.reset()}} variant={"ghost"}><RefreshCcw/> Reinitialiser</Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <IconLayoutColumns />
                                <span className="hidden lg:inline">Customize Columns</span>
                                <span className="lg:hidden">Columns</span>
                                <IconChevronDown />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                            {table
                                .getAllColumns()
                                .filter(
                                (column) =>
                                    typeof column.accessorFn !== "undefined" &&
                                    column.getCanHide()
                                )
                                .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                    >
                                    {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                </div>
                <div className="flex gap-2 items-center">
                    <Button onClick={()=>link ? router.push("/admin/devis/create") : setIsOpen && setIsOpen(true)}><Plus/> Nouveau {title}</Button>
                    <Button disabled={table.getFilteredRowModel().rows == undefined || table.getFilteredRowModel().rows == null || table.getFilteredRowModel().rows.length<1} onClick={exportCsv} variant={"outline"}><Download/> Exporter</Button>
                </div>             
            </CardContent>
        </Card>
    )
}