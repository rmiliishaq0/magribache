import { loginSchema } from "./schema";
import z from "zod";
import axios from "axios";
import {settingSchema} from "./schema"

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

export async function updateSetting(data:z.infer<typeof settingSchema>){
    try{
    const response = await axios.post("/api/settings-update",data);
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
