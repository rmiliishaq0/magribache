"use client"

import { Controller, type UseFormReturn } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-picker"
import { PurchaseOrderStatus } from "@/app/generated/prisma/enums"
import type { z } from "zod"
import type { purchaseOrderFilterSchema } from "../schemas/filter-schema"

const statusLabels: Record<PurchaseOrderStatus, string> = {
  DRAFT: "Brouillon",
  SENT: "Envoyée",
  CONFIRMED: "Confirmée",
  PARTIALLY_RECEIVED: "Partiellement reçue",
  RECEIVED: "Reçue",
  CANCELLED: "Annulée",
}

type FilterValues = z.infer<typeof purchaseOrderFilterSchema>
type SupplierOption = { id: number; name: string }

export default function PurchaseOrderFilterForm({
  form,
  suppliers,
}: {
  form: UseFormReturn<FilterValues>
  suppliers: SupplierOption[]
}) {
  return (
    <form>
      <FieldGroup className="flex gap-4 flex-row">
        <Controller name="status" control={form.control} render={({ field, fieldState }) => (
          <Field aria-invalid={fieldState.invalid}>
            <FieldLabel>Statut</FieldLabel>
            <Select value={field.value ?? ""} onValueChange={(value) => field.onChange(value || undefined)}>
              <SelectTrigger><SelectValue placeholder="Tous" /></SelectTrigger>
              <SelectContent><SelectGroup><SelectLabel>Statut</SelectLabel>{Object.values(PurchaseOrderStatus).map((value) => <SelectItem key={value} value={value}>{statusLabels[value]}</SelectItem>)}</SelectGroup></SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
        <Controller name="supplierId" control={form.control} render={({ field, fieldState }) => (
          <Field aria-invalid={fieldState.invalid}>
            <FieldLabel>Fournisseur</FieldLabel>
            <Select value={field.value ? String(field.value) : ""} onValueChange={(value) => field.onChange(value ? Number(value) : undefined)}>
              <SelectTrigger><SelectValue placeholder="Tous" /></SelectTrigger>
              <SelectContent><SelectGroup><SelectLabel>Fournisseur</SelectLabel>{suppliers.map((supplier) => <SelectItem key={supplier.id} value={String(supplier.id)}>{supplier.name}</SelectItem>)}</SelectGroup></SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
        <Controller name="date" control={form.control} render={({ field, fieldState }) => (
          <Field aria-invalid={fieldState.invalid}>
            <FieldLabel>Date</FieldLabel>
            <DatePickerWithRange field={field} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
      </FieldGroup>
    </form>
  )
}
