import { useForm } from "react-hook-form";
import z from "zod";
import { legalSettingsSchema } from "../../schamas/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/auth-store";

type LegalSettingsValues = z.infer<typeof legalSettingsSchema>;

export function useLegalForm(){
    const company = useAuthStore();

    return useForm<LegalSettingsValues>({
        resolver: zodResolver(legalSettingsSchema),
        defaultValues: { ice: company.ice ?? "", rc: company.rc ?? "", fiscalId: company.fiscalId ?? "", patente: company.patente ?? "", cnss: company.cnss ?? "", shareCapital: company.shareCapital ?? "" },
      });
}