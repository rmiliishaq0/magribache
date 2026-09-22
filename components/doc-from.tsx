"use client"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectGroup } from "./ui/select"
import { Card } from "./ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { closestCenter, DndContext } from "@dnd-kit/core"
import { Plus, TrashIcon } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { Separator } from "./ui/separator"
import { Controller, useFieldArray } from "react-hook-form"
import z from "zod"
import { DocFormProps } from "@/modules/devis/types";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { DocumentStatus } from "@/app/generated/prisma/browser";
import { documentStatusLabels } from "@/modules/devis/constants/options-to-frensh";


export default function DocForm({form,clients,onSubmit}:DocFormProps) {
    const { fields, append, remove } = useFieldArray({
        control:form.control,
        name:"items"
    })
    
    
    const items = form.watch("items")
    const subtotal = items?.reduce((acc, item) => {
        return acc + (
            Number(item.quantity || 0) *
            Number(item.unitPrice || 0)
        )
    }, 0)

    const totalTax = items?.reduce((acc, item) => {
        return acc + (
            Number(item.quantity || 0) *
            Number(item.unitPrice || 0) *
            Number(item.tax || 0) / 100
        )
    }, 0)

    const total = subtotal + totalTax

    return (
        <Card className="p-6 flex-1 border border-bg">
            <form id="devis" className="mt-4 flex flex-col gap-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>                
            <h3 className="font-bold text-secondary text-[1rem]">Informations generales</h3>
            <FieldGroup className="grid grid-cols-2">
                <Controller
                    name="client"
                    control={form.control}
                    render={({ field, fieldState }) => {
                            const selectedClient = clients?.find((client) => client.value === field.value) ?? null;
                        return(
                        <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="client">Client</FieldLabel>

                        <Combobox
                            virtualized
                            value={selectedClient}
                            onValueChange={(value) => {
                            field.onChange(value || "");
                            }}
                            items={clients ?? []}
                            >
                            <ComboboxInput
                                aria-invalid={fieldState.invalid}
                                placeholder="Toutes"
                                showClear
                                disabled={!clients?.length}
                            />

                            <ComboboxContent>
                            <ComboboxEmpty>Aucun client trouvé.</ComboboxEmpty>

                            <ComboboxList>
                                {(item) => (
                                <ComboboxItem key={item.value} value={item.value}>
                                    {item.label}
                                </ComboboxItem>
                                )}
                            </ComboboxList>
                            </ComboboxContent>
                        </Combobox>

                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        </Field>
                    )}}
                    />
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
                    name="currency"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="Devise">Devise</FieldLabel>
                    <Select value={field.value}             onValueChange={field.onChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a devise" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="MAD">MAD</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                </Select>
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
            </FieldGroup>
            <FieldGroup className="mt-6">
                <div className="flex flex-row gap-4 justify-between items-center">
                    <h3 className="font-bold text-secondary text-[1rem]">Articles / Produits</h3>
                    <Button onClick={() =>
        append({
            product:"",
            quantity:1,
            unitPrice:0,
            tax:20
        },
  {
    shouldFocus: true,
    focusIndex: fields.length,
  })
    } size={"sm"} className="cursor-pointer"><Plus/> Ajouter Un Article</Button>
                </div>
                <div className="overflow-hidden rounded-lg border">
                <DndContext
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis]}
                    //={handleDragEnd}
                    //sensors={sensors}
                    //id={sortableId}
                    
                >
            <Table >
              <TableHeader className="sticky top-0 z-10 bg-muted">
                  <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Article</TableHead>
                        <TableHead>Qte</TableHead>
                        <TableHead>PU</TableHead>
                        <TableHead>TVA</TableHead>
                        <TableHead/>
                        {/*<TableHead>Total</TableHead>*/}
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {fields.map((f,i)=>(
                    <TableRow key={f.id}>
                        <TableCell>{i+1}</TableCell>
                        <TableCell>
                        <Controller
                            name={`items.${i}.product`}
                            control={form.control}
                            render={({field}) => (
                                <Input

                                    {...field}
                                    ref={field.ref}
                                    type="text"
                                    placeholder="Article"
                                />
                            )}
                        />
                    </TableCell>
                    <TableCell>
                    <Controller
                        name={`items.${i}.quantity`}
                        control={form.control}
                        render={({field}) => (
                            <Input
                                {...field}
                                type="number"
                                placeholder="Qte"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        )}
                    />
                </TableCell>
                    <TableCell>
                        <Controller
                            name={`items.${i}.unitPrice`}
                            control={form.control}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    type="number"
                                    placeholder="PU"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            )}
                        />
                    </TableCell>
                    <TableCell>
                        <Controller
                            name={`items.${i}.tax`}
                            control={form.control}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    type="number"
                                    placeholder="TVA"
                                     onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            )}
                        />
                    </TableCell>
                    <TableCell>
                        <Button
                            type="button"
                            variant={"destructive"}
                            className="cursor-pointer"
                            onClick={() => remove(i)}
                        >
                            <TrashIcon/>
                        </Button>
                    </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            </DndContext>
            </div>
            </FieldGroup>
            <FieldGroup className="mt-6">
                <h3 className="font-bold text-secondary text-[1rem]">Notes</h3>
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
            <div className="mt-6 bg-muted flex flex-row flex-wrap gap-4 justify-center items-center p-4 rounded-xl">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-secondary block">Sous-total HT</span>
                    <h3 className="font-semibold text-lg">
                        {subtotal?.toFixed(2)} {form.getValues("currency") ?? "MAD"}
                    </h3>
                </div>
                <Separator orientation="vertical"/>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-secondary block">TVA(20%)</span>
                    <h3 className="font-semibold text-lg">{totalTax?.toFixed(2)} {form.getValues("currency") ?? "MAD"}</h3>
                </div>
                <Separator orientation="vertical"/>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-secondary block">Total TTC</span>
                    <h3 className="font-semibold text-lg">{total?.toFixed(2)} {form.getValues("currency") ?? "MAD"}</h3>
                </div>
            </div>
            </form>
        </Card>
    )
}