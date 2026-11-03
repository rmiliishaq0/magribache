"use server"
import { suppliersService } from "../services/suppliers.service";
import { SuppliersSchema } from "../types";

export async function updateSupplier(data:SuppliersSchema) {
  return suppliersService.update( data);
}