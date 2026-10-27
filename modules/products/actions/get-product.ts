"use server"
import { productService } from "../services/product.service";

export async function getProduct(reference: string) {
  return await productService.getByReference(reference);
}