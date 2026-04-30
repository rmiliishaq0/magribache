"use client"
import { useState } from "react"
import TabsSwitch from "./Tabs"
import { SalesFields } from "@/utils/constants"
import { DataTable } from "./data-table"
import { Card } from "./ui/card"
import { SalesTableFields ,FiledsNeedCards} from "@/utils/constants"
import DashboardCard from "./dashboard-card"

export default function Sales(){
    const [activeTab, setActiveTab] = useState(SalesFields[0])
    return(
        <TabsSwitch constants={SalesFields} activeTab={activeTab} setActiveTab={setActiveTab}>
            <Card className="mt-4 px-4 py-6">
                {FiledsNeedCards.includes(activeTab) && <DashboardCard  title="test"><p>ds</p></DashboardCard>}
               <DataTable constants={SalesTableFields} activeTab={activeTab} data={[]}/>     
            </Card>
        </TabsSwitch>
    )
}