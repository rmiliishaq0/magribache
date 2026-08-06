import { PartnerType } from "@/app/generated/prisma/browser";
import { CompanyType, PartnerPriority, PartnerSource, PartnerStatus } from "@/app/generated/prisma/enums";
import { z } from "zod";

export const crmSchema = z.object({
    companyName:z.string().optional(),
    fullName:z.string().min(1),
    email: z
  .string()
  .trim()
  .optional()
  .refine(v => !v || z.email().safeParse(v).success, {
    message: "Invalid email",
  }),
    phone:z.string().optional(),
    whatsapp:z.string().optional(),
    website:z.string().optional(),
    address:z.string().optional(),
    city:z.string().optional(),
    region:z.string().optional(),
    country:z.string().optional(),
    
    ice:z.string().optional(),
    rc:z.string().optional(),
    ifNumber:z.string().optional(),

    activity:z.string().optional(),

    companyType:z.enum(CompanyType).optional(),

    source:z.enum(PartnerSource),

    status:z.enum(PartnerStatus),

    priority:z.enum(PartnerPriority),

    notes:z.string().optional(),

    nextFollowUpAt:z.union([z.date(), z.string()]).optional(),
})

export const crmSchemaWithRef = crmSchema.extend({reference:z.string()})