"use client"
import { Controller, type UseFormReturn } from "react-hook-form"
import { Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-picker"
import { GoodsReceiptStatus } from "@/app/generated/prisma/enums"
import type { z } from "zod"
import type { goodsReceiptFilterSchema } from "../schemas/goods-receipt-filter-schema"
import { goodsReceiptLabels } from "../option-goods-receipt"

export default function GoodsReceiptFilterForm({
  form,
  suppliers,
}: {
  form: UseFormReturn<z.infer<typeof goodsReceiptFilterSchema>>
  suppliers: Array<{ id: number; name: string }>
}) {
  return (
    <form>
      <div className="flex flex-row gap-4">
        <Controller name="status" control={form.control} render={({ field }) => (
          <Field>
            <FieldLabel>Statut</FieldLabel>
            <Select value={field.value ?? ""} onValueChange={(value) => field.onChange(value || undefined)}>
              <SelectTrigger><SelectValue placeholder="Tous" /></SelectTrigger>
              <SelectContent>
                <SelectGroup><SelectLabel>Statut</SelectLabel>
                  {Object.values(GoodsReceiptStatus).map((value) => <SelectItem key={value} value={value}>{goodsReceiptLabels[value]}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="supplierId" control={form.control} render={({ field }) => (
          <Field>
            <FieldLabel>Fournisseur</FieldLabel>
            <Select value={field.value ? String(field.value) : ""} onValueChange={(value) => field.onChange(value ? Number(value) : undefined)}>
              <SelectTrigger><SelectValue placeholder="Tous" /></SelectTrigger>
              <SelectContent>
                <SelectGroup><SelectLabel>Fournisseur</SelectLabel>
                  {suppliers.map((supplier) => <SelectItem key={supplier.id} value={String(supplier.id)}>{supplier.name}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Controller name="date" control={form.control} render={({ field }) => (
          <Field>
            <FieldLabel>Date</FieldLabel>
            <DatePickerWithRange field={field} />
          </Field>
        )} />
      </div>
    </form>
  )
}
