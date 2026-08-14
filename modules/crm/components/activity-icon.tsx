import { cn } from "@/lib/utils";
import { ACTIVITY_TYPE_CONFIG } from "../constants/colors";
import { Activity } from "../types";
import {
  CirclePlus,
  FilePenLine,
} from "lucide-react";

export default function ActivityIcon({ action }: { action: Activity["action"] }) {
    const style = ACTIVITY_TYPE_CONFIG[action];  
    return (
      <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-full ring-4 ring-background",style.className)}>
        <style.icon className="size-4"/>
      </div>
    );
 
}
