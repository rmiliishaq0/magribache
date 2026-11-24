"use server"
import { z } from "zod";
import { productsSchema } from "../schemas/productsSchema";
import { productService } from "../services/product.service";

export async function createProduct(data:z.infer<typeof productsSchema>){
  return productService.create(data);
}