"use client"

import { useEffect, useMemo } from "react"
import { Controller, useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GoodsReceiptStatus } from "@/app/generated/prisma/enums"
import { goodsReceiptSchema } from "../schemas/goods-receipt"
import { goodsReceiptLabels } from "../option-goods-receipt"
import { useUpdateGoodsReceipt } from "../hooks/mutations/use-update-goods-receipt"
import type { GoodsReceiptInput, GoodsReceiptRow } from "../types"

export default function GoodsReceiptFormUpdate({
  item,
  setItem,
  onSuccess,
  embedded = false,
}: {
  item: GoodsReceiptRow
  setItem?: React.Dispatch<React.SetStateAction<GoodsReceiptRow | null>>
  onSuccess?: () => void
  embedded?: boolean
}) {
  const initialValues: GoodsReceiptInput = useMemo(() => ({
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
  }), [item])

  const form = useForm<GoodsReceiptInput>({
    resolver: zodResolver(goodsReceiptSchema) as Resolver<GoodsReceiptInput>,
    defaultValues: initialValues,
    mode: "all",
  })
  const mutation = useUpdateGoodsReceipt()

  useEffect(() => {
    form.reset(initialValues)
  }, [form, initialValues])

  const submit = (data: GoodsReceiptInput) => {
    mutation.mutate(
      { id: item.id, data },
      {
        onSuccess: (result) => {
          if (result.success) {
            setItem?.(null)
            onSuccess?.()
          }
        },
      },
    )
  }

  return (
    <>
      <form id="goods-receipt-update-form" onSubmit={form.handleSubmit(submit)}>
        <ScrollArea className="h-[calc(90vh-130px)] overflow-y-auto">
          <FieldGroup className="flex flex-col gap-4 p-4">
            <Field>
              <FieldLabel>Commande d&apos;achat</FieldLabel>
              <Input value={item.purchaseOrder.reference} readOnly />
            </Field>

            <Field>
              <FieldLabel>Fournisseur</FieldLabel>
              <Input value={item.supplier.name} readOnly />
            </Field>

            <Controller
              name="receiptDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldLabel>Date de réception</FieldLabel>
                  <Input
                    type="date"
                    value={field.value ? new Date(field.value).toISOString().slice(0, 10) : ""}
                    onChange={(event) => field.onChange(event.target.value ? new Date(event.target.value) : undefined)}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Field>
              <FieldLabel>Document fournisseur</FieldLabel>
              <Input {...form.register("supplierDocumentRef")} placeholder="BL fournisseur" />
            </Field>

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldLabel>Statut</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange} disabled={item.status !== GoodsReceiptStatus.DRAFT}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {item.status === GoodsReceiptStatus.COMPLETED
                        ? [GoodsReceiptStatus.COMPLETED].map((status) => (
                            <SelectItem key={status} value={status}>{goodsReceiptLabels[status]}</SelectItem>
                          ))
                        : item.status === GoodsReceiptStatus.CANCELLED
                          ? [GoodsReceiptStatus.CANCELLED].map((status) => (
                              <SelectItem key={status} value={status}>{goodsReceiptLabels[status]}</SelectItem>
                            ))
                          : [GoodsReceiptStatus.DRAFT, GoodsReceiptStatus.COMPLETED].map((status) => (
                              <SelectItem key={status} value={status}>{goodsReceiptLabels[status]}</SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Field>
              <FieldLabel>Notes</FieldLabel>
              <Textarea {...form.register("notes")} />
            </Field>
          </FieldGroup>
        </ScrollArea>
      </form>

      {!embedded && (
        <DrawerFooter>
          <Button
            form="goods-receipt-update-form"
            type="submit"
            disabled={
              mutation.isPending ||
              item.status !== GoodsReceiptStatus.DRAFT ||
              !form.formState.isDirty ||
              !form.formState.isValid
            }
          >
            {mutation.isPending ? <Spinner /> : "Modifier"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Annuler</Button>
          </DrawerClose>
        </DrawerFooter>
      )}
    </>
  )
}
