import { DocumentStatus } from "@/app/generated/prisma/browser";
import { crmSchema, crmSchemaWithRef } from "@/modules/crm/schemas/prospect";
import { z } from "zod";

export const devisSchema = z.object({
    client:z.string().min(1,"Client requis"),
    notes:z.string().optional(),
    documentDate:z.date().optional(),
    validUntil:z.date().optional(),
    currency:z.enum(["MAD","USD","EUR"]),
    status:z.enum(DocumentStatus),
    items:z.array(
       z.object({
          product:z.string().min(1,"Article requis"),
          quantity:z.number().min(1).optional(),
          unitPrice:z.number().min(0).optional(),
          tax:z.number().min(0),
       })
    ).min(1),
    conditions:z.string().optional(),
    discount:z.number().min(0).optional(),
    adjustment:z.number().min(0).optional(),
    subtotal:z.number().min(0).optional(),
    taxAmount:z.number().min(0).optional(),
    totalAmount:z.number().min(0).optional(), 
 })

 export const devisSchemaWithId = devisSchema.extend({
    id:z.number(),
   reference:z.string().min(1,"Référence requise"),
   client:crmSchemaWithRef
 })

export const devisWithRefrence = devisSchema.extend({
    reference:z.string().min(1,"Référence requise")
})