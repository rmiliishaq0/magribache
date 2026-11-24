import axios from "axios";

export async function getSuppliers(params?: URLSearchParams){
  try{
    const response = await axios.get(`/api/suppliers-fetch?${params}`);
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