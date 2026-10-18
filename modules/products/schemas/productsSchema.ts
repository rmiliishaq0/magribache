import { ProductStatus, ProductType, StockUnit } from "@/app/generated/prisma/browser";
import z from "zod";

export const productsSchema = z.object({

  "reference": z.string(),
  "name": z.string().max(255),

  "type": z.nativeEnum(ProductType),
  "status": z.nativeEnum(ProductStatus).default("ACTIVE"),

  "unit": z.nativeEnum(StockUnit),

  "capacityM3": z.number().nullable(),
  "dimensions": z.string().nullable(),
  "material": z.string().nullable(),
  "color": z.string().nullable(),
  "grammage": z.string().nullable(),

  "taxRate": z.number().default(20),
  "salePriceHT": z.number().nullable(),
  "purchasePriceHT": z.number().nullable(),

  "currentStock": z.number().default(0),
  "minimumStock": z.number().nullable(),
  "maximumStock": z.number().nullable(),

  "trackLot": z.boolean().default(false),
  "trackSerialNumber": z.boolean().default(false)

})