"use client";

import { ImageIcon, Palette, Stamp } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth-store";
import { visualSchema } from "../schamas/settings";
import UploadBox from "./upload-box";
import z from "zod";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useVisualForm } from "../hooks/forms/use-visual-form";
import { useUpdateVisual } from "../hooks/mutations/use-update-visual";

type VisualValues = z.infer<typeof visualSchema>;

const colors = ["#2563EB", "#4F46E5", "#7C3AED", "#0F766E", "#D97706", "#334155"];

export default function VisualIdentityForm() {
  const company = useAuthStore();
  const form = useVisualForm()
  const {isPending,mutate} = useUpdateVisual()

  const titlesColor = form.watch("titlesColor")
  const tableBgColor = form.watch("tableBgColor")
  const tableFontColor = form.watch("tableFontColor")

  useEffect(() => {
    form.reset({ logo: company.logo ?? undefined, signature: company.signature ?? undefined, watermark: company.watermark ?? undefined, titlesColor: company.titlesColor ?? "#D97706",tableFontColor:company.tableFontColor ??"#ffffff" ,tableBgColor:company.tableBgColor ?? "#D97706"});
  }, [company, form]);

  function save(values: VisualValues) {
    if(company.email){
          mutate({email:company.email!,...values})
    }
  }

 const colorFields= [{name:"titlesColor",field:"Couleur Principale (Titres)"},{name:"tableBgColor", field:"Fond d'en-tête de tableau"},{name:"tableFontColor", field:"Texte d'en-tête de tableau"}]
  return (
    <Card className=" px-6 py-6 min-w-0">
            <div className="flex justify-between items-center gap-3 border-b border-slate-100 pb-4">
      <div className="flex items-start gap-3"><span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary"><Palette className="size-4" /></span><div><h1 className="text-sm font-bold text-slate-900">Logos, Filigrane & Identité Visuelle</h1><p className="mt-0.5 text-[10px] text-slate-500">Gérez vos logos, filigranes transparents et cachets pour vos documents imprimés.</p></div></div>
      <Button form={"form"} disabled={!form.formState.isValid || isPending || form.formState.isSubmitting || !form.formState.isDirty}  type="submit">
                {isPending || form.formState.isSubmitting ? <Spinner />: "Enregistrer"}
          </Button>
          </div>
      <form id="form" onSubmit={form.handleSubmit(save)} className="mt-4 space-y-5">
        <div className="grid w-full min-w-0 max-w-full gap-3 md:grid-cols-[repeat(3,minmax(0,1fr))]">
            <UploadBox
              logo={company.logo ?? undefined}
              name="logo"
              label="1. Logo en-tête"
              hint="S’affiche dans le coin supérieur de vos factures et devis."
              icon={<ImageIcon className="size-5" />}
              control={form.control}
            />

            <UploadBox
              logo={company.watermark ?? undefined}
              name="watermark"
              label="2. Filigrane fond"
              hint="Centré en filigrane discret au milieu de vos documents."
              icon={<Palette className="size-5" />}
              control={form.control}
            />

            <UploadBox
              logo={company.signature ?? undefined}
              name="signature"
              label="3. Cachet & signature"
              hint="S’affiche dans la zone de validation et signature en bas de page."
              icon={<Stamp className="size-5" />}
              control={form.control}
            />
          </div>
        <section className="border-t border-slate-100 pt-4">
          <h2 className="text-xs font-bold text-slate-800">Thème de couleur & style des tableaux</h2>
          <p className="mt-0.5 text-[10px] text-slate-500">Personnalisez la couleur et les éléments graphiques de vos documents.</p>
            <div className="mt-3 flex flex-wrap gap-2">{colors.map((color) => <button key={color} type="button" onClick={() => {
        form.setValue("titlesColor", color, {
          shouldDirty: true,
          shouldValidate: true,
        });

        form.setValue("tableBgColor", color, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }} className={`flex w-[4.5rem] flex-col rounded-lg border p-1.5 ${
  titlesColor === color && tableBgColor === color
    ? "border-primary ring-1 ring-primary"
    : "border-slate-200"
}`}>
              <span className="h-4 rounded" style={{ backgroundColor: color }} /><span className="mt-1 truncate text-[8px] text-slate-500">{color}</span>
              </button>)}</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 min-w-0">
              {
                colorFields.map((i,index)=>
                  <ColorInput control={form.control} key={index} field={i.field} name={i.name as "titlesColor" | "tableBgColor" | "tableFontColor"}/>
                )
              }
            </div>
        </section>
        <section className="rounded-xl bg-slate-900 p-3 text-white"><p className="mb-2 text-[9px] font-bold uppercase tracking-wide text-slate-300">Aperçu du tableau PDF en direct</p><div className="overflow-hidden rounded-md"><div style={{backgroundColor:tableBgColor, color:tableFontColor}} className={"min-w-0 grid grid-cols-[1fr_80px_110px] bg-primary px-3 py-1.5 text-[8px] font-semibold"}><span>Désignation</span><span>Qté</span><span className="text-right">Total HT</span></div><div className="grid grid-cols-[1fr_80px_110px] bg-slate-800 px-3 py-1.5 text-[8px]"><span>Prestation de services & développement</span><span>1</span><span className="text-right">15 000,00 MAD</span></div></div></section>
      </form>
    </Card>
  );
}

function ColorInput({control,field,name}:{control: ReturnType<typeof useForm<VisualValues>>["control"],field:string,name:"titlesColor" | "tableBgColor" | "tableFontColor"}){
   return (<div className="rounded-xl border border-slate-200 p-3"><p className="text-[9px] font-semibold text-slate-600">{field}</p>
              <Controller 
                name={name}
                control={control} 
                render={({ field }) => 
                  <Input {...field} type="color" className="mt-2 h-8 w-full rounded-md border-slate-200 p-1" />} 
              />
          </div>)
}