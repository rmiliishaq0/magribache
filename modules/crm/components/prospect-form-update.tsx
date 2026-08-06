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
import { Textarea } from "@/components/ui/textarea";
import {
    CompanyType,
  PartnerPriority,
  PartnerSource,
  PartnerStatus,
} from "@/app/generated/prisma/enums";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProspectForm } from "@/modules/crm/hooks/forms";
import { useCreateProspect } from "../hooks/mutations/use-create-prospect";
import { z } from "zod";
import { Options } from "../constants/options-to-frensh";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { crmScemaWithId } from "../types";
import {  crmSchema, crmSchemaWithRef } from "../schemas/prospect";
import { useUpdateProspect } from "../hooks/mutations/use-update-prospect";


export default function ProspectFormUpdate({item,setItem}:{item:z.infer<typeof crmScemaWithId> | null, setItem:React.Dispatch<React.SetStateAction<z.infer<typeof crmScemaWithId> | null>>}) {
    const updateMutate = useUpdateProspect()
    const mutate = useCreateProspect()
    const form= useProspectForm({defaultValues:{
        companyName:item?.companyName || undefined,
        fullName:item?.fullName || "",
        email:item?.email || undefined,
        phone:item?.phone || undefined,
        whatsapp:item?.whatsapp || undefined,
        website:item?.website || undefined,
        address:item?.address || undefined,
        city:item?.city || undefined,
        region:item?.region || undefined,
        country:item?.country || undefined,
        ice:item?.ice || undefined,
        rc:item?.rc || undefined,
        ifNumber:item?.ifNumber || undefined,
        activity:item?.activity || undefined,
        source:item?.source || "OTHER",
        status:item?.status || "NEW",
        priority:item?.priority || "LOW",
        notes:item?.notes || undefined,
        nextFollowUpAt:item?.nextFollowUpAt || undefined,
        companyType:item?.companyType || "INDIVIDUAL",

    }})
    const onSubmit = useCallback((data:z.infer<typeof crmSchema>)=>{
        updateMutate.mutate({...data,reference:item?.reference || ""},{onSuccess:()=>{
            setItem(null)
        }})
    },[updateMutate])
        useEffect(() => {
            if (!item) return;
            form.reset({
                companyName:item?.companyName || undefined,
        fullName:item?.fullName || "",
        email:item?.email || undefined,
        phone:item?.phone || undefined,
        whatsapp:item?.whatsapp || undefined,
        website:item?.website || undefined,
        address:item?.address || undefined,
        city:item?.city || undefined,
        region:item?.region || undefined,
        country:item?.country || undefined,
        ice:item?.ice || undefined,
        rc:item?.rc || undefined,
        ifNumber:item?.ifNumber || undefined,
        activity:item?.activity || undefined,
        source:item?.source || "OTHER",
        status:item?.status || "NEW",
        priority:item?.priority || "LOW",
        notes:item?.notes || undefined,
        nextFollowUpAt:item?.nextFollowUpAt || undefined,
        companyType:item?.companyType || "INDIVIDUAL",
            })

            }, [item,form]);
    return(
        <>
        <form  onSubmit={form.handleSubmit(onSubmit)} id="form">               
             <ScrollArea className="h-[calc(90vh-130px)] overflow-y-auto" >

            <FieldGroup className="p-4 flex flex-col gap-4">
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
                    name="activity"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="activity">Activité</FieldLabel>
                        <Input
                            id="activity"
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
                            <SelectContent>
                            {Object.values(PartnerStatus).map((item) => (
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
            </FieldGroup>                    </ScrollArea>

        </form>
        <DrawerFooter>
            <Button form={"form"} disabled={!form.formState.isValid || mutate.isPending || form.formState.isSubmitting || !form.formState.isDirty}  type="submit">
                {mutate.isPending || form.formState.isSubmitting ? <Spinner />: "Modifier"}
            </Button>
            <DrawerClose asChild>
                <Button variant="outline">Annuler</Button>
            </DrawerClose>
        </DrawerFooter>
        </>
    )
}