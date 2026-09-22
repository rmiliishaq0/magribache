"use client";

import {  ReceiptText,  SlidersHorizontal, TextCursorInput } from "lucide-react";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useUpdate } from "../hooks/mutations/use-update-info";
import { DocumentSettings } from "../types";
import { readSettings } from "../utils/read-settings";


let defaults: DocumentSettings;


export default function DocumentStructureForm() {
  const company = useAuthStore();
  const [settings, setSettings] = useState<DocumentSettings >(() => readSettings(company.documentSettings,defaults));
  const [isChange,setIsChange]= useState(false)
  useEffect(() => {
    const settings:DocumentSettings = readSettings(company.documentSettings,defaults)
    defaults={  priceMode:settings?.priceMode || "ht",  totalHtLabel:settings?.totalHtLabel || "Total HT", totalVatLabel:settings?.totalVatLabel || "Total TVA", netLabel:settings?.netLabel || "Net à Payer", recipientSignature:settings?.recipientSignature || "", amountPrefix:settings?.amountPrefix || "Arrêté le présent document à la somme de :", paymentTerms:settings?.paymentTerms || "50% à la commande 50% à la livraison", footer: "" };
    setSettings(settings)
  }, [company.documentSettings]);
  const update = <K extends keyof DocumentSettings>(key: K, value: DocumentSettings[K]) => setSettings((current) => ({ ...current, [key]: value }));

  const {mutate,isPending} = useUpdate()

  function save(){
    if(company.email){
      mutate({email:company.email!,documentSettings:JSON.stringify(settings)})
    }
  }

  return <div className="space-y-4">
    <SectionCard save={save} isChange={isChange} first isSaving={isPending} icon={<SlidersHorizontal className="size-4" />} title="Mode d’affichage des prix" description="Choisissez si vos tableaux PDF affichent les prix unitaires en Hors Taxe (HT) ou Tout Compris (TTC).">
      <ChoiceGrid value={settings.priceMode} onChange={(value) =>{setIsChange(value != defaults.priceMode); update("priceMode", value as "ht" | "ttc")}} choices={[{ value: "ht", title: "Mode Classique (HT)", detail: "Affiche P.U. HT et Total HT dans le tableau avec calcul TVA au récapitulatif. Recommandé B2B." }, { value: "ttc", title: "Mode Simplifié (TTC)", detail: "Affiche directement les montants Toutes Taxes Comprises (TTC) par article. Idéal pour particuliers." }]} />
    </SectionCard>
    <SectionCard save={save} isChange={isChange} isSaving={isPending} icon={<TextCursorInput className="size-4" />} title="Libellés personnalisés" description="Personnalisez les intitulés de totaux, signatures et phrases de clôture."><div className="grid gap-3 sm:grid-cols-3">
      <MiniInput label="Libellé total HT" value={settings.totalHtLabel} onChange={(value) =>{setIsChange(value != defaults.priceMode); update("totalHtLabel", value)}} />
      <MiniInput label="Libellé total TVA" value={settings.totalVatLabel} onChange={(value) =>{setIsChange(value != defaults.priceMode); update("totalVatLabel", value)}} />
      <MiniInput label="Libellé net à payer" value={settings.netLabel} onChange={(value) =>{setIsChange(value != defaults.priceMode); update("netLabel", value)} }/>
      <MiniInput label="Signature destinataire" value={settings.recipientSignature} onChange={(value) =>{setIsChange(value != defaults.priceMode); update("recipientSignature", value)}} />
      <div className="sm:col-span-2">
        <MiniInput label="Préfixe montant en lettres" value={settings.amountPrefix} onChange={(value) =>{setIsChange(value != defaults.priceMode); update("amountPrefix", value)}} />
        </div>
      </div>
    </SectionCard>
    <SectionCard save={save} isChange={isChange} isSaving={isPending} icon={<ReceiptText className="size-4" />} title="Pied de page & Conditions de Règlement" description="Définissez les conditions générales de vente et les mentions légales par défaut.">
    <div className="space-y-3">
      <MiniInput label="Conditions de paiement par défaut" value={settings.paymentTerms} onChange={(value) => {setIsChange(value != defaults.priceMode); update("paymentTerms", value)}} />
        <label className="grid gap-1 text-[9px] font-bold uppercase tracking-wide text-slate-700">Notes et mentions de bas de page<Textarea value={settings.footer} onChange={(event) => {setIsChange(event.target.value != defaults.priceMode); update("footer", event.target.value)}} className="min-h-20 rounded-xl border-slate-200 text-xs font-normal normal-case" placeholder="Vos mentions légales, coordonnées bancaires et conditions…" /></label></div>
    </SectionCard>
  </div>;
}
const isPending=false

function SectionCard({ icon, title, description, children,first,isSaving,isChange,save}: {save:()=>void,isChange:boolean, icon: React.ReactNode; title: string; description: string; children: React.ReactNode ,first?:boolean,isSaving:boolean}) { 
  return (
<Card className="rounded-[22px] border-slate-200 px-5 py-5 shadow-sm">
  <div className="flex gap-3 border-b border-slate-100 pb-4  justify-between items-center">
  <div className="flex gap-3">
  <span className="flex size-7 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</span><div><h2 className="text-sm font-bold text-slate-900">{title}</h2><p className="mt-0.5 text-[9px] text-slate-500">{description}</p></div>
  </div> 
  {first && (
    <Button onClick={save} form={"form"} disabled={isSaving || !isChange}   type="submit">
        {isPending || isSaving ? <Spinner />: "Enregistrer"}
    </Button>
  )}
  </div>
  
  <div className="pt-4">{children}</div>
    
  </Card>
  )}
function MiniInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) 
{ return <label className="grid gap-1 text-[9px] font-bold uppercase tracking-wide text-slate-700">{label}
<Input value={value} onChange={(event) => onChange(event.target.value)} className="h-8 rounded-lg border-slate-200 text-xs font-normal normal-case shadow-none" /></label>; }

function ChoiceGrid({ value, onChange, choices }: { value: string; onChange: (value: string) => void; choices: { value: string; title: string; detail: string }[] }) { return <div className="grid gap-3 sm:grid-cols-2">{choices.map((choice) => <button type="button" key={choice.value} onClick={() =>{onChange(choice.value)}} className={`rounded-xl border p-4 text-left ${value === choice.value ? "border-primary bg-primary/5" : "border-slate-200"}`}><span className="flex items-center justify-between text-[10px] font-bold text-slate-800">{choice.title}{value === choice.value && <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[9px] text-white">✓</span>}</span><span className="mt-1 block text-[9px] leading-4 text-slate-500">{choice.detail}</span></button>)}</div>; }
