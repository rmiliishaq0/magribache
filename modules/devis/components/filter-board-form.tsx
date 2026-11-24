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
import { filterSchema } from "@/modules/devis/schemas/devis-filter-schema";
import { DocumentStatus } from "@/app/generated/prisma/browser";
import { documentStatusLabels } from "@/modules/devis/constants/options-to-frensh";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { CLientWithDevis } from "../types";


export default function FilterBoardForm({data,form}:{data:CLientWithDevis[],form:UseFormReturn<z.infer<typeof filterSchema>>}){
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
                    name="client"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="client">Client</FieldLabel>
                        <Combobox virtualized  value={field.value ?? ""} onValueChange={(value) =>
                                field.onChange(value === "" || value == null ? undefined : value)} items={ data.map((i)=>i?.fullName) || [] } >
                            <ComboboxInput  aria-invalid={fieldState.invalid} placeholder="Toutes" showClear  disabled={!data?.some((i)=>i?.fullName)}/>
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
                    name="city"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="ville">Ville</FieldLabel>
                        <Select value={field.value ?? ""}
                            onValueChange={(value) =>
                                field.onChange(value === "" ? undefined : value)
                            } disabled={!data?.some((i)=>i?.city)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Toutes"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Ville</SelectLabel>
                                    {data.map(({city}) => (
                                        city && (
                                            <SelectItem key={city} value={city}>
                                            {city}
                                        </SelectItem>
                                        )
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                            </Select>
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