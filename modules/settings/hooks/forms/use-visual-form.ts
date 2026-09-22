import { useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { visualSchema } from "../../schamas/settings";
import z from "zod";



type SettingsValues = z.infer<typeof visualSchema>;

export function useVisualForm(){
    const company = useAuthStore();

    return (useForm<SettingsValues>({
            resolver: zodResolver(visualSchema),
            defaultValues: {  logo: company.logo ?? undefined, signature: company.signature ?? undefined, watermark: company.watermark ?? undefined, titlesColor: company.titlesColor ?? "#D97706",tableFontColor:company.tableFontColor ??"#ffffff" ,tableBgColor:company.tableBgColor ?? "#D97706"},
        }))
    
}