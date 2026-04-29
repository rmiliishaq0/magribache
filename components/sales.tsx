"use client"
import { useState } from "react"
import TabsSwitch from "./Tabs"
import { SalesFields } from "@/utils/constants"
import { DataTable } from "./data-table"
import { Card } from "./ui/card"

export default function Sales(){
    const [activeTab, setActiveTab] = useState(SalesFields[0])
    return(
        <TabsSwitch activeTab={activeTab} setActiveTab={setActiveTab}>
            <Card className="mt-4 px-4 py-6">
               <DataTable activeTab={activeTab} data={[]}/>     
            </Card>
        </TabsSwitch>
    )
}