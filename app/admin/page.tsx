import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/dashboard-card";
import { SendToBack } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import RevenueCard from "@/components/revenue-card";
import SalesCard from "@/components/sales-card";
import Chart from "@/components/Chart"
import CalendarCustomDays from "@/components/Calendar"
import { Card } from "@/components/ui/card";

export default function AdminHome() {
    return (
       <Card className="space-y-8 mb-4 p-4">
            <div className="flex items-center justify-between">
                <div>
                <h2 className="text-lg font-bold text-secondary">Vue d'ensemble opérationnelle</h2>
                <p className="text-muted-foreground text-sm">Suivi du stock et des indicateurs de vente en temps réel.</p>
            </div>
                <div>
                    <Button className="cursor-pointer transition hover:opacity-90 p-4">Exporter le Rapport</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({length: 8}).map((_,i)=>(
                    <DashboardCard key={i} title="Rupture de stock" number={10} extra="Articles" Logo={<SendToBack/>}>
                        <Progress value={100}/>
                    </DashboardCard>
                ))}
            </div>
            <div className="flex gap-4">
                <div className="flex gap-4 flex-col grow w-1/2">
                    <RevenueCard/>           
                    <Chart/>                    
                </div>
                <div className="flex gap-4 flex-col grow w-1/2">
                    <SalesCard />
                    <CalendarCustomDays/>
                </div>
            </div>
       </Card>
    )
}