"use client"

import { useEffect, useMemo } from "react"
import { useFieldArray, useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { PurchaseOrderStatus, StockUnit } from "@/app/generated/prisma/enums"
import { purchaseOrderSchema } from "../schemas/purchase-order"
import { useCreatePurchaseOrder } from "../hooks/mutations/use-create-purchase-order"
import { useUpdatePurchaseOrder } from "../hooks/mutations/use-update-purchase-order"
import { useGetSuppliers } from "@/modules/suppliers/hooks/queries/use-get-suppliers"
import { useGetProducts } from "@/modules/products/hooks/queries/use-get-products"
import type { PurchaseOrderInput, PurchaseOrderRow } from "../types"

type SupplierOption = { id: number; name: string }
type ProductOption = { id: number; name: string }

export default function PurchaseOrderForm({ onSuccess, item, embedded = false }: { onSuccess: () => void; item?: PurchaseOrderRow; embedded?: boolean }) {
  const initialValues: PurchaseOrderInput = item ? {
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
  } : {
    supplierId: 0,
    orderDate: new Date(),
    status: PurchaseOrderStatus.DRAFT,
    currency: "MAD",
    lines: [{ productId: 0, designation: "", quantity: 1, unit: StockUnit.PIECE, unitPriceHT: 0, taxRate: 20 }],
  }
  const form = useForm<PurchaseOrderInput>({
    resolver: zodResolver(purchaseOrderSchema) as Resolver<PurchaseOrderInput>,
    defaultValues: initialValues,
    mode: "all",
  })
  const lines = useFieldArray({ control: form.control, name: "lines" })
  const mutation = useCreatePurchaseOrder()
  const updateMutation = useUpdatePurchaseOrder()
  const suppliersQuery = useGetSuppliers({ activeFilters: {} })
  const productsQuery = useGetProducts({ activeFilters: {} })
  const suppliers: SupplierOption[] = suppliersQuery.data?.suppliers?.suppliers ?? []
  const products: ProductOption[] = productsQuery.data?.products?.products ?? []
  const supplierNames = suppliers.map((supplier) => supplier.name)
  const productNames = products.map((product) => product.name)
  const watchedLines = form.watch("lines")
  const totals = useMemo(() => watchedLines.reduce((sum, line) => {
    const ht = Number(line.quantity || 0) * Number(line.unitPriceHT || 0)
    const tax = ht * Number(line.taxRate || 0) / 100
    return { ht: sum.ht + ht, tax: sum.tax + tax }
  }, { ht: 0, tax: 0 }), [watchedLines])
  useEffect(() => {
    if (item) form.reset(initialValues)
  }, [item, form])

  const submit = (data: PurchaseOrderInput) => {
    const handleSuccess = (result: { success: boolean }) => result.success && onSuccess()
    if (item) updateMutation.mutate({ id: item.id, data }, { onSuccess: handleSuccess })
    else mutation.mutate(data, { onSuccess: handleSuccess })
  }

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={form.handleSubmit(submit)}>
      <ScrollArea className={embedded ? "w-full" : "max-h-[calc(80vh-8rem)] w-full"}>
      <div className="pr-4 pb-4">
      <FieldGroup className="grid min-w-0 grid-cols-2 gap-4 items-center justify-center relative">
        <Controller name="supplierId" control={form.control} render={({ field, fieldState }) => (
          <Field aria-invalid={fieldState.invalid} className="sm:col-span-2">
            <FieldLabel>Fournisseur</FieldLabel>
            <Combobox items={supplierNames} virtualized value={suppliers.find((supplier: SupplierOption) => supplier.id === field.value)?.name ?? null} onValueChange={(name: string | null) => field.onChange(suppliers.find((supplier: SupplierOption) => supplier.name === name)?.id)}>
              <ComboboxInput className="w-full" placeholder="Choisir un fournisseur" showClear />
              <ComboboxContent><ComboboxEmpty>Aucun fournisseur trouvé.</ComboboxEmpty><ComboboxList>{(name) => <ComboboxItem key={name} value={name}>{name}</ComboboxItem>}</ComboboxList></ComboboxContent>
            </Combobox>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
        <Controller name="orderDate" control={form.control} render={({ field }) => <Field><FieldLabel>Date</FieldLabel><Input type="date" value={field.value.toISOString().slice(0, 10)} onChange={(event) => field.onChange(new Date(event.target.value))} /></Field>} />
        <Controller name="expectedDate" control={form.control} render={({ field }) => <Field><FieldLabel>Date prévue</FieldLabel><Input type="date" value={field.value?.toISOString().slice(0, 10) ?? ""} onChange={(event) => field.onChange(event.target.value ? new Date(event.target.value) : undefined)} /></Field>} />
        <Controller name="status" control={form.control} render={({ field }) => <Field><FieldLabel>Statut</FieldLabel><Select value={field.value} onValueChange={field.onChange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.values(PurchaseOrderStatus).map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select></Field>} />
        <Field><FieldLabel>Devise</FieldLabel><Input {...form.register("currency")} /></Field>
      </FieldGroup>
      <div className="space-y-4 py-4">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2"><h3 className="font-semibold">Lignes de commande</h3><Button type="button" className="shrink-0" variant="outline" onClick={() => lines.append({ productId: 0, designation: "", quantity: 1, unit: StockUnit.PIECE, unitPriceHT: 0, taxRate: 20 })}>Ajouter une ligne</Button></div>
        {lines.fields.map((line, index) => (
          <div className="grid min-w-0 grid-cols-1 gap-3 rounded-lg border p-3 sm:grid-cols-2 md:grid-cols-6" key={line.id}>
            <Controller name={`lines.${index}.productId`} control={form.control} render={({ field }) => <Field className="sm:col-span-2"><FieldLabel>Produit</FieldLabel><Combobox items={productNames} virtualized value={products.find((product: ProductOption) => product.id === field.value)?.name ?? null} onValueChange={(name: string | null) => { const product = products.find((item: ProductOption) => item.name === name); field.onChange(product?.id); form.setValue(`lines.${index}.designation`, name ?? "") }}><ComboboxInput className="w-full" placeholder="Choisir un produit" /><ComboboxContent><ComboboxEmpty>Aucun produit trouvé.</ComboboxEmpty><ComboboxList>{(name: string) => <ComboboxItem key={name} value={name}>{name}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox></Field>} />
            <Field><FieldLabel>Quantité</FieldLabel><Input type="number" step="0.001" {...form.register(`lines.${index}.quantity`, { valueAsNumber: true })} /></Field>
            <Controller name={`lines.${index}.unit`} control={form.control} render={({ field }) => <Field><FieldLabel>Unité</FieldLabel><Select value={field.value} onValueChange={field.onChange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.values(StockUnit).map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select></Field>} />
            <Field><FieldLabel>Prix HT</FieldLabel><Input type="number" step="0.01" {...form.register(`lines.${index}.unitPriceHT`, { valueAsNumber: true })} /></Field>
            <Field><FieldLabel>TVA %</FieldLabel><Input type="number" step="0.01" {...form.register(`lines.${index}.taxRate`, { valueAsNumber: true })} /></Field>
            <Button type="button" variant="destructive" className="self-end" disabled={lines.fields.length === 1} onClick={() => lines.remove(index)}>Supprimer</Button>
          </div>
        ))}
      </div>
      <Field ><FieldLabel>Conditions de paiement</FieldLabel><Input {...form.register("paymentTerms")} /></Field>
      <Field><FieldLabel>Notes</FieldLabel><Textarea {...form.register("notes")} /></Field>
      <div className="pt-4 flex flex-wrap justify-end gap-2 font-semibold">HT: {totals.ht.toFixed(2)} {form.watch("currency")} | TVA: {totals.tax.toFixed(2)} | TTC: {(totals.ht + totals.tax).toFixed(2)}</div>
      </div>
      </ScrollArea>
      <div className="pr-4 pt-4">
        <Button type="submit" className="w-full" disabled={mutation.isPending || updateMutation.isPending || !form.formState.isValid}>{mutation.isPending || updateMutation.isPending ? <Spinner /> : item ? "Modifier la commande" : "Créer la commande"}</Button>
      </div>
    </form>
  )
}
