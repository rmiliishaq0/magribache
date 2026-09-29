import { CompanyType, PartnerPriority, PartnerSource, PartnerStatus } from "@/app/generated/prisma/enums";
import { z } from "zod"

export const filterSchema = z.object({
    statut:z.enum(PartnerStatus).optional(),
    companyType:z.enum(CompanyType).optional(),
    city:z.string().optional(),
    region:z.string().optional(),
    date: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
})