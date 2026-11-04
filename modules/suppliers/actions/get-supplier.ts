"use server"

import { suppliersService } from "../services/suppliers.service";

export async function getSupplier(reference: string) {
  return await suppliersService.getByReference(reference);
}