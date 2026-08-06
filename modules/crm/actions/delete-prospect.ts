"use server"
import { z } from "zod";
import { prospectService } from "../services/prospect.service";
import { crmSchema } from "../schemas/prospect";

export async function deleteProspect(reference: string) {
  return prospectService.delete(reference);
}