import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {useCallback, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProductStatus,
  ProductType,
  StockUnit,
} from "@/app/generated/prisma/enums";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { Options } from "../constants/options-to-frensh";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { productsSchemaWithId } from "../types";
import { useProductForm } from "../hooks/forms/use-product-form";
import { useUpdateProducts } from "../hooks/mutations/use-update-products";
import { productsSchema } from "../schemas/productsSchema";


export default function ProductsFormUpdate({item,setItem}:{item:productsSchemaWithId | null, setItem:React.Dispatch<React.SetStateAction<productsSchemaWithId | null>>}) {
    const {data,isPending,isError,mutate} = useUpdateProducts()
    const form= useProductForm({defaultValues:{
        reference:item?.reference || "default",
        name:item?.name || "",
        type:item?.type || ProductType.FINISHED_PRODUCT,
        status:item?.status ||  ProductStatus.ACTIVE,
        unit:item?.unit || StockUnit.M3,
        capacityM3:item?.capacityM3 ? Number(item.capacityM3) : undefined,
        dimensions:item?.dimensions || undefined,
        material:item?.material || undefined,
        color:item?.color || undefined,
        grammage:item?.grammage || undefined,
        taxRate:item?.taxRate ? Number(item.taxRate) : undefined,
        salePriceHT:item?.salePriceHT ? Number(item.salePriceHT) : undefined,
        purchasePriceHT:item?.purchasePriceHT ? Number(item.purchasePriceHT) : undefined,
        currentStock:item?.currentStock ? Number(item.currentStock) : undefined,
        minimumStock:item?.minimumStock ? Number(item.minimumStock) : undefined,
        maximumStock:item?.maximumStock ? Number(item.maximumStock) : undefined,
        trackLot:item?.trackLot || undefined,

    }})
    const onSubmit = useCallback((data: z.infer<typeof productsSchema>) => {
        mutate({...data,reference:item?.reference || "",id:12},{onSuccess:()=>{
            setItem(null)
        }})
    },[mutate,data])
        useEffect(() => {
            if (!item) return;
            form.reset({
                reference:item?.reference || "default",
                name:item?.name || "",
                type:item?.type || ProductType.FINISHED_PRODUCT,
                status:item?.status ||  ProductStatus.ACTIVE,
                unit:item?.unit || StockUnit.M3,
                capacityM3:item?.capacityM3 ? Number(item.capacityM3) : undefined,
                dimensions:item?.dimensions || undefined,
                material:item?.material || undefined,
                color:item?.color || undefined,
                grammage:item?.grammage || undefined,
                taxRate:item?.taxRate ? Number(item.taxRate) : undefined,
                salePriceHT:item?.salePriceHT ? Number(item.salePriceHT) : undefined,
                purchasePriceHT:item?.purchasePriceHT ? Number(item.purchasePriceHT) : undefined,
                currentStock:item?.currentStock ? Number(item.currentStock) : undefined,
                minimumStock:item?.minimumStock ? Number(item.minimumStock) : undefined,
                maximumStock:item?.maximumStock ? Number(item.maximumStock) : undefined,
                trackLot:item?.trackLot || undefined,
            })

            }, [item,form]);
    return(
        <>
        <form  onSubmit={form.handleSubmit(onSubmit)} id="form" className="overflow-hidden">               
             <ScrollArea className="h-[calc(90vh-130px)] " >

            <FieldGroup className="p-4 flex flex-col gap-4">
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
                        <Field aria-invalid={fieldState.invalid} className="col-span-2">
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
            </ScrollArea>

        </form>
        <DrawerFooter>
            <Button form={"form"} disabled={!form.formState.isValid || isPending || form.formState.isSubmitting || !form.formState.isDirty}  type="submit">
                {isPending || form.formState.isSubmitting ? <Spinner />: "Modifier"}
            </Button>
            <DrawerClose asChild>
                <Button variant="outline">Annuler</Button>
            </DrawerClose>
        </DrawerFooter>
        </>
    )
}