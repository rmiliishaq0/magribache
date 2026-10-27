"use server"
import { z } from "zod";
import { productService } from "../services/product.service";

export async function deleteProduct(reference: string) {
  return productService.delete(reference);
}