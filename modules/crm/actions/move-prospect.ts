"use server"
import { z } from "zod";
import { prospectService } from "../services/prospect.service";
import { crmSchema } from "../schemas/prospect";

export async function moveProspect(reference: string) {
  return prospectService.moveToClient(reference);
}