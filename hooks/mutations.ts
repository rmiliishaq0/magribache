import {useMutation, useQueryClient} from "@tanstack/react-query";
import {clientSchema, fournisseurSchema, taskSchemaWithID,contactsfournisseurSchema, contactsschema, contratsschema, prospectsschema} from "@/utils/schema";
import {createClient, updateTask ,createFournisseur, createContact,createContactsFournisseurs,createContrats,createProspects,updateContrats,updateProspects,updateContactsFournisseurs,updateContact,updateFournisseur,updateClient,deleteContrats,deleteProspects,deleteContactsFournisseurs,deleteContacts,deleteFournisseur,deleteClient} from "@/utils/Apis";
import {toast} from "sonner";
import {z} from 'zod'


export function useTaskUpadte() {
    const queryClient = useQueryClient();
    return useMutation(
            {
                mutationFn:(data:z.infer<typeof taskSchemaWithID>)=>updateTask(data),
                onSuccess:()=>{
                    toast.success("La tâche a été modifié avec succès")
                    queryClient.invalidateQueries({ queryKey: ['tasks'] })
                },
                onError:(error)=>{
                    toast.error(error.message)
                },
            }
        )

}

//create

export const useCreateClients = () => {
    return useMutation({
        mutationFn: async (data: z.infer<typeof clientSchema>) => createClient(data),
        onSuccess: () => {
            toast.success("Client créé avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la création du client" );
        }
    })
}

export const useCreateFournisseurs = () => {
    return useMutation({
        mutationFn: async (data: z.infer<typeof fournisseurSchema>) => createFournisseur(data),
        onSuccess: () => {
            toast.success("Fournisseur créé avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la création du fournisseur" );
        }
    })
}

export const useCreateContacts = () => {
    return useMutation({
        mutationFn: async (data: z.infer<typeof contactsschema>) => createContact(data),
        onSuccess: () => {
            toast.success("Contact créé avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la création du contact");
        }
    })
}

export const useCreateContactsFournisseurs = () => {
    return useMutation({
        mutationFn: async (data: z.infer<typeof contactsfournisseurSchema>) => createContactsFournisseurs(data),
        onSuccess: () => {
            toast.success("Contact fournisseur créé avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la création du contact fournisseur");
        }
    })
}

export const useCreateProspects = () => {
    return useMutation({
        mutationFn: async (data: z.infer<typeof prospectsschema>) => createProspects(data),
        onSuccess: () => {
            toast.success("Prospect créé avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la création du prospect");
        }
    })
}

export const useCreateContrats = () => {
    return useMutation({
        mutationFn: async (data: z.infer<typeof contratsschema>) => createContrats(data),
        onSuccess: () => {
            toast.success("Contrat créé avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la création du contrat");
        }
    })
}

// update

export const useUpdateClients = () => {
    return useMutation({
        mutationFn: async (data: z.infer<typeof clientSchema>) => updateClient(data),
        onSuccess: () => {
            toast.success("Client mis à jour avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la mise à jour du client" );
        }
    })
}

export const useUpdateFournisseurs = () => {
    return useMutation({
        mutationFn: async (data: z.infer<typeof fournisseurSchema>) => updateFournisseur(data),
        onSuccess: () => {
            toast.success("Fournisseur mis à jour avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la mise à jour du fournisseur" );
        }
    })
}

export const useUpdateContacts = () => {
    return useMutation({
        mutationFn: async (data: z.infer<typeof contactsschema>) => updateContact(data),
        onSuccess: () => {
            toast.success("Contact mis à jour avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la mise à jour du contact");
        }
    })
}

export const useUpdateContactsFournisseurs = () => {
    return useMutation({
        mutationFn: async (data: z.infer<typeof contactsfournisseurSchema>) => updateContactsFournisseurs(data),
        onSuccess: () => {
            toast.success("Contact fournisseur mis à jour avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la mise à jour du contact fournisseur");
        }
    })
}

export const useUpdateProspects = () => {
    return useMutation({
        mutationFn: async (data: z.infer<typeof prospectsschema>) => updateProspects(data),
        onSuccess: () => {
            toast.success("Prospect mis à jour avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la mise à jour du prospect");
        }
    })
}

export const useUpdateContrats = () => {
    return useMutation({
        mutationFn: async (data: z.infer<typeof contratsschema>) => updateContrats(data),
        onSuccess: () => {
            toast.success("Contrat mis à jour avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la mise à jour du contrat");
        }
    })
}

// delete

export const useDeleteClients = () => {
    return useMutation({
        mutationFn: async (ids:number[]) => deleteClient(ids),
        onSuccess: () => {
            toast.success("Client supprimé avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la suppression du client" );
        }
    })
}

export const useDeleteFournisseurs = () => {
    return useMutation({
        mutationFn: async (ids:number[]) => deleteFournisseur(ids),
        onSuccess: () => {
            toast.success("Fournisseur supprimé avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la suppression du fournisseur" );
        }
    })
}

export const useDeleteContacts = () => {
    return useMutation({
        mutationFn: async (ids:number[]) => deleteContacts(ids),
        onSuccess: () => {
            toast.success("Contact supprimé avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la suppression du contact");
        }
    })
}

export const useDeleteContactsFournisseurs = () => {
    return useMutation({
        mutationFn: async (ids:number[]) => deleteContactsFournisseurs(ids),
        onSuccess: () => {
            toast.success("Contact fournisseur supprimé avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la suppression du contact fournisseur");
        }
    })
}

export const useDeleteProspects = () => {
    return useMutation({
        mutationFn: async (ids:number[]) => deleteProspects(ids),
        onSuccess: () => {
            toast.success("Prospect supprimé avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la suppression du prospect");
        }
    })
}

export const useDeleteContrats = () => {
    return useMutation({
        mutationFn: async (ids:number[]) => deleteContrats(ids),
        onSuccess: () => {
            toast.success("Contrat supprimé avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la suppression du contrat");
        }
    })
}