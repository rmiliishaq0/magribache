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