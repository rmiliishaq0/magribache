"use server"
import { z } from "zod";
import { prospectService } from "../services/prospect.service";
import { crmSchemaWithRef } from "../schemas/prospect";

export async function updateProspect(data: z.infer<typeof crmSchemaWithRef>) {
  return prospectService.update( data);
}