"use server"
import { z } from "zod";
import { prospectService } from "../services/prospect.service";

export async function getProspect(reference: string) {
  return await prospectService.getByReference(reference);
}