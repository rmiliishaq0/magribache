"use server"

import { devisService } from "../services/devis.services";

export async function getAllPartners(){
    return devisService.getAllPartners()
}