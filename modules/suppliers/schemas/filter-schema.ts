import {  SupplierStatus } from "@/app/generated/prisma/enums";
import { z } from "zod";

export const filterSchema = z.object({
    statut: z.nativeEnum(SupplierStatus).optional(),
    country:z.string().optional(),
    city:z.string().optional(),
    date: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
  })