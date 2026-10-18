"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PartnerPriority, PartnerSource, PartnerStatus } from "@/app/generated/prisma/enums";
import { Options } from "../constants/options-to-frensh";
import { useProspectForm } from "../hooks/forms";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CompanyType } from "@/app/generated/prisma/browser";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { z } from "zod";
import { crmSchema, crmSchemaWithRef } from "../schemas/prospect";
import {fieldLabels} from "@/modules/crm/constants/options-to-frensh"
import { format, setDate } from "date-fns";
import { cn } from "@/lib/utils";
import { priorityColors, statusColors } from "../constants/colors";
import { useUpdateProspect } from "../hooks/mutations/use-update-prospect";
import {ProspectStatus} from "@/modules/crm/types"
import { SelectOption } from "../constants/select-option";


export default function ProspectInfo({prospect}:{prospect :z.infer<typeof crmSchemaWithRef>}){  
    const [isEditing,setIsEditing] = useState(false)
    const form= useProspectForm({})
    useEffect(()=>{
        form.reset(prospect)
    },[form,prospect])
    const mutate = useUpdateProspect()
    const onSubmit = useCallback((data:z.infer<typeof crmSchema>)=>{
        mutate.mutate({...data,reference:prospect?.reference})
    },[mutate])
    return(
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold text-secondary">Informations prospect</CardTitle>
                <div className="flex gap-4 items-center">
                    {!isEditing && <Button variant={"outline"} onClick={()=>{setIsEditing(true)}}><Pen/> Modifier</Button>}
                    {isEditing &&<> 
                        <Button form={"form"} disabled={!form.formState.isValid || mutate.isPending || form.formState.isSubmitting || !form.formState.isDirty}  type="submit">{mutate.isPending || form.formState.isSubmitting ? <Spinner />: "Modifier"}</Button>
                        <Button variant="outline" onClick={()=>{setIsEditing(false)}}>Annuler</Button>
                        </>
                    }
                </div>
            </CardHeader>
            <CardContent>
                {isEditing ? 
                     <form onSubmit={form.handleSubmit(onSubmit)}   id="form">               
            <FieldGroup className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 items-center justify-center">
                    <Controller
                    name="companyName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="companyName">Entreprise</FieldLabel>
                        <Input
                            id="companyName"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />
                    <Controller
                        name="companyType"
                        control={form.control}
                        render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel>Statut</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                            <SelectValue placeholder="Choisir un statut" />
                            </SelectTrigger>
                            <SelectContent>
                            {Object.values(CompanyType).map((item) => (
                                <SelectItem key={item} value={item}>
                                    {Options[item]}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="fullName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="fullName">Nom complet</FieldLabel>
                        <Input
                            id="fullName"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
                        <Input
                            id="phone"
                            type="tel"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="whatsapp"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="whatsapp">WhatsApp</FieldLabel>
                        <Input
                            id="whatsapp"
                            type="tel"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    
                    <Controller
                    name="website"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="website">Site Web</FieldLabel>
                        <Input
                            id="website"
                            type="url"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="address"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="address">Adresse</FieldLabel>
                        <Textarea
                            id="address"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="city"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="city">Ville</FieldLabel>
                        <Input
                            id="city"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="region"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="region">Région</FieldLabel>
                        <Input
                            id="region"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="country"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="country">Pays</FieldLabel>
                        <Input
                            id="country"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="ice"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="ice">ICE</FieldLabel>
                        <Input
                            id="ice"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="rc"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="rc">RC</FieldLabel>
                        <Input
                            id="rc"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="ifNumber"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="ifNumber">IF</FieldLabel>
                        <Input
                            id="ifNumber"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />


                    <Controller
                        name="status"
                        control={form.control}
                        render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel>Statut</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                            <SelectValue placeholder="Choisir un statut" />
                            </SelectTrigger>
                            <SelectContent className="w-fit h-fit" >
                                {SelectOption.map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {Options[item as keyof typeof Options]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="source"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel>Source</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                            <SelectValue placeholder="Choisir une source" />
                            </SelectTrigger>
                            <SelectContent>
                            {Object.values(PartnerSource).map((item) => (
                                <SelectItem key={item} value={item}>
                                    {Options[item]}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="priority"
                    control={form.control}
                    render={({ field, fieldState }) => {
                        console.log("field.value",field.value)
                        return <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel>Priorité</FieldLabel>
                        <Select value={field.value || undefined} onValueChange={field.onChange}>
                            <SelectTrigger>
                            <SelectValue placeholder="Choisir une priorité" />
                            </SelectTrigger>
                            <SelectContent>
                            {Object.values(PartnerPriority).map((item) => (
                                <SelectItem key={item} value={item}>
                                    {Options[item]}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        {fieldState.invalid  && <FieldError errors={[fieldState.error]} />}
                        </Field>}
                    }
                    />

                    <Controller
                    name="notes"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="notes">Notes</FieldLabel>
                        <Textarea
                            id="notes"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="nextFollowUpAt"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="nextFollowUpAt">Prochain suivi</FieldLabel>
                        <Input
                            id="nextFollowUpAt"
                            type="date"
                            value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                            onChange={(e) =>
                            field.onChange(
                                e.target.value ? new Date(e.target.value) : undefined
                            )
                            }
                            aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />
            </FieldGroup>            
                </form>
                :
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center justify-center">
                        {Object.entries(prospect).map(([key,value])=>{
                            let url:string|undefined = undefined
                            let badgeStyle= undefined
                            let isBadge= false
                            if(key =="id" || key =="activities" || key =="updatedAt" || key =="activities" || key=="type") return
                            if(value && key && key =="status"){
                                isBadge=true
                                badgeStyle = statusColors[value as keyof typeof statusColors]
                            }
                            if(value && key && key=="priority"){
                                isBadge=true
                                badgeStyle = priorityColors[value as keyof typeof priorityColors]
                                console.log(badgeStyle)
                            }
                            if(Object.keys(Options).includes(String(value))){
                                value = Options[value as keyof typeof Options]
                            }
                            if(value && key && key =="email"){
                                url = `mailto:${value}`
                            }
                            if(value && key && key =="whatsapp"){
                                url = `https://wa.me/${value}`
                            }
                            if(value && key && key =="website"){
                                url = String(value)
                            }
                            if(value && key && (key =="createdAt" || key=="nextFollowUpAt")){
                                value = format(new Date(value),"PPP")
                            }
                            return <DataField isBadge={isBadge} badgeStyle={badgeStyle} key={key} field={fieldLabels[key as keyof typeof fieldLabels] ||key} value={String(value).trim()} url={url} />
                        }
                        )} 

                   </div>
                }
            </CardContent>
        </Card>
    )
}


function DataField ({url,field,value,isBadge,badgeStyle}:{url?:string,field:string,value:string,isBadge?:boolean,badgeStyle?:string}){
    return(
         <>
            <div>
                <h3 className="text-secondary flex gap-4 text-start font-medium text-[16px] items-center">{field} : {isBadge ? <Badge className={cn("font-semibold",badgeStyle)}>{value}</Badge> : ( url ? <Button className="font-semibold" variant={"link"}><Link href={url} target="_blank">{value}</Link></Button> : <span className="font-semibold">{value}</span>)}</h3>
            </div>
        </>
    )
}