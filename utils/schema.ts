import { string, z } from "zod";

export const loginSchema = z.object({
    email: z.email("Email invalide"),
    password: z.string().min(6, "Mot de passe trop court"),
});

export const settingSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    address: z.string().min(1, "L'adresse est requise"),
    phone: z.string().min(1, "Le téléphone est requis"),
    website: z.string().url("L'URL du site web est invalide"),
    description: z.string().min(1, "La description est requise"),
});

export const taskSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["Haute", "Moyenne", "Basse"]),
  project: z.string().optional(),
  status: z.enum(["En cours", "Terminé"]),
})
export const taskSchemaWithID = taskSchema.extend({
    id: z.union([z.uuid(),z.number()]),
})

export const clientSchema = z.object({
    Entreprise:z.string(),
    Téléphone:z.string().optional(),
    Email:z.email("Email invalide").optional(),
    Catégories:z.string().optional(),
    ICE:z.string().optional(),
    "Identifiant fiscal (IF)": z.string().optional(),
    Ville: z.string().optional(),
    Pays: z.string().optional(),
    Actif: z.enum(["Oui", "Non"])
})

export const contactsfournisseurSchema = z.object({
    Name:z.string(),
    Title:z.string().optional(),
    Email:z.email("Email invalide").optional(),
    "Téléphone":z.string().optional(),
    Fournisseur:z.string().optional(),
    City:z.string().optional(),
    Country:z.string().optional(),
})

export const fournisseurSchema = z.object({
    Fournisseur:z.string(),
    Email:z.email("Email invalide").optional(),
    Téléphone:z.string().optional(),
    ICE:z.string().optional(),
    "Identifiant fiscal (IF)": z.string().optional(),
    Ville: z.string().optional(),
    Pays: z.string().optional(),
    Catégories: z.string().optional(),
})

export const prospectsschema = z.object({
    Nom:z.string(),
    Prospect:z.string().optional(),
    Email:z.email("Email invalide").optional(),
    Téléphone:z.string().optional(),
    //"Attribué à":z.string().optional(),
    Statut:z.string().optional(),
    Source:z.string().optional(),
    "Date d'ajout":z.string().optional(),
    "Dernier contact":z.string().optional(),
    Localisation:z.string().optional(),
})

export const contratsschema = z.object({
    "Sujet":z.string().optional(),
    "Client":z.string().optional(),
    "Modèle de contrat":z.string().optional(),
    "Date de depart":z.string().optional(),
    "Date de fin":z.string().optional(),    
})

export const contactsschema = z.object({
    Nom:z.string(),
    Civilité:z.string().optional(),
    Email:z.email("Email invalide").optional(),
    Téléphone:z.string().optional(),
    //Entreprise:z.string().optional(),
    Ville:z.string().optional(),
    Pays:z.string().optional(),
    Actif:z.enum(["Oui", "Non"])
})

export const salesSchema = z.object({
    id:z.string(),
    numero:string(),
    type:z.enum(["DEVIS","FACTURE"]),
    status:z.enum([ "BROUILLON", "ENVOYE", "PAYE" ,"ANNULE"]),
    reference:z.string(),
    objet:z.string(),
    clientId:z.string(),
    dateDocument:z.string(),
    dateValidite:z.string(),
    devise:z.string().default("MAD"),
    notes:string().optional(),
    conditions:z.string().optional(),
    remise:z.float64().optional(),
    ajustement:z.float64().optional(),
    montantHT:z.float64().optional(),
    montantTVA:z.float64().optional(),
    montantTTC:z.float64().optional(),
})

export const devisSchema = z.object({
    client:z.string().min(1,"Client requis"),
    notes:z.string().optional(),
    devisDate:z.string().optional(),
    dateValidite:z.string().optional(),
    reference:z.string().optional(),
    devise:z.enum(["MAD","USD","EUR"]),
    statut:z.enum(["BROUILLON","ENVOYE","PAYE","ANNULE"]),
    items:z.array(
       z.object({
          article:z.string().min(1,"Article requis"),
          quantity:z.number().min(1),
          unitPrice:z.number().min(0),
          tax:z.number().min(0),
       })
    ).min(1)
 })


