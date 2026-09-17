"use server"

import { devisService } from "../services/devis.services"

export async function generateReference() {
    return  devisService.generateReference()
}