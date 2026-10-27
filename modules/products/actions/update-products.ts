"use server"
import { z } from "zod";
import { productService } from "../services/product.service";
import { productsSchemaWithId } from "../types";

export async function updateProducts(data:productsSchemaWithId) {
  return productService.update( data);
}