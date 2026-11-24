"use server"

import { suppliersService } from "../services/suppliers.service";
import { SuppliersSchema } from "../types";

export async function createSupplier(data:SuppliersSchema) {
  return suppliersService.create(data);
}