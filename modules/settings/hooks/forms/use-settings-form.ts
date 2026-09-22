import { useForm } from "react-hook-form";
import { settingSchema } from "../../schamas/settings";
import z from "zod";
import { useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod"


type SettingsValues = z.infer<typeof settingSchema>;

export function useFormSettings(){
    const company = useAuthStore();

    return useForm<SettingsValues>({
        mode:"onBlur", 
        resolver: zodResolver(settingSchema),
        defaultValues: {email:company.email || undefined, currency:"MAD",tva:company.tva|| 20.,name: company.name ?? "", address: company.address ?? "", phone: company.phone ?? "",website: company.website ?? "", description: company.description ?? "Informations générales de l'entreprise", logo: company.logo ?? undefined, profileImage: company.profilIcon ?? undefined, signature: company.signature ?? undefined, titlesColor: company.titlesColor ?? "#2563EB", footerText: company.footerText ?? "" },
    });
}