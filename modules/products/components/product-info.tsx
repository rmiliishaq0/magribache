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
import {  ProductStatus, ProductType, StockUnit } from "@/app/generated/prisma/enums";
import { Options } from "../constants/options-to-frensh";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CompanyType } from "@/app/generated/prisma/browser";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {fieldLabels} from "@/modules/crm/constants/options-to-frensh"
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { productsSchemaWithId } from "../types";
import { useProductForm } from "../hooks/forms/use-product-form";
import { useUpdateProducts } from "../hooks/mutations/use-update-products";
import { z } from "zod";
import { productsSchema } from "../schemas/productsSchema";
import { productStatusColors, productTypeColors } from "../constants/colors";


export default function ProductInfo({product}:{product:productsSchemaWithId}){  
    const [isEditing,setIsEditing] = useState(false)
    const form= useProductForm({})
    useEffect(()=>{
        form.reset(product)
    },[form,product])
    const mutate = useUpdateProducts()
    const onSubmit = useCallback((data:z.infer<typeof productsSchema>)=>{
        mutate.mutate({...data,reference:product?.reference,id:10})
    },[mutate])
    return(
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold text-secondary">Informations produit</CardTitle>
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
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="name">Nom</FieldLabel>
                        <Input
                            id="name"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="type"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel>Type</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                            <SelectValue placeholder="Choisir un type" />
                            </SelectTrigger>
                            <SelectContent>
                            {Object.values(ProductType).map((item) => (
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
                    name="status"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel>Statut</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                            <SelectValue placeholder="Choisir un statut" />
                            </SelectTrigger>
                            <SelectContent>
                            {Object.values(ProductStatus).map((item) => (
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
                    name="unit"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel>Unité</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                            <SelectValue placeholder="Choisir une unité" />
                            </SelectTrigger>
                            <SelectContent>
                            {Object.values(StockUnit).map((item) => (
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />


                    <Controller
                    name="capacityM3"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="capacityM3">Capacité (m³)</FieldLabel>
                        <Input
                            id="capacityM3"
                            type="number"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ? Number(field.value) : undefined}
                            onChange={(e)=>field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="dimensions"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="dimensions">Dimensions</FieldLabel>
                        <Input
                            id="dimensions"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            type="text"
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="material"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="material">Matériel</FieldLabel>
                        <Input
                            id="material"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="color"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="color">Couleur</FieldLabel>
                        <Input
                            id="color"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />
                    <Controller
                    name="grammage"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="grammage">Gammage</FieldLabel>
                        <Input
                            id="grammage"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="taxRate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="taxRate">Taux de taxe</FieldLabel>
                        <Input
                            type="number"
                            id="taxRate"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ? Number(field.value) : undefined}
                            onChange={(e)=>field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="salePriceHT"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="salePriceHT">Prix de vente HT</FieldLabel>
                        <Input
                            id="salePriceHT"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            type="number"
                            value={field.value ? Number(field.value) : undefined}
                            onChange={(e)=>field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="purchasePriceHT"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="purchasePriceHT">Prix d'achat HT</FieldLabel>
                        <Input
                            id="purchasePriceHT"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            type="number"
                            value={field.value ? Number(field.value) : undefined}
                            onChange={(e)=>field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="currentStock"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="currentStock">Stock actuel</FieldLabel>
                        <Input
                            id="currentStock"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            type="number"
                            value={field.value ? Number(field.value) : undefined}
                            onChange={(e)=>field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="minimumStock"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="minimumStock">Stock minimum</FieldLabel>
                        <Input
                            id="minimumStock"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            type="number"
                            value={field.value ? Number(field.value) : undefined}
                            onChange={(e)=>field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="maximumStock"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid} >
                        <FieldLabel htmlFor="maximumStock">Stock maximum</FieldLabel>
                        <Input
                            id="maximumStock"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            type="number"
                            value={field.value ? Number(field.value) : undefined}
                            onChange={(e)=>field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />
            </FieldGroup>            
                </form>
                :
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center justify-center">
                        {Object.entries(product).map(([key,value])=>{
                            let badgeStyle= undefined
                            let isBadge= false
                            if(key =="id" || key =="activity" || key =="updatedAt") return
                            if(value && key && key =="status" || key=="type"){
                                isBadge=true
                                badgeStyle = key === "status" ? productStatusColors[value as keyof typeof productStatusColors] : productTypeColors[value as keyof typeof productTypeColors]
                            }
                            
                            if(Object.keys(Options).includes(String(value))){
                                value = Options[value as keyof typeof Options]
                            }
                            if(value && key && (key =="createdAt" || key=="nextFollowUpAt")){
                                value =  format(new Date(value as string),"PPP")
                            }
                            return <DataField isBadge={isBadge} badgeStyle={badgeStyle} key={key} field={Options[key as keyof typeof Options] ||key} value={String(value).trim()}  />
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