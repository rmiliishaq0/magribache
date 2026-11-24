import {clientSchema, fournisseurSchema, loginSchema, taskSchemaWithID,contactsfournisseurSchema, contactsschema, contratsschema, prospectsschema, devisSchema} from "./schema";
import z from "zod";
import axios from "axios";
import { taskSchema } from "./schema";
import { getClients } from "@/modules/clients/api/get-clients";
import { createOrUpdateDevis } from "@/modules/devis/actions/createOrUpdate";

export async function addTask(data:z.infer<typeof taskSchema>) {
  const response = await axios.post("/api/task-add", data);
  return response.data;
}

export async function fetchTasks(params: URLSearchParams) {
  const response = await axios.get(`/api/task-fetch?${params}`);
  return response.data;
}

export async function deleteTasks(ids:number[] | string[]) {
  const response = await axios.post("/api/task-delete", ids);
  return response.data;
}

export async function createDevis(data: unknown) {
  return createOrUpdateDevis(data as never);
}

export async function createFacture(data: unknown) {
  return createOrUpdateDevis(data as never);
}

export async function getDoc(params: URLSearchParams) {
  const response = await axios.get(`/api/devis-fetch?${params}`);
  return { docs: response.data?.devis?.[0] ?? null };
}

export { getClients };


export async function login({email,password}:z.infer<typeof loginSchema>){
    try{
        const response = await axios.post("/api/login", {
            email,
            password,
        });
        return response.data;
    }catch(error:any){
        if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Une erreur s'est produite"
      );
    }

    throw new Error("Une erreur s'est produite");
    }
} 

export async function logout(){
  try {
    const response = await axios.post("/api/logout");
    return response.data;
  } catch (error:any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Une erreur s'est produite"
      );
    }
    throw new Error("Une erreur s'est produite");
  }
}

export async function me(){
  try{
    const response = await axios.get("/api/me");
    return response.data;
  }catch(error:any){
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Une erreur s'est produite"
      );
    }
    throw new Error("Une erreur s'est produite");
  }
}


