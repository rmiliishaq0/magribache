import { DocumentStatus } from "@/app/generated/prisma/browser";
import { crmSchema } from "@/modules/crm/schemas/prospect";
import { z } from "zod";

export const devisSchema = z.object({
    client:z.string().min(1,"Client requis"),
    notes:z.string().optional(),
    devisDate:z.string().optional(),
    dateValidite:z.string().optional(),
    devise:z.enum(["MAD","USD","EUR"]),
    statut:z.enum(DocumentStatus),
    items:z.array(
       z.object({
          article:z.string().min(1,"Article requis"),
          quantity:z.number().min(1).optional(),
          unitPrice:z.number().min(0).optional(),
          tax:z.number().min(0),
       })
    ).min(1),
    objet:z.string().optional(),
    conditions:z.string().optional(),
    remise:z.number().min(0).optional(),
    ajustement:z.number().min(0).optional(),
    montantHT:z.number().min(0).optional(),
    montantTVA:z.number().min(0).optional(),
    montantTTC:z.number().min(0).optional(), 
 })

 export const devisSchemaWithId = devisSchema.extend({
    id:z.number()
 })

export const devisWithRefrence = devisSchema.extend({
    reference:z.string().min(1,"Référence requise")
})