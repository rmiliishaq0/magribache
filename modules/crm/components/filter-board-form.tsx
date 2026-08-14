import { useCallback } from "react";
import { useFilterBoard } from "../hooks/forms";
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
import { PartnerPriority, PartnerSource, PartnerStatus } from "@/app/generated/prisma/enums";
import { DatePickerWithRange } from "@/components/date-picker";
import { Options } from "../constants/options-to-frensh";
import { z } from "zod";
import { crmScemaWithId } from "../types";
import { filterSchema } from "../schemas/filter";

export default function FilterBoardForm({data,form}:{data:z.infer<typeof crmScemaWithId>[],form:UseFormReturn<z.infer<typeof filterSchema>>}){
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
                                    {Object.values(PartnerStatus).map((item) => (
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
                    name="source"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="source">Source</FieldLabel>
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
                                    {Object.values(PartnerSource).map((item) => (
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
                            } disabled={!data?.some((i)=>i.region)}>
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

                     <Controller
                    name="priority"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="priority">Priorité</FieldLabel>
                        <Select value={field.value ?? ""}
  onValueChange={(value) =>
    field.onChange(value === "" ? undefined : value)
  } >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Toutes"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Priorité</SelectLabel>
                                    {Object.values(PartnerPriority).map((item) => (
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

            </FieldGroup>
        </form>
    )
}