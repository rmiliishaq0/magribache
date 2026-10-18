"use server"

import { devisService } from "../services/devis.services";

export async function getClientsWithDevis(){
    return devisService.getClientsWithDevis()
}