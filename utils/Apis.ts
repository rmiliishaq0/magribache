import {clientSchema, fournisseurSchema, loginSchema, taskSchemaWithID,contactsfournisseurSchema, contactsschema, contratsschema, prospectsschema, devisSchema} from "./schema";
import z from "zod";
import axios from "axios";
import {settingSchema} from "./schema"
import { taskSchema } from "./schema";

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

export async function updateSetting(data: z.infer<typeof settingSchema>) {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("website", data.website);
    formData.append("description", data.description);

    if (data.logo) {
      formData.append("logo", data.logo);
    }

    if (data.profileImage) {
      formData.append("profileImage", data.profileImage);
    }

    if (data.signature) {
      formData.append("signature", data.signature);
    }
    if(data.defaultColor){
        formData.append("defaultColor",data.defaultColor);
    }
    if(data.footerText){
      formData.append("footerText",data.footerText)
    }

    const response = await axios.post("/api/settings-update", formData);

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Une erreur s'est produite"
      );
    }

    throw new Error("Une erreur s'est produite");
  }
}

export async function addTask(data:z.infer<typeof taskSchema>){
  try{
    const response = await axios.post("/api/task-add",data);
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

export async function fetchTasks(params: URLSearchParams){
  try{
    const response = await axios.get(`/api/task-fetch?${params}`);
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

export async function deleteTasks(ids:number[]){
  try{
    const response = await axios.post("/api/task-delete",{ids});
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

export async function updateTask(data:z.infer<typeof taskSchemaWithID>){
  try{
    const response = await axios.post("/api/update-task",{data});
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

export async function createClient(data:z.infer<typeof clientSchema>){
    try{
    const response = await axios.post("/api/client-create",{data});
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

export async function createFournisseur(data:z.infer<typeof fournisseurSchema>){
    try{
    const response = await axios.post("/api/fournisseur-create",{data});
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

export async function createContact(data:z.infer<typeof contactsschema>){
    try{
    const response = await axios.post("/api/contact-create",{data});
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

export async function createContactsFournisseurs(data:z.infer<typeof contactsfournisseurSchema>){
    try{
    const response = await axios.post("/api/contacts-fournisseurs-create",{data});
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

export async function createProspects(data:z.infer<typeof prospectsschema>){
    try{
    const response = await axios.post("/api/prospect-create",{data});
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

export async function createContrats(data:z.infer<typeof contratsschema>){
    try{
    const response = await axios.post("/api/contrat-create",{data});
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

export async function updateClient(data:z.infer<typeof clientSchema>){
  try{
    const response = await axios.post("/api/update-client",{data});
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

export async function updateFournisseur(data:z.infer<typeof fournisseurSchema>){
  try{
    const response = await axios.post("/api/update-fournisseur",{data});
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

export async function updateContact(data:z.infer<typeof contactsschema>){
  try{
    const response = await axios.post("/api/update-contact",{data});
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

export async function updateContactsFournisseurs(data:z.infer<typeof contactsfournisseurSchema>){
  try{
    const response = await axios.post("/api/update-contacts-fournisseurs",{data});
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

export async function updateProspects(data:z.infer<typeof prospectsschema>){
  try{
    const response = await axios.post("/api/update-prospect",{data});
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

export async function updateContrats(data:z.infer<typeof contratsschema>){
  try{
    const response = await axios.post("/api/update-contrat",{data});
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


export async function deleteClient(ids:number[]){
  try{
    const response = await axios.post("/api/client-delete",{ids});
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

export async function deleteFournisseur(ids:number[]){
  try{
    const response = await axios.post("/api/fournisseur-delete",{ids});
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

export async function deleteContacts(ids:number[]){
  try{
    const response = await axios.post("/api/contact-delete",{ids});
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

export async function deleteContactsFournisseurs(ids:number[]){
  try{
    const response = await axios.post("/api/contacts-fournisseurs-delete",{ids});
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

export async function deleteProspects(ids:number[]){
  try{
    const response = await axios.post("/api/prospect-delete",{ids});
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

export async function deleteContrats(ids:number[]){
  try{
    const response = await axios.post("/api/contrat-delete",{ids});
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


export async function getClients(params?: URLSearchParams){
  try{
    const response = await axios.get(`/api/client-fetch?${params}`);
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

export async function getFournisseurs(params?: URLSearchParams){
  try{
    const response = params ?  await axios.get(`/api/fournisseur-fetch?${params}`) : await axios.get("/api/fournisseur-fetch");
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

export async function getContacts(params: URLSearchParams){
  try{
    const response = await axios.get(`/api/contact-fetch?${params}`);
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

export async function getContactsFournisseurs(params: URLSearchParams){
  try{
    const response = await axios.get(`/api/contacts-fournisseurs-fetch?${params}`);
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

export async function getProspects(params: URLSearchParams){
  try{
    const response = await axios.get(`/api/prospect-fetch?${params}`);
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

export async function getContrats(params: URLSearchParams){
  try{
    const response = await axios.get(`/api/contrat-fetch?${params}`);
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

export async function moveProspect(data:z.infer<typeof prospectsschema>) {
  try{
    const response = await axios.post("/api/move-client",{data});
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

export async function createDevis(data:z.infer<typeof devisSchema>){
    try{
    const response = await axios.post("/api/devis-create",{data});
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


export async function createFacture(data:z.infer<typeof devisSchema>){
    try{
    const response = await axios.post("/api/facture-create",{data});
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

export async function getDevis(params: URLSearchParams){
  try{
    const response = await axios.get(`/api/devis-fetch?${params}`);
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

export async function getFacture(params: URLSearchParams){
  try{
    const response = await axios.get(`/api/facture-fetch?${params}`);
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

export async function deleteDevis(ids:number[]){
  try{
    const response = await axios.post("/api/devis-delete",{ids});
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

export async function deleteFacture(ids:number[]){
  try{
    const response = await axios.post("/api/facture-delete",{ids});
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

export async function getDoc(params:URLSearchParams){
  try{
    const response = await axios.get(`/api/doc-fetch?${params}`);
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

export async function transferDevis(data:z.infer<typeof devisSchema>) {
  try{
    const response = await axios.post("/api/transfer-devis",{data});
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