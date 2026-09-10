import { requireAuth } from "@/lib/auth";
import { FilterType } from "../types";
import { devisRepository } from "../repositories/devis.repositories";

export const devisService = {
    async get(filters:FilterType){
        try{

        const auth = await requireAuth()

         if (auth.error) {
            return {
          success: false,
          message: "Unauthorized",
        };
        }
        const total = (await devisRepository.getAllByFilter(filters)).length
        const devis = await devisRepository.findByFilters(filters)
        const sentThisM = (await devisRepository.getSentThisMonth()).length
        const accepted = (await devisRepository.getAccepted()).length
        const expired = (await devisRepository.getExpired()).length

         return {
          success: true,
          devis,
          sentThisM,
          accepted,
          expired,
          total
        };
    }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    },
    async getClientsWithDevis(){
        try{
            const auth = await requireAuth()

            if (auth.error) {
                return {
            success: false,
            message: "Unauthorized",
            };
            }
            const clients = await devisRepository.getAllClientWithDevis()
            return {
                success: true,
                clients
            }
        }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    },
    async getAllPartners(){
        try{
            const auth = await requireAuth()

            if (auth.error) {
                return {
            success: false,
            message: "Unauthorized",
            };
            }
            const clients = await devisRepository.getAllPartners()
            return {
                success: true,
                clients
            }
        }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    }
}