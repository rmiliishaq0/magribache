"use client"

import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ActivityCard from "@/modules/crm/components/activity-card"
import type { Activity } from "@/modules/crm/types"

export default function SupplierHistory({ activities }: { activities: Activity[] }) {
  return activities.length === 0 ? (
    <CardContent className="flex items-center justify-center pb-6 text-muted-foreground">
      aucune donnée
    </CardContent>
  ) : (
    <div className="rounded-xl border">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h3 className="text-lg font-bold text-secondary">Historique</h3>
        <Badge variant="outline">{activities.length} activités</Badge>
      </div>
      <div className="relative p-5">
        <div className="absolute bottom-5 left-[36px] top-5 w-px bg-border" />
        <div className="relative space-y-4">
          {activities.map((activity) => <ActivityCard key={activity.id} activity={activity} />)}
        </div>
      </div>
    </div>
  )
}
