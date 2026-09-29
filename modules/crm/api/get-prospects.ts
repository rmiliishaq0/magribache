import axios from "axios";

export async function getProspects(params?: URLSearchParams){
  try{
    const response = await axios.get(`/api/prospects-fetch?${params}`);
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