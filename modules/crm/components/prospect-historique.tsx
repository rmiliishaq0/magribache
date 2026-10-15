import {  CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "../types";
import ActivityCard from "./activity-card";


export function ProspectHistorique({
  activities,
}: {
  activities: Activity[] | undefined;
}) {
    if(!activities) return <CardContent>
 <div className="pb-6 text-muted-foreground flex items-center justify-center text-md ">aucune donnée</div>
          </CardContent>
  return (
    <div className="rounded-xl border">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-2">
          <div>
            <h3 className="text-lg font-bold text-secondary">Historique</h3>
          </div>
        </div>

        <Badge variant="outline">
          {activities.length} activités
        </Badge>
      </div>

      <div className="relative p-5">
        <div className="absolute bottom-5 left-[36px] top-5  w-px bg-border" />

        <div className="relative space-y-4">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}