"use client"
import {  useState } from "react"
import { usePathname } from "next/navigation"
import TabsSwitch from "./Tabs"
import { CrmFields, CrmTableFields ,SalesFields,SalesTableFields,FiledsNeedCards} from "@/utils/constants"
import  DataTable  from "./data-table"
import { Card } from "./ui/card"
import DashboardCard from "./dashboard-card"
import {motion} from 'motion/react'
import {SortingState} from "@tanstack/react-table";
import {useQueryClient} from "@tanstack/react-query";
import z from "zod"
import AddDialog from "@/components/add-dialog";
import {taskSchema} from "@/utils/schema";
import {useForm} from "react-hook-form";

export default function TabsWithTable(){
    const form =useForm<z.infer<typeof taskSchema>>()
    const [pagination, setPagination] =useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([])
    const [open,setOpen] = useState(false)

    const queryClient = useQueryClient();

    const path = usePathname()
    const activeFields = path.includes("crm")?CrmFields:SalesFields
    const activeTableFields = path.includes("crm")?CrmTableFields:SalesTableFields
    
    const [activeTab, setActiveTab] = useState(activeFields[0])
    function handelDelete(){

    }
    return (
        <motion.div layout>
            <TabsSwitch setOpen={setOpen} constants={activeFields} activeTab={activeTab} setActiveTab={setActiveTab} towButtons={false}>
            <Card className="mt-4 px-4 py-6 flex flex-col gap-4">
                {FiledsNeedCards.includes(activeTab) && <DashboardCard/>}
                <DataTable schema={z.number()} rowCount={10} sorting={sorting} setSorting={setSorting} pagination={pagination} setPagination={setPagination} constants={activeTableFields} activeTab={activeTab} data={[]} onDelete={handelDelete}/>
            </Card>
            </TabsSwitch>
            <AddDialog constants={activeTableFields} activeTab={activeTab} open={open} form={form}  setOpen={setOpen}  onSubmit={()=>{}} />
        </motion.div>
        
    )
}