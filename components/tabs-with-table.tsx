"use client"
import { act, useState } from "react"
import { usePathname } from "next/navigation"
import TabsSwitch from "./Tabs"
import { CrmFields, CrmTableFields ,SalesFields,SalesTableFields,FiledsNeedCards} from "@/utils/constants"
import { DataTable } from "./data-table"
import { Card } from "./ui/card"
import DashboardCard from "./dashboard-card"
import {motion} from 'motion/react'

export default function TabsWithTable(){
    const path = usePathname()
    const activeFields = path.includes("crm")?CrmFields:SalesFields
    const activeTableFields = path.includes("crm")?CrmTableFields:SalesTableFields
    
    const [activeTab, setActiveTab] = useState(activeFields[0])
    return (
        <motion.div layout>
            <TabsSwitch constants={activeFields} activeTab={activeTab} setActiveTab={setActiveTab} towButtons={false}>
            <Card className="mt-4 px-4 py-6 flex flex-col gap-4">
                {FiledsNeedCards.includes(activeTab) && <DashboardCard/>}
                <DataTable constants={activeTableFields} activeTab={activeTab} data={[]}/>     
            </Card>
            </TabsSwitch>
        </motion.div>
        
    )
}