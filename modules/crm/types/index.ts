import { z } from "zod";
import { crmSchema } from "../schemas/prospect";
import { LucideIcon } from "lucide-react";
import { statusColors } from "../constants/colors";
import { PartnerPriority, PartnerSource, PartnerStatus, Prisma } from "@/app/generated/prisma/client";
import { SimpleIcon } from "simple-icons";
import React from "react";
import { ActivityType, CompanyType, DocumentStatus } from "@/app/generated/prisma/browser";

export const crmScemaWithId = crmSchema.extend({id:z.number(),reference:z.string().optional()})

export type CrmStats = {
    icon:LucideIcon
    description:string
    style:keyof typeof statusColors,
    accessKey:string
}

export type StatsType  = {
    number:number | string
    Icon :LucideIcon | SimpleIcon
    description:string
    style:string
    extra?: React.ReactElement
}

export type FilterType ={
    status?: PartnerStatus;
    city?: string;
    region?: string;
    priority?: PartnerPriority;
    source?: PartnerSource;
    date?: {from?:string,to?:string}
    companyType?:CompanyType
}

type BusinessPartner = Prisma.BusinessPartnerGetPayload<{}>

export type ProspectStats={
    title:string
    accessKey: keyof BusinessPartner
    getIcon:(value: string) => LucideIcon | SimpleIcon
    getStyle:(value:string) =>string

}

export type ActivityLog = {
  id: string;
  field: string;
  oldValue: string | null;
  newValue: string | null;
  createdAt: Date;
};

export type Activity = {
  id: string;
  entityType: string;
  action: ActivityType;
  note: string | null;
  createdAt: Date;
  logs: ActivityLog[];
};

export type Devis =  {
    id:number
    numero: String,
    createdAt:Date,
    montantTTC:number,
    status:DocumentStatus
}

export enum ProspectStatus  {
    NEW,
    CONTACTED,
    QUALIFIED,
    QUOTE_TO_PREPARE,
    QUOTE_SENT,
    NEGOTIATION,
    WON,
    LOST,
    FOLLOW_UP_LATER,
}