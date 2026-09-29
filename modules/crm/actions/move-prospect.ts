"use server"
import { prospectService } from "../services/prospect.service";

export async function moveProspect(reference: string) {
  return prospectService.moveToClient(reference);
}