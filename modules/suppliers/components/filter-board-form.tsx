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
import { SupplierStatus } from "@/app/generated/prisma/browser";
import { FilterType, SuppliersSchema } from "../types";
import { supplierStatusLabels } from "../constants/options-to-frensh";

export default function FilterBoardForm({data,form}:{data:SuppliersSchema[],form:UseFormReturn<FilterType>}){
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
                                    {Object.values(SupplierStatus).map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {supplierStatusLabels[item]}
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
                    name="country"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="pays">Pays</FieldLabel>
                        <Select value={field.value ?? ""}
                            onValueChange={(value) =>
                                field.onChange(value === "" ? undefined : value)
                            } disabled={!data?.some((i)=>i?.country)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Toutes"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Pays</SelectLabel>
                                    {data.map(({country}) => (
                                        country && (
                                            <SelectItem key={country} value={country}>
                                            {country}
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