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
import { Textarea } from "@/components/ui/textarea";
import {
  SupplierStatus,
} from "@/app/generated/prisma/enums";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSupplierForm } from "../hooks/forms/use-supplier-form";
import { useCreateSupplier } from "../hooks/mutations/use-create-supplier";
import { SuppliersSchema } from "../types";
import { supplierStatusLabels } from "../constants/options-to-frensh";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from "@/components/ui/combobox";
import { useGetProducts } from "@/modules/products/hooks/queries/use-get-products";


export default function SupplierForm({setIsOpen}:{setIsOpen:React.Dispatch<SetStateAction<boolean>>}){
    const anchor = useComboboxAnchor()
    const mutate = useCreateSupplier()
    const form= useSupplierForm({})

    const {data} = useGetProducts({})

    const products = useMemo(()=>{
        return data?.products?.products || []
    },[data])

    const onSubmit = useCallback((data:SuppliersSchema)=>{
        mutate.mutate(data,{
            onSuccess:()=>{
                setIsOpen(false)
                form.reset()
            }
        })
    },[mutate,form])

    return(
        <form id="supplier-form" className="flex flex-col gap-4 w-full "  onSubmit={form.handleSubmit(onSubmit,    (errors) => console.log("❌ FORM VALIDATION:", errors)
)} >
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
                    name="contactName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="contactName">Nom du contact</FieldLabel>
                        <Input
                            id="contactName"
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
                    name="country"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="country">Pays</FieldLabel>
                        <Input
                            id="country"
                            type="text"
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
                        <Textarea
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
                    name="address"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="address">Adresse</FieldLabel>
                        <Input
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
                    name="ice"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="ice">Région</FieldLabel>
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
                    name="paymentTerms"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="paymentTerms">Conditions de paiement</FieldLabel>
                        <Input
                            id="paymentTerms"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="currency"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="currency">Devise</FieldLabel>
                        <Input
                            id="currency"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="deliveryDelayDays"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="deliveryDelayDays">Délai de livraison (jours)</FieldLabel>
                        <Input
                            type="number"
                            id="deliveryDelayDays"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ? Number(field.value) : undefined}
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="products"
                    control={form.control}
                    render={({ field, fieldState }) => <>
                    
                         <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="products">Produits</FieldLabel>
                            <Combobox
                                multiple
                                autoHighlight
                                virtualized
                                value={field.value || []} onValueChange={(value) =>
                                field.onChange(value.length ==0 || value == null ? undefined : value)} 
                                items={products}
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
                                    <ComboboxEmpty>Aucun produit trouvé.</ComboboxEmpty>
                                    <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item?.reference} value={item?.reference}>
                                        {item?.name}
                                        </ComboboxItem>
                                    )}
                                    </ComboboxList>
                                </ComboboxContent>
                                </Combobox>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    </>}
                    
                    />

                    <Controller
                    name="status"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel>Statut</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                            <SelectValue placeholder="Choisir une priorité" />
                            </SelectTrigger>
                            <SelectContent>
                            {Object.values(SupplierStatus).map((item) => (
                                <SelectItem key={item} value={item}>
                                    {supplierStatusLabels[item]}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    name="notes"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid} className="col-span-2">
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

                
                <div className="fixed bottom-2 bg-white left-0 right-0 p-4">
                    <Button form="supplier-form" className="col-span-2 w-full" disabled={mutate.isPending || form.formState.isSubmitting || !form.formState.isValid}  type="submit">
                        {mutate.isPending || form.formState.isSubmitting ? <Spinner /> : "Enregistrer"}
                    </Button>
                </div>
            </FieldGroup>
            </ScrollArea>
        </form>
    )
}