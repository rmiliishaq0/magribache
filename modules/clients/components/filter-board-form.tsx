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
import { crmScemaWithId } from "@/modules/crm/types";
import { filterSchema } from "../schemas/filter";
import { Options } from "@/modules/crm/constants/options-to-frensh";
import { SelectOption } from "../constants/select-option";
import { CompanyType } from "@/app/generated/prisma/browser";
import { memo } from "react";

export default memo(function FilterBoardForm({data,form}:{data:z.infer<typeof crmScemaWithId>[],form:UseFormReturn<z.infer<typeof filterSchema>>
}){    
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
                                    {SelectOption.map((item) => (
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
                    name="companyType"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="source">Type client</FieldLabel>
                        <Select value={field.value ?? ""}
                            onValueChange={(value) =>
                                field.onChange(value === "" ? undefined : value)
                            } >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Toutes"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Source</SelectLabel>
                                    {Object.values(CompanyType).map((item) => (
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
                    name="city"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="ville">Ville</FieldLabel>
                        <Select value={field.value ?? ""}
                            onValueChange={(value) =>
                                field.onChange(value === "" ? undefined : value)
                            } disabled={!data?.some((i)=>i.city)}>
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
                    name="region"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="region">Région</FieldLabel>
                        <Select value={field.value ?? ""}
                                onValueChange={(value) =>
                                    field.onChange(value === "" ? undefined : value)
                                } disabled={!data.some(item => item.region)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Toutes"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Région</SelectLabel>
                                    {data?.map(({region}) => (
                                        region &&(
                                            <SelectItem key={region} value={region || ""}>
                                            {region}
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
})