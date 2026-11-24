"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Controller } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { useSupplierForm } from "../hooks/forms/use-supplier-form"
import { useUpdateSupplier } from "../hooks/mutations/use-update-supplier"
import { fields, supplierStatusLabels } from "../constants/options-to-frensh"
import { SupplierStatus } from "@/app/generated/prisma/enums"
import type { SuppliersSchema } from "../types"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetProducts } from "@/modules/products/hooks/queries/use-get-products"


export default function SupplierInfo({ supplier }: { supplier: SuppliersSchema }) {
  const [isEditing, setIsEditing] = useState(false)
  const form = useSupplierForm({ defaultValues: supplier })
  const mutate = useUpdateSupplier()
  const anchor = useComboboxAnchor()
  const { data } = useGetProducts({})
  const products = useMemo(() => data?.products?.products || [], [data])

  useEffect(() => {
    form.reset(supplier)
  }, [form, supplier])

  const onSubmit = useCallback((data: SuppliersSchema) => {
    mutate.mutate(data, { onSuccess: () => setIsEditing(false) })
  }, [mutate])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold text-secondary">Informations fournisseur</CardTitle>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>Modifier</Button>
        ) : (
          <div className="flex gap-2">
            <Button
              form="supplier-form"
              type="submit"
              disabled={!form.formState.isDirty || !form.formState.isValid || mutate.isPending}
            >
              {mutate.isPending ? <Spinner /> : "Enregistrer"}
            </Button>
            <Button variant="outline" onClick={() => { form.reset(supplier); setIsEditing(false) }}>
              Annuler
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form id="supplier-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
              {fields.map(([name, label]) => {
                const field = form.register(name, {
                  setValueAs: name === "deliveryDelayDays"
                    ? (value: string) => value === "" ? undefined : Number(value)
                    : undefined,
                })
                return (
                  <Field key={name}>
                    <FieldLabel htmlFor={name}>{label}</FieldLabel>
                    <Input
                      id={name}
                      type={name === "email" ? "email" : name === "deliveryDelayDays" ? "number" : "text"}
                      {...field}
                      value={form.watch(name) ?? ""}
                    />
                  </Field>
                )
              })}
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field aria-invalid={fieldState.invalid}>
                    <FieldLabel>Statut</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Choisir un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(SupplierStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {supplierStatusLabels[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="products"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field aria-invalid={fieldState.invalid} className="md:col-span-3">
                    <FieldLabel htmlFor="products">Produits</FieldLabel>
                    <Combobox
                      multiple
                      autoHighlight
                      virtualized
                      value={field.value ?? []} 
                      onValueChange={(value) => field.onChange(value.length == 0 || value == null ? [] : value)} 
                      items={products}
                    >
                      <ComboboxChips ref={anchor} className="w-full">
                        <ComboboxValue>
                          {(values) => (
                            <React.Fragment>
                              {values.map((value: string) => (
                                <ComboboxChip key={value}>{value}</ComboboxChip>
                              ))}
                              <ComboboxChipsInput />
                            </React.Fragment>
                          )}
                        </ComboboxValue>
                      </ComboboxChips>
                      <ComboboxContent anchor={anchor}>
                        <ComboboxEmpty>Aucun produit trouvé.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item.reference} value={item.reference}>
                              {item.name}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Field className="md:col-span-3">
                <FieldLabel htmlFor="notes">Notes</FieldLabel>
                <Textarea id="notes" {...form.register("notes")} />
              </Field>
            </FieldGroup>
          </form>
        ) : (
          <dl className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
            {fields.map(([name, label]) => (
              <div key={name}>
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="font-medium">{String(supplier[name as keyof SuppliersSchema] ?? "-")}</dd>
              </div>
            ))}
            <div>
              <dt className="text-sm text-muted-foreground">Statut</dt>
              <dd className="font-medium">{supplierStatusLabels[supplier.status ?? SupplierStatus.ACTIVE]}</dd>
            </div>
            <div className="md:col-span-3">
              <dt className="text-sm text-muted-foreground">Notes</dt>
              <dd className="whitespace-pre-wrap font-medium">{supplier.notes || "-"}</dd>
            </div>
          </dl>
        )}
      </CardContent>
    </Card>
  )
}
