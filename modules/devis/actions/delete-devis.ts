"use server"

import { devisService } from "../services/devis.services"

export async function deleteDevis(refrence:string){
    return devisService.delete(refrence)
}