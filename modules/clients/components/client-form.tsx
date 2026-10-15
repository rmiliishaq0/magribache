import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import React, { SetStateAction, useCallback } from "react";
import { Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useProspectForm } from "@/modules/crm/hooks/forms";
import { z } from "zod";
import { crmSchema } from "@/modules/crm/schemas/prospect";
import { useCreateClient } from "../hooks/mutations/use-create-client";


export default function ClientForm({setIsOpen}:{setIsOpen:React.Dispatch<SetStateAction<boolean>>}){
    const mutate = useCreateClient()
    const form= useProspectForm({})
    
    const onSubmit = useCallback((data:z.infer<typeof crmSchema>)=>{
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