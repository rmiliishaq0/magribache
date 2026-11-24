"use server"
import { z } from "zod";
import { prospectService } from "../services/prospect.service";
import { crmSchema } from "../schemas/prospect";

export async function createProspect(data:z.infer<typeof crmSchema>) {
  return prospectService.create(data);
}