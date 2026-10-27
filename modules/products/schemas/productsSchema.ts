import { ProductStatus, ProductType, StockUnit } from "@/app/generated/prisma/browser";
import z from "zod";
import { Fournisseur } from "../types";

const supplier: z.ZodType<Fournisseur> = z.object({
  name: z.string(),
  reference: z.string(),
  city:z.string()
});

export const productsSchema = z.object({

  "reference": z.string(),
  "name": z.string().max(255),

  "type": z.nativeEnum(ProductType),
  "status": z.nativeEnum(ProductStatus),

  "unit": z.nativeEnum(StockUnit),

  "fournisseurs" :  z.array(supplier).optional(),

  "capacityM3": z.number().optional(),
  "dimensions": z.string().optional(),
  "material": z.string().optional(),
  "color": z.string().optional(),
  "grammage": z.string().optional(),

  "taxRate": z.number().optional(),
  "salePriceHT": z.number().optional(),
  "purchasePriceHT": z.number().optional(),

  "currentStock": z.number().optional(),
  "minimumStock": z.number().optional(),
  "maximumStock": z.number().optional(),

  "trackLot": z.boolean().optional(),
  "trackSerialNumber": z.boolean().optional()

})