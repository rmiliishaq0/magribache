"use client"
import { formatDate } from "@/utils/format-date";
import { fieldLabels } from "../constants/options-to-frensh";
import ActivityIcon from "./activity-icon";
import ValueBadge from "./value-badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Activity } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ACTIVITY_TYPE_CONFIG } from "../constants/colors";
import { cn } from "@/lib/utils";

 
 export default function ActivityCard({ activity }: { activity: Activity }) {
  const [open, setOpen] = useState(false);

  const isCreated = activity.action === "CREATED";
  const hasLogs = activity.logs.length > 0;
    const style = ACTIVITY_TYPE_CONFIG[activity.action as keyof typeof ACTIVITY_TYPE_CONFIG]; 
  return (
    <div className="relative flex gap-4">

      <div className="relative z-10">
        <ActivityIcon action={activity.action} />
      </div>

      <Card className="min-w-0 flex-1 border shadow-none">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">
                  {activity.note || (isCreated ? "Partenaire créé" : "Partenaire mis à jour")}
                </h4>

                <Badge
                  variant="secondary"
                  className={cn(style.className)}
                >
                  {activity.action}
                </Badge>
              </div>

              {/* <p className="mt-1 text-xs text-muted-foreground">
                {activity.note}
              </p> */}
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <span className="text-xs text-muted-foreground">
                {formatDate(activity.createdAt)}
              </span>

              {hasLogs && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={() => setOpen((v) => !v)}
                >
                  {open ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {hasLogs && open && (
            <>
              <Separator className="my-4" />

              <div className="space-y-3">
                {activity.logs.map((log) => (
                  <div
                    key={log.id}
                    className="grid grid-cols-[120px_1fr] items-center gap-4"
                  >
                    <span className="text-xs font-medium text-muted-foreground">
                      {fieldLabels[log.field as keyof typeof fieldLabels]}
                    </span>

                    <div className="flex min-w-0 items-center gap-2">
                      <ValueBadge value={log.oldValue} type="old" />

                      <span className="text-muted-foreground">→</span>

                      <ValueBadge value={log.newValue} type="new" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {hasLogs && !open && (
            <button
              onClick={() => setOpen(true)}
              className="mt-3 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              {activity.logs.length}{" "}
              {activity.logs.length === 1 ? "modification" : "modifications"}
              {" · "}
              Voir les détails
            </button>
          )}

          {isCreated && (
            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600">
              <Check className="size-3.5" />
              <span>Création du partenaire</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}