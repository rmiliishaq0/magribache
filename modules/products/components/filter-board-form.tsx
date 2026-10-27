import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-picker";
import { z } from "zod";
import { ProductStatus,  ProductType } from "@/app/generated/prisma/browser";
import { Options } from "../constants/select-option";
import { filterSchema } from "../schemas/filter";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Fournisseur } from "../types";

export default function FilterBoardForm({data,form}:{data:Fournisseur[],form:UseFormReturn<z.infer<typeof filterSchema>>}){
    return(
        <form>
            <FieldGroup className="flex gap-4 flex-row">
                <Controller
                    name="statut"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="statut">Statut</FieldLabel>
                        <Select value={field.value ?? ""}
                                onValueChange={(value) =>
                                    field.onChange(value === "" ? undefined : value)
                                }>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Tous"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Statut</SelectLabel>
                                    {Object.values(ProductStatus).map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {Options[item as keyof typeof Options]}
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
                    name="type"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="type">Type</FieldLabel>
                        <Select value={field.value ?? ""}
                            onValueChange={(value) =>
                                field.onChange(value === "" ? undefined : value)
                            } >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Toutes"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Type</SelectLabel>
                                    {Object.values(ProductType).map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {Options[item]}
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
                    name="fournisseur"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="fournisseur">Fournisseur</FieldLabel>
                        <Combobox virtualized  value={field.value ?? ""} onValueChange={(value) =>
                                field.onChange(value === "" || value == null ? undefined : value)} items={ data.map((i)=>i?.name) || [] } >
                            <ComboboxInput  aria-invalid={fieldState.invalid} placeholder="Toutes" showClear  disabled={!data?.some((i)=>i?.name)}/>
                            <ComboboxContent>
                                <ComboboxEmpty>Aucun article trouvé.</ComboboxEmpty>
                                <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item} value={item}>
                                    {item}
                                    </ComboboxItem>
                                )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />
                     <Controller
                    name="date"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="date">Date</FieldLabel>
                        <DatePickerWithRange field={field}/>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />


            </FieldGroup>
        </form>
    )
}