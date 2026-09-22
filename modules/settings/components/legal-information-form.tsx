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
import { legalSettingsSchema } from "../schamas/settings";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useUpdate } from "../hooks/mutations/use-update-info";
import { useLegalForm } from "../hooks/forms/use-legal-form";

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
  const form = useLegalForm()
  const {mutate,isPending} = useUpdate()
  useEffect(() => {
    form.reset({ ice: company.ice ?? "", rc: company.rc ?? "", fiscalId: company.fiscalId ?? "", patente: company.patente ?? "", cnss: company.cnss ?? "", shareCapital: company.shareCapital ?? "" });
  }, [company, form]);

  async function save(values: LegalSettingsValues) {
    if(company.email){
      mutate({...values,email:company.email})
    }
  }
  return (
    <Card className="px-6 py-6">
      <div className="flex justify-between items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-start  gap-3">
        <span className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><ShieldCheck className="size-4" /></span>
        <div><h1 className="text-sm font-bold text-slate-900">Identifiants Fiscaux & Légaux</h1><p className="mt-0.5 text-[10px] text-slate-500">Ces numéros légaux sont automatiquement intégrés dans les mentions de bas de page de vos PDF.</p></div>
      </div>
      <Button form={"form"} disabled={!form.formState.isValid || isPending || form.formState.isSubmitting || !form.formState.isDirty}  type="submit">
                {isPending || form.formState.isSubmitting ? <Spinner />: "Enregistrer"}
          </Button> 
      </div>
      <form id="form" onSubmit={form.handleSubmit(save)} className="mt-6">
        <div className="grid gap-x-6 gap-y-5 md:grid-cols-3">
          {fields.map(({ name, label }) => <Controller key={name} name={name} control={form.control} render={({ field, fieldState }) => <Field><FieldLabel htmlFor={name} className="text-xs font-bold uppercase tracking-wide text-slate-700">{label}</FieldLabel><div className="relative mt-2"><Hash className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><Input {...field} id={name} className="h-10  border-slate-200 pl-9 text-sm text-slate-800 shadow-none" /></div>{fieldState.error && <FieldError errors={[fieldState.error]} />}</Field>} />)}
        </div>
      </form>
    </Card>
  );
}
