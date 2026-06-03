"use client"
import {  useCallback, useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import TabsSwitch from "./Tabs"
import { CrmFields, CrmTableFields ,SalesFields,SalesTableFields,FiledsNeedCards} from "@/utils/constants"
import  DataTable  from "./data-table"
import { Card } from "./ui/card"
import DashboardCard from "./dashboard-card"
import {motion} from 'motion/react'
import {SortingState} from "@tanstack/react-table";
import AddDialog from "@/components/add-dialog";
import {useForm} from "react-hook-form";
import { useEntity } from "@/hooks/useEntity"
import { EntityKey } from "@/utils/form-config"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";

export default  function TabsWithTable(){
    const [pagination, setPagination] =useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([])
    const [open,setOpen] = useState(false)


    const path = usePathname()
    //const activeFields = path.includes("crm")?CrmFields:SalesFields
    const activeFields = CrmFields
    const activeTableFields = path.includes("crm")?CrmTableFields:SalesTableFields

    const [activeTab, setActiveTab] = useState<EntityKey >(activeFields[0])

    const entity = useEntity(activeTab,{pagination, sorting})

    const form = useForm({
        resolver: zodResolver(entity.schema),
        defaultValues: entity.defaultValues,
        mode:"all",
        reValidateMode:"onBlur",
    })

    useEffect(() => {
        form.reset(entity.defaultValues);
    }, [activeTab]);
    
    const onDelete = useCallback((ids:number[])=>{
        entity.actions.delete.mutate(ids)
    }, [entity.actions.delete])

    const onSubmit = useCallback( (data:any) => {
        entity.actions.create.mutate(data, {
            onSuccess: () => {
                form.reset(entity.defaultValues);
                setOpen(false);
            }
        })
    }, [entity.actions.create, form, entity.defaultValues])

    const { isPending, isError, data, error } = entity.actions.query

    const total=useMemo(() => {
            return data?.total || 0
        },[data?.total])
        
    const queryData = useMemo(() => data?.[activeTab.toLocaleLowerCase()] || [], [data])

    useEffect(() => {
        if(isError){
            toast.error(error?.message)
        }
    },[isError,error])
    
    return (
        <motion.div layout>
            <TabsSwitch setOpen={setOpen} constants={activeFields} activeTab={activeTab} setActiveTab={setActiveTab} towButtons={false}>
            <Card className="mt-4 px-4 py-6 flex flex-col gap-4">
                {FiledsNeedCards.includes(activeTab) && <DashboardCard/>}
                <DataTable isPending={isPending} schema={entity.schema} rowCount={total} sorting={sorting} setSorting={setSorting} pagination={pagination} setPagination={setPagination} constants={activeTableFields} activeTab={activeTab} data={queryData} onDelete={onDelete}/>
            </Card>
            </TabsSwitch>
            <AddDialog  constants={activeTableFields} activeTab={activeTab} open={open} form={form}  setOpen={setOpen}  onSubmit={onSubmit} isPending={entity.actions.create.isPending} />
        </motion.div>
        
    )
}