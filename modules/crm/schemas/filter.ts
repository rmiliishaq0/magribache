import { PartnerPriority, PartnerSource, PartnerStatus } from "@/app/generated/prisma/enums";
import { z } from "zod"

export const filterSchema = z.object({
    source:z.enum(PartnerSource).optional(),
    statut:z.enum(PartnerStatus).optional(),
    priority:z.enum(PartnerPriority).optional(),
    city:z.string().optional(),
    region:z.string().optional(),
    date: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
})