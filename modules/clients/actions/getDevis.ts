"use server"

import { devisService } from "@/modules/devis/services/devis.services";

export default async function getDevis(refernce:string){
    return await devisService.getByReference(refernce)
}