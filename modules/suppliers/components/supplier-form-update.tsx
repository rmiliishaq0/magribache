import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {useCallback, useEffect,  } from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { SuppliersSchema,SuppliersSchemaWithId } from "../types";
import { SupplierStatus } from "@/app/generated/prisma/enums";
import { supplierStatusLabels } from "../constants/options-to-frensh";
import { useSupplierForm } from "../hooks/forms/use-supplier-form";
import { useUpdateSupplier } from "../hooks/mutations/use-update-supplier";


export default function SupplierFormUpdate({item,setItem}:{item:SuppliersSchema | null, setItem:React.Dispatch<React.SetStateAction<SuppliersSchemaWithId | null>>}) {
    const form= useSupplierForm({
                defaultValues: {
                    reference: item?.reference || "",
                    name: item?.name || "",
                    status: item?.status || SupplierStatus.ACTIVE,
                    contactName: item?.contactName || "",
                    phone: item?.phone || "",
                    whatsapp: item?.whatsapp || "",
                    email: item?.email || "",
                    country: item?.country || "",
                    city: item?.city || "",
                    address: item?.address || "",
                    ice:item?.ice || "",
                    rc:item?.rc || "",
                    ifNumber:item?.ifNumber || "",
                    paymentTerms:item?.paymentTerms || "",
                    currency:item?.currency || "MAD",
                    deliveryDelayDays:item?.deliveryDelayDays || 0,
                    notes:item?.notes || "",
                }})
    const {mutate,isPending} = useUpdateSupplier()

    const onSubmit = useCallback((data:SuppliersSchema)=>{
            mutate(data ,{onSuccess:()=>{
            setItem(null)
        }})
    },[mutate])

    useEffect(() => {
  if (!item) return;

  form.reset({
    reference: item.reference ?? "",
    name: item.name ?? "",
    status: item?.status || SupplierStatus.ACTIVE,
    contactName: item.contactName ?? "",
    phone: item.phone ?? "",
    whatsapp: item.whatsapp ?? "",
    email: item.email ?? "",
    country: item.country ?? "",
    city: item.city ?? "",
    address: item.address ?? "",
    ice:item.ice || "",
    rc:item.rc || "",
    ifNumber:item.ifNumber || "",
    paymentTerms:item.paymentTerms || "",
    currency:item.currency || "MAD",
    deliveryDelayDays:item.deliveryDelayDays || 0,
    notes:item.notes || "",
  });
}, [item, form]);
    return(
        <>
        <form
  id="form"
  onSubmit={form.handleSubmit(
    onSubmit
  )}
>            
             <ScrollArea className="h-[calc(90vh-130px)] overflow-y-auto" >
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