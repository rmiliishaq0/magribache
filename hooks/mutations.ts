import {useMutation, useQueryClient} from "@tanstack/react-query";
import {clientSchema, fournisseurSchema, taskSchemaWithID,contactsfournisseurSchema, contactsschema, contratsschema, prospectsschema} from "@/utils/schema";
import {createClient, updateTask ,createFournisseur, createContact,createContactsFournisseurs,createContrats,createProspects,updateContrats,updateProspects,updateContactsFournisseurs,updateContact,updateFournisseur,updateClient,deleteContrats,deleteProspects,deleteContactsFournisseurs,deleteContacts,deleteFournisseur,deleteClient, moveProspect, deleteDevis, deleteFacture, transferDevis} from "@/utils/Apis";
import {toast} from "sonner";
import {z} from 'zod'


export function useTaskUpadte() { 
    const query =useQueryClient()
    return useMutation(
            {
                mutationFn:(data:z.infer<typeof taskSchemaWithID>)=>updateTask(data),
                onSuccess:()=>{
                    toast.success("La tâche a été modifié avec succès")
                    query.invalidateQueries({ queryKey: ['tasks'] })
                },
                onError:(error)=>{
                    toast.error(error.message)
                },
            }
        )

}

//create

export const useCreateClients = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof clientSchema>) => createClient(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['clients'] });
            toast.success("Client créé avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useCreateFournisseurs = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof fournisseurSchema>) => createFournisseur(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['fournisseurs'] });
            toast.success("Fournisseur créé avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useCreateContacts = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof contactsschema>) => createContact(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['contacts'] });              
            toast.success("Contact créé avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useCreateContactsFournisseurs = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof contactsfournisseurSchema>) => createContactsFournisseurs(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['contacts-fournisseurs'] });
            toast.success("Contact fournisseur créé avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useCreateProspects = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof prospectsschema>) => createProspects(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['prospects'] }); 
            toast.success("Prospect créé avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useCreateContrats = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof contratsschema>) => createContrats(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['contrats'] }); 
            toast.success("Contrat créé avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

// update

export const useUpdateClients = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof clientSchema>) => updateClient(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['clients'] });
            toast.success("Client mis à jour avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useUpdateFournisseurs = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof fournisseurSchema>) => updateFournisseur(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['fournisseurs'] });
            toast.success("Fournisseur mis à jour avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useUpdateContacts = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof contactsschema>) => updateContact(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['contacts'] });
            toast.success("Contact mis à jour avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useUpdateContactsFournisseurs = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof contactsfournisseurSchema>) => updateContactsFournisseurs(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['contacts-fournisseurs'] });
            toast.success("Contact fournisseur mis à jour avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useUpdateProspects = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof prospectsschema>) => updateProspects(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['prospects'] });
            toast.success("Prospect mis à jour avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useUpdateContrats = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof contratsschema>) => updateContrats(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['contrats'] });
            toast.success("Contrat mis à jour avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

// delete

export const useDeleteClients = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (ids:number[]) => deleteClient(ids),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['clients'] });
            toast.success("Client supprimé avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useDeleteFournisseurs = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (ids:number[]) => deleteFournisseur(ids),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['fournisseurs'] });
            toast.success("Fournisseur supprimé avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useDeleteContacts = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (ids:number[]) => deleteContacts(ids),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['contacts'] });
            toast.success("Contact supprimé avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useDeleteContactsFournisseurs = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (ids:number[]) => deleteContactsFournisseurs(ids),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['contacts-fournisseurs'] });
            toast.success("Contact fournisseur supprimé avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useDeleteProspects = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (ids:number[]) => deleteProspects(ids),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['prospects'] });
            toast.success("Prospect supprimé avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useDeleteContrats = () => {
        const query =useQueryClient()

    return useMutation({
        mutationFn: async (ids:number[]) => deleteContrats(ids),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['contrats'] });
            toast.success("Contrat supprimé avec succès");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useMoveProspect = ()=>{
    const query =useQueryClient()

    return useMutation({
        mutationFn: async (data:any) => moveProspect(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['prospects'] });
            toast.success("Le prospect a été déplacé");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useDeleteDevis = ()=>{
    const query =useQueryClient()

    return useMutation({
        mutationFn: async (ids:number[]) => deleteDevis(ids),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['devis'] });
            toast.success("Le Devis a été supprimé");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useDeleteFacture = ()=>{
    const query =useQueryClient()

    return useMutation({
        mutationFn: async (ids:number[]) => deleteFacture(ids),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['facture'] });
            toast.success("La facture a été supprimée");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useTransferDevis = ()=>{
    const query =useQueryClient()

    return useMutation({
        mutationFn: async (data:any) => transferDevis(data),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['facture'] });
            toast.success("Le devis a été transféré à la facture");
        },
        onError: (error) => {
            toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
        }
    })
}