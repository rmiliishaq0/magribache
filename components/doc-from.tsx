"use client"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "./ui/select"
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
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form"
import z from "zod"
import { devisSchema } from "@/utils/schema"

export default function DocForm({form,client,onSubmit}:{form:UseFormReturn<z.infer< typeof devisSchema>>,client:any,onSubmit:(data:z.infer<typeof devisSchema>)=>void}) {
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
        <Card className="w-full p-4 ">
            <form id="devis" className="mt-4 flex flex-col gap-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>                
            <h3 className="font-bold text-secondary text-[1rem]">Informations generales</h3>
            <FieldGroup className="grid grid-cols-2">
                <Controller
                    name="client"
                    control={form.control}
                    render={({field ,fieldState}) => (
                        <Field>
                            <FieldLabel aria-invalid={fieldState.invalid} htmlFor="client">Client</FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a client" />
                                </SelectTrigger>
                                <SelectContent>
                                    {client?.map((i:any)=>(
                                        <SelectItem key={i.id} value={i.id}>{i?.entreprise}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="devisDate"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field aria-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="objet">Date du devis
                            </FieldLabel>
                            <Input aria-invalid={fieldState.invalid} type="date" id="dateDocument" {...field} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="dateValidite"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field aria-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="dateDocument">Date de validité
                            </FieldLabel>
                            <Input aria-invalid={fieldState.invalid} type="date" id="dateValidite" {...field}/>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller 
                    name="reference"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field aria-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="reference">Référence</FieldLabel>
                            <Input aria-invalid={fieldState.invalid} type="text" id="reference" placeholder="Référence" {...field}/>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="devise"
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
                    name="statut"
                    control={form.control}
                    render={({field,fieldState})=>(
                        <Field aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="Statut">Statut</FieldLabel>
                    <Select value={field.value}  onValueChange={field.onChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a statut" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="BROUILLON">BROUILLON</SelectItem>
                        <SelectItem value="ENVOYE">ENVOYE</SelectItem>
                        <SelectItem value="PAYE">PAYE</SelectItem>
                        <SelectItem value="ANNULE">ANNULE</SelectItem>
                    </SelectContent>
                </Select>
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
            article:"",
            quantity:1,
            unitPrice:0,
            tax:20
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
                    <TableRow>
                        <TableCell>{i+1}</TableCell>
                        <TableCell>
                        <Controller
                            name={`items.${i}.article`}
                            control={form.control}
                            render={({field}) => (
                                <Input
                                    {...field}
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
                        {subtotal?.toFixed(2)} {form.getValues("devise") ?? "MAD"}
                    </h3>
                </div>
                <Separator orientation="vertical"/>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-secondary block">TVA(20%)</span>
                    <h3 className="font-semibold text-lg">{totalTax?.toFixed(2)} {form.getValues("devise") ?? "MAD"}</h3>
                </div>
                <Separator orientation="vertical"/>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-secondary block">Total TTC</span>
                    <h3 className="font-semibold text-lg">{total?.toFixed(2)} {form.getValues("devise") ?? "MAD"}</h3>
                </div>
            </div>
            </form>
        </Card>
    )
}