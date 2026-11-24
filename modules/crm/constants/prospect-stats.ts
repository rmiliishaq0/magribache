import { Clock4, LucideIcon, MoreHorizontal, Package, User } from "lucide-react";
import {  ProspectStats } from "../types";
import { partnerSourceIcons, statusIcons } from "./icons";
import { sourceColors, statusColors } from "./colors";

export const prospectStats:ProspectStats[]  = [
    {
        title:"Statut",
        accessKey:"status",
        getIcon: (key)=> statusIcons[key as keyof typeof statusIcons] || User,
        getStyle:(key)=> statusColors[key as  keyof typeof statusColors]
    },
    {
        title:"Capacité demandée",
        accessKey:"rc",
        getIcon: ()=>Package,
        getStyle:()=> statusColors["QUALIFIED"]
    },
    {
        title:"Prochaine relance",
        accessKey:"nextFollowUpAt",
        getIcon:()=>Clock4,
        getStyle:()=> statusColors["TO_MONITOR"]
    },
    {
        title:"Source",
        accessKey:"source",
        getIcon:(key) => partnerSourceIcons[key as keyof typeof partnerSourceIcons] || MoreHorizontal,
        getStyle:(key)=> sourceColors[key as keyof typeof partnerSourceIcons]
    }
]
