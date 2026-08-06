import { z } from "zod";
import { crmSchema } from "../schemas/prospect";
import { LucideIcon } from "lucide-react";
import { statusColors } from "../constants/colors";
import { PartnerPriority, PartnerSource, PartnerStatus } from "@/app/generated/prisma/client";

export const crmScemaWithId = crmSchema.extend({id:z.number(),reference:z.string().optional()})

export type CrmStats = {
    icon:LucideIcon
    description:string
    style:keyof typeof statusColors,
    accessKey:string
}

export type StatsType  = {
    number:number | string
    Icon :LucideIcon
    description:string
    style:string
    extra?: string
}

export type FilterType ={
    status?: PartnerStatus;
    city?: string;
    region?: string;
    priority?: PartnerPriority;
    source?: PartnerSource;
    date?: {from?:string,to?:string}
}
