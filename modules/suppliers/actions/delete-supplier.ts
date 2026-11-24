"use server"

import { suppliersService } from "../services/suppliers.service";

export async function deleteSupplier(reference: string) {
  return suppliersService.delete(reference);
}