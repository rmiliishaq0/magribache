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
