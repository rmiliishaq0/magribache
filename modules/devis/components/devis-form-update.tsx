import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {useCallback, useEffect,  } from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { devisSchemaWithId, devisWithRefrence } from "../schemas/devis";
import { useDevisForm } from "../hooks/forms/use-devis-form";
import { usePushDevis } from "../hooks/mutations/use-push-devis";
import { DocumentStatus } from "@/app/generated/prisma/browser";
import { documentStatusLabels } from "../constants/options-to-frensh";

const toDate = (value: Date | string | null | undefined) => {
  if (!value) return undefined;

  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
};

export default function DevisFormUpdate({item,setItem}:{item:z.infer<typeof devisWithRefrence> | null, setItem:React.Dispatch<React.SetStateAction<z.infer<typeof devisSchemaWithId> | null>>}) {
    const form= useDevisForm({
                reference :item?.reference || "",
                client: item?.client ||"",
                documentDate: toDate(item?.documentDate),
                status:item?.status || "DRAFT",
                validUntil: toDate(item?.validUntil),
                notes:item?.notes || undefined,
                items:item?.items || []
            })
    const {mutate,isPending} = usePushDevis()

    const onSubmit = useCallback((data:z.infer<typeof devisWithRefrence>)=>{
        console.log(data)
            mutate(data ,{onSuccess:()=>{
            setItem(null)
        }})
    },[mutate])

    useEffect(() => {
  if (!item) return;

  form.reset({
    reference: item.reference ?? "",
    client: item.client ?? "",
    documentDate: toDate(item.documentDate),
    status: item.status ?? "DRAFT",
    validUntil: toDate(item.validUntil),
    notes: item.notes ?? "",
    items: item.items ?? [],
  });
}, [item, form]);
    return(
        <>
        <form
  id="form"
  onSubmit={form.handleSubmit(
    onSubmit,
    (errors) => console.log("❌ FORM VALIDATION:", errors)
  )}
>            
             <ScrollArea className="h-[calc(90vh-130px)] overflow-y-auto" >
                <FieldGroup className="p-4 flex flex-col gap-4">
                <Controller
                    name="documentDate"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field aria-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="objet">Date du devis
                            </FieldLabel>
                            <Input aria-invalid={fieldState.invalid} type="date" id="dateDocument" value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""} onChange={(e) =>
                            field.onChange(
                                e.target.value ? new Date(e.target.value) : undefined
                            )
                            } />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="status"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="Statut">Statut</FieldLabel>
                    <Select value={field.value}  onValueChange={field.onChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a statut" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Statut</SelectLabel>
                                {Object.values(DocumentStatus).map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {documentStatusLabels[item]}
                                    </SelectItem>
                            ))}
                        </SelectGroup>    
                    </SelectContent>
                </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
                    )}
                />
                <Controller
                    name="validUntil"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field aria-invalid={fieldState.invalid} className="col-span-2">
                            <FieldLabel htmlFor="dateDocument">Date de validité
                            </FieldLabel>
                            <Input aria-invalid={fieldState.invalid} type="date" id="dateValidite" value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""} onChange={(e) =>
                            field.onChange(
                                e.target.value ? new Date(e.target.value) : undefined
                            )
                            } />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                name="notes"
                control={form.control}
                render={({field,fieldState}) => (
                    <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="Notes">Notes</FieldLabel>
                        <Textarea id="Notes" {...field} placeholder="Notes...">Notes ...</Textarea>
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