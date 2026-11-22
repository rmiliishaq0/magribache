"use client"

import { useEffect, useMemo } from "react"
import { Controller, useFieldArray, useForm, useWatch, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GoodsReceiptStatus, StockUnit } from "@/app/generated/prisma/enums"
import { goodsReceiptSchema } from "../schemas/goods-receipt"
import { goodsReceiptLabels } from "../option-goods-receipt"
import { useGetPurchaseOrders } from "../hooks/queries/use-get-purchase-orders"
import { useCreateGoodsReceipt } from "../hooks/mutations/use-create-goods-receipt"
import { useUpdateGoodsReceipt } from "../hooks/mutations/use-update-goods-receipt"
import type { GoodsReceiptInput, GoodsReceiptRow, PurchaseOrderRow } from "../types"

export default function GoodsReceiptForm({
  onSuccess,
  item,
  embedded = false,
}: {
  onSuccess: () => void
  item?: GoodsReceiptRow
  embedded?: boolean
}) {
  const initialValues: GoodsReceiptInput = useMemo(() => item ? {
    purchaseOrderId: item.purchaseOrderId,
    receiptDate: new Date(item.receiptDate),
    supplierDocumentRef: item.supplierDocumentRef ?? undefined,
    status: item.status,
    notes: item.notes ?? undefined,
    lines: item.lines.map((line) => ({
      purchaseOrderLineId: line.purchaseOrderLineId,
      productId: line.productId,
      quantityReceived: line.quantityReceived,
      unit: line.unit,
      unitPriceHT: line.unitPriceHT ?? undefined,
      lotNumber: line.lotNumber ?? undefined,
      qualityChecked: line.qualityChecked,
      qualityStatus: line.qualityStatus ?? undefined,
      notes: line.notes ?? undefined,
    })),
  } : {
    purchaseOrderId: 0,
    receiptDate: new Date(),
    status: GoodsReceiptStatus.DRAFT,
    lines: [],
  }, [item])

  const form = useForm<GoodsReceiptInput>({
    resolver: zodResolver(goodsReceiptSchema) as Resolver<GoodsReceiptInput>,
    defaultValues: initialValues,
    mode: "all",
  })
  const lines = useFieldArray({ control: form.control, name: "lines" })
  const ordersQuery = useGetPurchaseOrders({ page: 1, limit: 100, activeFilters: {} })
  const orders: PurchaseOrderRow[] = useMemo(
    () => ordersQuery.data?.purchaseOrders ?? [],
    [ordersQuery.data],
  )
  const createMutation = useCreateGoodsReceipt()
  const updateMutation = useUpdateGoodsReceipt()
  const purchaseOrderId = useWatch({ control: form.control, name: "purchaseOrderId" })
  const selectedOrder = useMemo(
    () => orders.find((order) => order.id === purchaseOrderId),
    [orders, purchaseOrderId],
  )
  useEffect(() => {
    if (item) form.reset(initialValues)
  }, [item, form, initialValues])

  const onOrderChange = (reference: string | null) => {
    const order = orders.find((item) => item.reference === reference)
    form.setValue("purchaseOrderId", order?.id ?? 0)
    lines.replace((order?.lines ?? [])
      .filter((line) => Number(line.quantity) > Number(line.receivedQuantity) + 0.0001)
      .map((line) => ({
        purchaseOrderLineId: line.id,
        productId: line.productId,
        quantityReceived: Math.max(
          0,
          Number(line.quantity) - Number(line.receivedQuantity),
        ),
        unit: line.unit,
        unitPriceHT: line.unitPriceHT,
        qualityChecked: false,
      })))
  }

  const submit = (data: GoodsReceiptInput) => {
    const handleSuccess = (result: { success: boolean }) => result.success && onSuccess()
    if (item) updateMutation.mutate({ id: item.id, data }, { onSuccess: handleSuccess })
    else createMutation.mutate(data, { onSuccess: handleSuccess })
  }

  return (
    <>
    <form id="goods-receipt-form" className="flex w-full flex-col gap-4" onSubmit={form.handleSubmit(submit)}>
      <ScrollArea className={embedded ? "h-[calc(90vh-130px)] w-full" : "max-h-[calc(80vh-8rem)] w-full"}>
        <div className="pr-4 pb-4">
          <FieldGroup className={embedded ? "flex flex-col gap-4 p-4" : "grid grid-cols-1 gap-4 md:grid-cols-2"}>
            <Controller name="purchaseOrderId" control={form.control} render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>Commande d&apos;achat</FieldLabel>
                <Select
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(value) => onOrderChange(orders.find((order) => String(order.id) === value)?.reference ?? null)}
                  disabled={item ? item.status !== GoodsReceiptStatus.DRAFT : ordersQuery.isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={ordersQuery.isPending ? "Chargement des commandes..." : "Choisir une commande"} />
                  </SelectTrigger>
                  <SelectContent>
                    {orders.filter((order) => !["RECEIVED", "CANCELLED"].includes(order.status)).length === 0 ? (
                      <SelectItem value="none" disabled>
                        {ordersQuery.isPending ? "Chargement..." : "Aucune commande disponible"}
                      </SelectItem>
                    ) : (
                      orders
                        .filter((order) => !["RECEIVED", "CANCELLED"].includes(order.status))
                        .map((order) => (
                          <SelectItem key={order.id} value={String(order.id)}>
                            {order.reference}
                          </SelectItem>
                        ))
                    )}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )} />
            <Controller name="receiptDate" control={form.control} render={({ field }) => (
              <Field>
                <FieldLabel>Date de réception</FieldLabel>
                <Input type="date" value={field.value.toISOString().slice(0, 10)} onChange={(event) => field.onChange(new Date(event.target.value))} />
              </Field>
            )} />
            <Field>
              <FieldLabel>Document fournisseur</FieldLabel>
              <Input {...form.register("supplierDocumentRef")} placeholder="BL fournisseur" />
            </Field>
            <Controller name="status" control={form.control} render={({ field }) => (
              <Field>
                <FieldLabel>Statut</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger disabled={item?.status !== GoodsReceiptStatus.DRAFT}><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {item?.status === GoodsReceiptStatus.CANCELLED
                      ? [GoodsReceiptStatus.CANCELLED].map((status) => (
                        <SelectItem key={status} value={status}>{goodsReceiptLabels[status]}</SelectItem>
                      ))
                      : item?.status === GoodsReceiptStatus.COMPLETED
                        ? [GoodsReceiptStatus.COMPLETED].map((status) => (
                          <SelectItem key={status} value={status}>{goodsReceiptLabels[status]}</SelectItem>
                        ))
                        : [GoodsReceiptStatus.DRAFT, GoodsReceiptStatus.COMPLETED].map((status) => (
                      <SelectItem key={status} value={status}>{goodsReceiptLabels[status]}</SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </Field>
            )} />
          </FieldGroup>

          {!item && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Lignes réceptionnées</h3>
                {selectedOrder && (
                  <span className="text-sm text-muted-foreground">
                    {lines.fields.length} ligne{lines.fields.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              {!selectedOrder && !item && (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  Sélectionnez une commande d&apos;achat pour charger ses lignes.
                </div>
              )}
              {lines.fields.map((line, index) => {
              const orderLine = selectedOrder?.lines.find((orderLine) => orderLine.id === line.purchaseOrderLineId)
              const quantityOrdered = Number(orderLine?.quantity ?? 0)
              const receivedBefore = Number(orderLine?.receivedQuantity ?? 0)
              const remainingBefore = Math.max(0, quantityOrdered - receivedBefore)
              return (
              <div key={line.id} className="rounded-lg border p-4">
                <div className="mb-3">
                  <p className="font-semibold text-secondary">{orderLine?.designation ?? "Produit"}</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="rounded-md bg-muted/40 p-2 text-center text-xs">
                      <p className="text-muted-foreground">Commandé</p>
                      <p className="text-sm font-semibold">{quantityOrdered}</p>
                    </div>
                    <div className="rounded-md bg-muted/40 p-2 text-center text-xs">
                      <p className="text-muted-foreground">Déjà reçu</p>
                      <p className="text-sm font-semibold">{receivedBefore}</p>
                    </div>
                    <div className="rounded-md bg-muted/40 p-2 text-center text-xs">
                      <p className="text-muted-foreground">Reliquat</p>
                      <p className="text-sm font-semibold">{remainingBefore}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>Quantité reçue</FieldLabel>
                    <Input type="number" step="0.001" max={remainingBefore} {...form.register(`lines.${index}.quantityReceived`, { valueAsNumber: true })} />
                  </Field>
                  <Controller name={`lines.${index}.unit`} control={form.control} render={({ field }) => (
                    <Field>
                      <FieldLabel>Unité</FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{Object.values(StockUnit).map((unit) => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}</SelectContent>
                      </Select>
                    </Field>
                  )} />
                  <Field>
                    <FieldLabel>Prix HT</FieldLabel>
                    <Input type="number" step="0.0001" {...form.register(`lines.${index}.unitPriceHT`, { valueAsNumber: true })} />
                  </Field>
                  <Field>
                    <FieldLabel>Lot</FieldLabel>
                    <Input {...form.register(`lines.${index}.lotNumber`)} />
                  </Field>
                  <Controller name={`lines.${index}.qualityChecked`} control={form.control} render={({ field }) => (
                    <Field>
                      <FieldLabel>Contrôle qualité</FieldLabel>
                      <label className="flex h-9 items-center gap-2 rounded-md border px-3">
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        <span className="text-sm">Qualité vérifiée</span>
                      </label>
                    </Field>
                  )} />
                  <Field>
                    <FieldLabel>État qualité</FieldLabel>
                    <Input {...form.register(`lines.${index}.qualityStatus`)} />
                  </Field>
                  <Field className="sm:col-span-2">
                    <FieldLabel>Notes ligne</FieldLabel>
                    <Input {...form.register(`lines.${index}.notes`)} />
                  </Field>
                </div>
              </div>
              )
            })}
          </div>
          )}

          <Field>
            <FieldLabel>Notes</FieldLabel>
            <Textarea {...form.register("notes")} />
          </Field>
        </div>
      </ScrollArea>
      {!embedded && (
        <div className="pr-4 pt-4">
          <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending || (item?.status !== undefined && item.status !== GoodsReceiptStatus.DRAFT) || !form.formState.isValid}>
            {createMutation.isPending || updateMutation.isPending ? <Spinner /> : item ? "Modifier la réception" : "Créer la réception"}
          </Button>
        </div>
      )}
    </form>
    {embedded && (
      <DrawerFooter>
        <Button
          form="goods-receipt-form"
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending || (item?.status !== undefined && item.status !== GoodsReceiptStatus.DRAFT) || !form.formState.isDirty || !form.formState.isValid}
        >
          {createMutation.isPending || updateMutation.isPending ? <Spinner /> : "Modifier"}
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Annuler</Button>
        </DrawerClose>
      </DrawerFooter>
    )}
    </>
  )
}
