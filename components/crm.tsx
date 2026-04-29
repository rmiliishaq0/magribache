"use client"

import { useState } from "react"
import TabsSwitch from "./Tabs"
import { CrmFields } from "@/utils/constants"
import { DataTable } from "./data-table"
import { Card } from "./ui/card"

export default function Crm(){
    const [activeTab, setActiveTab] = useState(CrmFields[0])
    return(
        <TabsSwitch activeTab={activeTab} setActiveTab={setActiveTab} towButtons={false}>
            <Card className="mt-4 px-4 py-6">
               <DataTable activeTab={activeTab} data={[]}/>     
            </Card>
        </TabsSwitch>
    )
}
    