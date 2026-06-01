import { z } from "zod";

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
    Code:z.uuid(),
    Entreprise:z.string().optional(),
    Téléphone:z.string().optional(),
    Email:z.email("Email invalide").optional(),
    Catégories:z.string().optional(),
    ICE:z.string().optional(),
    "Identifiant fiscal (IF)": z.string().optional(),
    Ville: z.string().optional(),
    Pays: z.string().optional(),
    Actif: z.boolean()
})

export const contactsfournisseurSchema = z.object({
    Name:z.string(),
    Title:z.string().optional(),
    Email:z.email("Email invalide").optional(),
    "Phone Number":z.string().optional(),
    Supplier:z.string().optional(),
    City:z.string().optional(),
    Country:z.string().optional(),
})

export const fournisseurSchema = z.object({
    Code:z.uuid(),
    Fournisseur:z.string().optional(),
    Email:z.email("Email invalide").optional(),
    "Numéro de téléphone":z.string().optional(),
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
    "Attribué à":z.string().optional(),
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
    "E-mail":z.email("Email invalide").optional(),
    Téléphone:z.string().optional(),
    Entreprise:z.string().optional(),
    Ville:z.string().optional(),
    Pays:z.string().optional(),
    Actif:z.enum(["Oui", "Non"])
})