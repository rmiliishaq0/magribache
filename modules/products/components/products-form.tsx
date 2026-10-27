import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import React, { SetStateAction, useCallback, useMemo } from "react";
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
import { productsSchema } from "../schemas/productsSchema";
import { useProductForm } from "../hooks/forms/use-product-form";
import { useCreateProduct } from "../hooks/mutations/use-create-product";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { Fournisseur } from "../types";

export default function ProductForm({setIsOpen,suppliers}:{setIsOpen:React.Dispatch<SetStateAction<boolean>>,suppliers:Fournisseur[]}){
    const mutate = useCreateProduct()
    const form= useProductForm({})

    const anchor = useComboboxAnchor()

    const onSubmit = useCallback((data:z.infer<typeof productsSchema>)=>{
        mutate.mutate(data,{
            onSuccess:()=>{
                setIsOpen(false)
                form.reset()
            }
        })
    },[mutate])

    return(
        <form className="flex flex-col gap-4 w-full " onSubmit={form.handleSubmit(onSubmit)} >
        <ScrollArea className="h-96 w-full mb-14">
            <FieldGroup className="grid grid-cols-2 p-4 gap-4 items-center justify-center relative">

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
                            value={field.value ?? undefined}
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
                            value={field.value ?? undefined}
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
                            value={field.value ?? undefined}
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
                            value={field.value ?? undefined}
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
                            value={field.value ?? undefined}
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
                            value={field.value ?? undefined}
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
                            value={field.value ?? undefined}
                            onChange={(e)=>field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />
                     <Controller
                    name="fournisseurs"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="fournisseurs">Fournisseurs</FieldLabel>
                            <Combobox
                                multiple
                                autoHighlight
                                virtualized
                                value={(field.value ?? []) as Fournisseur[]} onValueChange={(value) =>
                                field.onChange(value.length ==0 || value == null ? undefined : value)} 
                                items={suppliers}
                                itemToStringValue={(framework:Fournisseur) => framework.name || ""}
                                >
                                <ComboboxChips ref={anchor} className="w-full max-w-xs" >
                                    <ComboboxValue >
                                    {(values) => (
                                        <React.Fragment>
                                        {values.map((value:string) => (
                                            <ComboboxChip  key={value}>{value}</ComboboxChip>
                                        ))}
                                        <ComboboxChipsInput  />
                                        </React.Fragment>
                                    )}
                                    </ComboboxValue>
                                </ComboboxChips>
                                <ComboboxContent anchor={anchor}> 
                                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                                    <ComboboxList>
                                    {(item:Fournisseur) => (
                                        <ComboboxItem key={item?.reference} value={item?.reference}>
                                        {item?.name}
                                        </ComboboxItem>
                                    )}
                                    </ComboboxList>
                                </ComboboxContent>
                                </Combobox>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />


                <div className="fixed bottom-2 bg-white left-0 right-0 p-4">
                    <Button className="col-span-2 w-full" disabled={!form.formState.isValid || mutate.isPending || !form.formState.isDirty  } type="submit">
                    {mutate.isPending || form.formState.isSubmitting ? <Spinner /> : "Enregistrer"}
                </Button>
                </div>
            </FieldGroup>
            </ScrollArea>
        </form>
    )
}