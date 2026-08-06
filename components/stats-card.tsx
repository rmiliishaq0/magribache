import { ContactRound } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { StatsType } from "@/modules/crm/types";

export default function StatsCard({number,description,Icon,style}:StatsType){
    return(
        <Card>
            <CardContent className="flex gap-4 items-center">
                <div className={`p-2 rounded-full ${style}`}>
                    <Icon size={35}/>
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-3xl font-bold">{number}</h2>
                    <span className="text-sm text-muted-foreground">{description}</span>
                </div>
            </CardContent>
        </Card>
    )
}