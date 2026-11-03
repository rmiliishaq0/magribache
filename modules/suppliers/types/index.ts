import { LucideIcon } from "lucide-react";
import { fournisseurStatsColors } from "../constants/colors";
import { suppliersSchema } from "../schemas/suppliers";
import { z } from "zod";
import { filterSchema } from "../schemas/filter-schema";
import {suppliersSchemaWithId} from "../schemas/suppliers";

export type SuppliersStats = {
    icon:LucideIcon
    description:string
    style:keyof typeof fournisseurStatsColors,
    accessKey:string
}

export type SuppliersSchema = z.infer<typeof suppliersSchema>

export type FilterType = z.infer<typeof filterSchema> & {take?:number,skip?:number}

export type SuppliersSchemaWithId = z.infer<typeof suppliersSchemaWithId>