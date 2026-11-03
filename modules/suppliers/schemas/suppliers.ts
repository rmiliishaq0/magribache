import { SupplierStatus } from "@/app/generated/prisma/enums";
import { productsSchema } from "@/modules/products/schemas/productsSchema";
import z from "zod";

export const suppliersSchema = z.object({

  reference:z.string(),
  name:z.string(),

  status:z.nativeEnum(SupplierStatus).default(SupplierStatus.ACTIVE).optional(),

  contactName:z.string().optional(),
  phone:z.string().optional(),
  whatsapp:z.string().optional(),
  email:z.string().optional(),

  country:z.string().optional(),
  city:z.string().optional(),
  address:z.string().optional(),

  ice:z.string().optional(),
  rc:z.string().optional(),
  ifNumber:z.string().optional(),

  paymentTerms:z.string().optional(),
  currency:z.string().default("MAD").optional(),
  deliveryDelayDays:z.number().optional(),

  notes:z.string().optional(),
  createdAt:z.date().optional(),

  products:z.array(z.string()).optional(),

})

export const suppliersSchemaWithId = suppliersSchema.extend({id:z.number()})