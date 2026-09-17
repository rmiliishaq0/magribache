"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Hash, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Card } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth-store";
import { updateLegalSettings } from "@/utils/Apis";
import { legalSettingsSchema } from "@/utils/schema";

type LegalSettingsValues = z.infer<typeof legalSettingsSchema>;

const fields = [
  { name: "ice", label: "I.C.E (Identifiant commun)" },
  { name: "rc", label: "R.C (Registre de commerce)" },
  { name: "fiscalId", label: "I.F (Identifiant fiscal)" },
  { name: "patente", label: "T.P / Patente" },
  { name: "cnss", label: "N° CNSS" },
  { name: "shareCapital", label: "Capital social" },
] as const;

export default function LegalInformationForm() {
  const company = useAuthStore();
  const form = useForm<LegalSettingsValues>({
    resolver: zodResolver(legalSettingsSchema),
    defaultValues: { ice: company.ice ?? "", rc: company.rc ?? "", fiscalId: company.fiscalId ?? "", patente: company.patente ?? "", cnss: company.cnss ?? "", shareCapital: company.shareCapital ?? "" },
  });

  useEffect(() => {
    form.reset({ ice: company.ice ?? "", rc: company.rc ?? "", fiscalId: company.fiscalId ?? "", patente: company.patente ?? "", cnss: company.cnss ?? "", shareCapital: company.shareCapital ?? "" });
  }, [company, form]);

  async function save(values: LegalSettingsValues) {
    try {
      await updateLegalSettings(values);
      toast.success("Informations légales enregistrées");
      form.reset(values);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Une erreur s'est produite");
    }
  }

  return (
    <Card className=" px-8 py-8 ">
      <div className="flex items-start gap-3 border-b border-slate-100 pb-5">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><ShieldCheck className="size-5" /></span>
        <div><h1 className="text-lg font-bold text-slate-900">Identifiants Fiscaux & Légaux</h1><p className="mt-0.5 text-xs text-slate-500">Ces numéros légaux sont automatiquement intégrés dans les mentions de bas de page de vos PDF.</p></div>
      </div>
      <form onSubmit={form.handleSubmit(save)} className="mt-6">
        <div className="grid gap-x-6 gap-y-5 md:grid-cols-3">
          {fields.map(({ name, label }) => <Controller key={name} name={name} control={form.control} render={({ field, fieldState }) => <Field><FieldLabel htmlFor={name} className="text-xs font-bold uppercase tracking-wide text-slate-700">{label}</FieldLabel><div className="relative mt-2"><Hash className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><Input {...field} id={name} className="h-11 rounded-xl border-slate-200 pl-9 text-sm text-slate-800 shadow-none" /></div>{fieldState.error && <FieldError errors={[fieldState.error]} />}</Field>} />)}
        </div>
        {form.formState.isDirty && <button type="submit" className="ml-auto mt-6 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">Enregistrer</button>}
      </form>
    </Card>
  );
}
