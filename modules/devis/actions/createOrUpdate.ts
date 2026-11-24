"use server"

import { devisService } from "../services/devis.services"
import { devisWithRefrence } from "../schemas/devis";
import z from "zod";

export async function createOrUpdateDevis(data: z.infer<typeof devisWithRefrence>) {
    return devisService.createOrUpdate(data)
}
    