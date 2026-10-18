"use client";

import { Building2, Globe2, Mail, MapPin, Phone } from "lucide-react";
import { useEffect } from "react";
import { Controller  } from "react-hook-form";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/stores/auth-store";
import { Select,SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CURRENCY } from "../constants/currency";
import { settingSchema } from "../schamas/settings";
import { useFormSettings } from "../hooks/forms/use-settings-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useUpdate } from "../hooks/mutations/use-update-info";

type SettingsValues = z.infer<typeof settingSchema>;

function FieldIcon({ children }: { children: React.ReactNode }) {
  return <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{children}</span>;
}

export default function CompanyProfileForm() {
  const company = useAuthStore();
  const form = useFormSettings()
  const {mutate,isPending} = useUpdate()

  useEffect(() => {
    form.reset({email:company.email || undefined ,currency:company.currency || "MAD" ,tva:company.tva || 20.,name: company.name ?? "", address: company.address ?? "", phone: company.phone ?? "", website: company.website ?? "", description: company.description ?? "Informations générales de l'entreprise", logo: company.logo ?? undefined, profileImage: company.profilIcon ?? undefined, signature: company.signature ?? undefined, footerText: company.footerText ?? "" });
  }, [company, form]);

  const onSubmit = (data:SettingsValues)=>{
      mutate({...data,logo:String(data.logo),signature:String(data.signature),watermark:String(data.watermark)})
    }
  return (
    <Card className="px-6 py-6">
      <div className="flex justify-between items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-start  gap-3">
        <span className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Building2 className="size-4" /></span><div><h1 className="text-sm font-bold text-slate-900">Informations Générales de l’Entreprise</h1><p className="mt-0.5 text-[10px] text-slate-500">Ces informations apparaîtront dans l&apos;en-tête de vos devis, factures et bons de livraison.</p></div></div>
        <Button form={"form"} disabled={!form.formState.isValid || isPending || form.formState.isSubmitting || !form.formState.isDirty}  type="submit">
                {isPending || form.formState.isSubmitting ? <Spinner />: "Enregistrer"}
          </Button>      </div>
      <form id="form" onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <Controller name="name" control={form.control} render={({ field, fieldState }) => <Field><FieldLabel htmlFor="company-name" className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Société</FieldLabel><div className="relative mt-1"><FieldIcon><Building2 className="size-4" /></FieldIcon><Input {...field} id="company-name" className="h-10 border-slate-200 pl-9 text-xs shadow-none" /></div>{fieldState.error && <FieldError errors={[fieldState.error]} />}</Field>} />
        <Controller name="address" control={form.control} render={({ field, fieldState }) => <Field><FieldLabel htmlFor="company-address" className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Adresse</FieldLabel><div className="relative mt-1"><span className="pointer-events-none absolute left-3 top-3 text-slate-400"><MapPin className="size-4" /></span><Textarea {...field} id="company-address" className="min-h-17  border-slate-200 py-2 pl-9 text-xs shadow-none" /></div>{fieldState.error && <FieldError errors={[fieldState.error]} />}</Field>} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller name="phone" control={form.control} render={({ field, fieldState }) => <Field><FieldLabel htmlFor="company-phone" className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Téléphone</FieldLabel><div className="relative mt-1"><FieldIcon><Phone className="size-4" /></FieldIcon><Input {...field} id="company-phone" className="h-10  border-slate-200 pl-9 text-xs shadow-none" /></div>{fieldState.error && <FieldError errors={[fieldState.error]} />}</Field>} />
          <Controller name="email" control={form.control} render={({ field, fieldState }) =><Field><FieldLabel htmlFor="company-email" className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Email</FieldLabel><div className="relative mt-1"><FieldIcon><Mail className="size-4" /></FieldIcon><Input id="company-email" {...field} disabled className="h-10  border-slate-200 pl-9 text-xs shadow-none disabled:opacity-100" /></div>{fieldState.error && <FieldError errors={[fieldState.error]} />}</Field>} />
        </div>
        <Controller name="website" control={form.control} render={({ field, fieldState }) => <Field><FieldLabel htmlFor="company-website" className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Site web</FieldLabel><div className="relative mt-1"><FieldIcon><Globe2 className="size-4" /></FieldIcon><Input {...field} id="company-website" className="h-10  border-slate-200 pl-9 text-xs shadow-none" /></div>{fieldState.error && <FieldError errors={[fieldState.error]} />}</Field>} />
        <div className="grid gap-4 sm:grid-cols-2">
          <section className="rounded-xl border border-slate-200 p-4"><h2 className="text-xs font-bold text-slate-800">Devise principale par défaut</h2><p className="mt-1 text-[10px] text-slate-500">Devise utilisée par défaut dans tous les nouveaux documents.</p>
          <Controller name="currency" control={form.control} render={({ field, fieldState }) => 

          <>
            <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full mt-3 h-8  rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none">
              <SelectValue placeholder="Sélectionner la devise" />
            </SelectTrigger>
            <SelectContent aria-invalid={!!fieldState.error} >
              <SelectGroup>
                {CURRENCY.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> 
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </>

          } 
          /> 
          </section>
          <section className="rounded-xl border border-slate-200 p-4"><h2 className="text-xs font-bold text-slate-800">Taux de TVA par défaut (%)</h2><p className="mt-1 text-[10px] text-slate-500">Appliqué automatiquement lors de la saisie de nouveaux articles.</p>
          <Controller name="tva" control={form.control} render={({ field, fieldState }) => <div className="mt-3 flex flex-wrap gap-1.5">{[0, 7, 10, 14, 20].map((rate) => <button key={rate} type="button" onClick={() => field.onChange(rate)} className={`h-7 min-w-9 rounded-lg border px-2 text-[10px] font-bold ${field.value === rate ? "border-primary bg-primary text-primary-foreground" : "border-slate-200 bg-white text-slate-600"}`}>{rate}%</button>)}           {fieldState.error && <FieldError errors={[fieldState.error]} />}
</div>} />
          </section>
        </div>
      </form>
    </Card>
  );
}
