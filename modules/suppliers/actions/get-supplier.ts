"use server"
import { z } from "zod";
import { suppliersRepository } from "../repositories/suppliers.repositories";

export async function getSupplier(reference: string) {
  return await suppliersRepository.findByReference(reference);
}