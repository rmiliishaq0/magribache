"use client"

import { useEffect } from "react"
import { Controller, useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { PurchaseOrderStatus } from "@/app/generated/prisma/enums"
import { useGetSuppliers } from "@/modules/suppliers/hooks/queries/use-get-suppliers"
import { useUpdatePurchaseOrder } from "../hooks/mutations/use-update-purchase-order"
import { purchaseOrderSchema } from "../schemas/purchase-order"
import type { PurchaseOrderInput, PurchaseOrderRow } from "../types"

type SupplierOption = { id: number; name: string }

export default function PurchaseOrderFormUpdate({
  item,
  onSuccess,
}: {
  item: PurchaseOrderRow
  onSuccess: () => void
}) {
  const updateMutation = useUpdatePurchaseOrder()
  const suppliersQuery = useGetSuppliers({ activeFilters: {} })
  const suppliers: SupplierOption[] = suppliersQuery.data?.suppliers?.suppliers ?? []
  const form = useForm<PurchaseOrderInput>({
    resolver: zodResolver(purchaseOrderSchema) as Resolver<PurchaseOrderInput>,
    defaultValues: {
      supplierId: item.supplier.id,
      orderDate: new Date(item.orderDate),
      expectedDate: item.expectedDate ? new Date(item.expectedDate) : undefined,
      status: item.status,
      currency: item.currency,
      paymentTerms: item.paymentTerms ?? undefined,
      notes: item.notes ?? undefined,
      lines: item.lines.map((line) => ({
        productId: line.productId,
        designation: line.designation,
        specification: line.specification ?? undefined,
        quantity: line.quantity,
        unit: line.unit,
        unitPriceHT: line.unitPriceHT,
        taxRate: line.taxRate,
      })),
    },
    mode: "all",
  })

  useEffect(() => {
    form.reset({
      supplierId: item.supplier.id,
      orderDate: new Date(item.orderDate),
      expectedDate: item.expectedDate ? new Date(item.expectedDate) : undefined,
      status: item.status,
      currency: item.currency,
      paymentTerms: item.paymentTerms ?? undefined,
      notes: item.notes ?? undefined,
      lines: item.lines.map((line) => ({
        productId: line.productId,
        designation: line.designation,
        specification: line.specification ?? undefined,
        quantity: line.quantity,
        unit: line.unit,
        unitPriceHT: line.unitPriceHT,
        taxRate: line.taxRate,
      })),
    })
  }, [form, item])

  const onSubmit = (data: PurchaseOrderInput) => {
    updateMutation.mutate({ id: item.id, data }, { onSuccess })
  }

  return (
    <>
      <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className="h-[calc(90vh-130px)] overflow-y-auto">
          <FieldGroup className="flex flex-col gap-4 p-4">
            <Controller
              name="supplierId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldLabel>Fournisseur</FieldLabel>
                  <Combobox
                    items={suppliers.map((supplier) => supplier.name)}
                    value={suppliers.find((supplier) => supplier.id === field.value)?.name ?? item.supplier.name}
                    onValueChange={(name: string | null) => field.onChange(suppliers.find((supplier) => supplier.name === name)?.id)}
                  >
                    <ComboboxInput className="w-full" placeholder="Choisir un fournisseur" />
                    <ComboboxContent>
                      <ComboboxEmpty>Aucun fournisseur trouvé.</ComboboxEmpty>
                      <ComboboxList>{(name) => <ComboboxItem key={name} value={name}>{name}</ComboboxItem>}</ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="orderDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldLabel>Date</FieldLabel>
                  <Input type="date" value={field.value.toISOString().slice(0, 10)} onChange={(event) => field.onChange(new Date(event.target.value))} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="expectedDate"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Date prévue</FieldLabel>
                  <Input type="date" value={field.value?.toISOString().slice(0, 10) ?? ""} onChange={(event) => field.onChange(event.target.value ? new Date(event.target.value) : undefined)} />
                </Field>
              )}
            />
            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldLabel>Statut</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{Object.values(PurchaseOrderStatus).map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}</SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field>
              <FieldLabel>Devise</FieldLabel>
              <Input {...form.register("currency")} />
            </Field>
            <Field>
              <FieldLabel>Conditions de paiement</FieldLabel>
              <Input {...form.register("paymentTerms")} />
            </Field>
            <Field>
              <FieldLabel>Notes</FieldLabel>
              <Textarea {...form.register("notes")} />
            </Field>
          </FieldGroup>
        </ScrollArea>
      </form>
      <DrawerFooter>
        <Button form="form" disabled={!form.formState.isDirty || !form.formState.isValid || updateMutation.isPending} type="submit">
          {updateMutation.isPending ? <Spinner /> : "Modifier"}
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Annuler</Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  )
}
