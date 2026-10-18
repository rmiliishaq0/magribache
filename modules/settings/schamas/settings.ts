import z from "zod";

export const settingSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    email:z.email(),
    address: z.string().min(1, "L'adresse est requise"),
    phone: z.string().min(1, "Le téléphone est requis"),
    website: z.string().url("L'URL du site web est invalide"),
    description: z.string().min(1, "La description est requise"),
    logo:z.union([z.instanceof(File).optional(),z.string().optional()]) ,
    profileImage:  z.union([z.instanceof(File).optional(),z.string().optional()]) ,
    signature: z.union([z.instanceof(File).optional(),z.string().optional()]),
    titlesColor: z.string().optional(),
    footerText:z.string().optional(),
    watermark: z.union([z.instanceof(File).optional(), z.string().optional()]),
    currency:z.enum(["MAD","USD","EUR"]).default("MAD").optional(),
    tva:z.number().default(20).optional(),
    tableBgColor:z.string().optional(),
    tableFontColor:z.string().optional()
});

export const legalSettingsSchema = z.object({
    ice: z.string().trim().max(30).optional(),
    rc: z.string().trim().max(30).optional(),
    fiscalId: z.string().trim().max(30).optional(),
    patente: z.string().trim().max(30).optional(),
    cnss: z.string().trim().max(30).optional(),
    shareCapital: z.string().trim().max(30).optional(),
});

export const documentSettingsSchema = z.object({
    documentSettings: z.string().max(50_000),
});

export const visualSchema = z.object({
    logo:z.union([z.instanceof(File).optional(),z.string().optional()]) ,
    signature: z.union([z.instanceof(File).optional(),z.string().optional()]),
    titlesColor: z.string().optional(),
    watermark: z.union([z.instanceof(File).optional(), z.string().optional()]),
    tableBgColor:z.string().optional(),
    tableFontColor:z.string().optional()
});
