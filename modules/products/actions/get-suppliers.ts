"use server"

import { productService } from "../services/product.service";


export async function getSuppliersWithProducts(){
    return productService.getSuppliersWithProducts()
}