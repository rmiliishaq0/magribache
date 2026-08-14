import { Card, CardContent } from "./ui/card";
import type { ElementType } from "react";
import { StatsType } from "@/modules/crm/types";
import { Badge } from "./ui/badge";

export default function StatsCard({number,description,Icon,style,extra}:StatsType){
    const IconComponent = Icon as ElementType;

    return(
        <Card>
            <CardContent className="flex gap-3 items-center">
                <div className={`p-2 rounded-full ${style} `}>
                    {<IconComponent size={35} />}
                </div>
                <div className="flex flex-col items-start shrink">
                    <h2 className="text-xl font-bold">{number}</h2>
                    <span className="text-sm text-muted-foreground">{description}</span>
                </div>                   
                {extra}
            </CardContent>
        </Card>
    )
}