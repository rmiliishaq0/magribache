"use server"

import { z } from "zod";
import { clientService } from "../services/client.service";
import { crmSchema } from "@/modules/crm/schemas/prospect";

export default async function createClient(data:z.infer<typeof crmSchema>){
    return await clientService.create(data)
}