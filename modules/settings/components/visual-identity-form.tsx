"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Palette, Stamp } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Card } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth-store";
import { updateSetting } from "@/utils/Apis";
import { settingSchema } from "@/utils/schema";

type SettingsValues = z.infer<typeof settingSchema>;

const colors = ["#2563EB", "#4F46E5", "#7C3AED", "#0F766E", "#D97706", "#334155"];

export default function VisualIdentityForm() {
  const company = useAuthStore();
  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingSchema),
    defaultValues: { name: company.name ?? "", address: company.address ?? "", phone: company.phone ?? "", website: company.website ?? "", description: company.description ?? "Informations générales de l'entreprise", logo: company.logo ?? undefined, profileImage: company.profilIcon ?? undefined, signature: company.signature ?? undefined, watermark: company.watermark ?? undefined, defaultColor: company.defaultColor ?? "#2563EB", footerText: company.footerText ?? "" },
  });
  const selectedColor = useWatch({ control: form.control, name: "defaultColor" });

  useEffect(() => {
    form.reset({ name: company.name ?? "", address: company.address ?? "", phone: company.phone ?? "", website: company.website ?? "", description: company.description ?? "Informations générales de l'entreprise", logo: company.logo ?? undefined, profileImage: company.profilIcon ?? undefined, signature: company.signature ?? undefined, watermark: company.watermark ?? undefined, defaultColor: company.defaultColor ?? "#2563EB", footerText: company.footerText ?? "" });
  }, [company, form]);

  async function save(values: SettingsValues) {
    try { await updateSetting(values); toast.success("Identité visuelle enregistrée"); form.reset(values); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Une erreur s'est produite"); }
  }

  return (
    <Card className=" px-6 py-6 ">
      <div className="flex items-start gap-3 border-b border-slate-100 pb-4"><span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary"><Palette className="size-4" /></span><div><h1 className="text-sm font-bold text-slate-900">Logos, Filigrane & Identité Visuelle</h1><p className="mt-0.5 text-[10px] text-slate-500">Gérez vos logos, filigranes transparents et cachets pour vos documents imprimés.</p></div></div>
      <form onSubmit={form.handleSubmit(save)} className="mt-4 space-y-5">
        <div className="grid gap-3 md:grid-cols-3">
          <UploadBox name="logo" label="1. Logo en-tête" hint="S’affiche dans le coin supérieur de vos factures et devis." icon={<ImageIcon className="size-5" />} control={form.control} />
          <UploadBox name="watermark" label="2. Filigrane fond" hint="Centré en filigrane discret au milieu de vos documents." icon={<Palette className="size-5" />} control={form.control} />
          <UploadBox name="signature" label="3. Cachet & signature" hint="S’affiche dans la zone de validation et signature en bas de page." icon={<Stamp className="size-5" />} control={form.control} />
        </div>
        <section className="border-t border-slate-100 pt-4"><h2 className="text-xs font-bold text-slate-800">Thème de couleur & style des tableaux</h2><p className="mt-0.5 text-[10px] text-slate-500">Personnalisez la couleur et les éléments graphiques de vos documents.</p><div className="mt-3 flex flex-wrap gap-2">{colors.map((color) => <button key={color} type="button" onClick={() => form.setValue("defaultColor", color, { shouldDirty: true })} className={`flex w-[4.5rem] flex-col rounded-lg border p-1.5 ${selectedColor === color ? "border-primary ring-1 ring-primary" : "border-slate-200"}`}><span className="h-4 rounded" style={{ backgroundColor: color }} /><span className="mt-1 truncate text-[8px] text-slate-500">{color}</span></button>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-slate-200 p-3"><p className="text-[9px] font-semibold text-slate-600">Couleur principale</p><Controller name="defaultColor" control={form.control} render={({ field }) => <Input {...field} type="color" className="mt-2 h-8 w-full rounded-md border-slate-200 p-1" />} /></div><div className="rounded-xl border border-slate-200 p-3"><p className="text-[9px] font-semibold text-slate-600">Fond d’en-tête de tableau</p><div className="mt-2 flex h-8 items-center rounded-md bg-primary px-3 text-[9px] text-primary-foreground">Couleur primaire</div></div><div className="rounded-xl border border-slate-200 p-3"><p className="text-[9px] font-semibold text-slate-600">Texte d’en-tête de tableau</p><div className="mt-2 flex h-8 items-center rounded-md border border-slate-200 bg-white px-3 text-[9px] text-slate-600">Blanc</div></div></div></section>
        <section className="rounded-xl bg-slate-900 p-3 text-white"><p className="mb-2 text-[9px] font-bold uppercase tracking-wide text-slate-300">Aperçu du tableau PDF en direct</p><div className="overflow-hidden rounded-md"><div className="grid grid-cols-[1fr_80px_110px] bg-primary px-3 py-1.5 text-[8px] font-semibold"><span>Désignation</span><span>Qté</span><span className="text-right">Total HT</span></div><div className="grid grid-cols-[1fr_80px_110px] bg-slate-800 px-3 py-1.5 text-[8px]"><span>Prestation de services & développement</span><span>1</span><span className="text-right">15 000,00 MAD</span></div></div></section>
        {form.formState.isDirty && <button type="submit" className="ml-auto block rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">Enregistrer</button>}
      </form>
    </Card>
  );
}

function UploadBox({ name, label, hint, icon, control }: { name: "logo" | "watermark" | "signature"; label: string; hint: string; icon: React.ReactNode; control: ReturnType<typeof useForm<SettingsValues>>["control"] }) {
  return <section className="rounded-xl border border-slate-200 p-3"><h2 className="text-[10px] font-bold text-slate-800">{label}</h2><p className="mt-1 h-7 text-[8px] leading-3 text-slate-500">{hint}</p><Controller name={name} control={control} render={({ field, fieldState }) => <Field><FieldLabel htmlFor={name} className="mt-3 flex h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 text-primary"><span>{icon}</span><span className="text-[9px] font-semibold">Importer le fichier</span><span className="text-[8px] font-normal text-slate-400">PNG transparent recommandé</span></FieldLabel><Input id={name} type="file" accept="image/png,image/jpeg" className="sr-only" onChange={(event) => field.onChange(event.target.files?.[0])} />{fieldState.error && <FieldError errors={[fieldState.error]} />}</Field>} /></section>;
}
