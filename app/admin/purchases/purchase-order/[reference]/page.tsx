import { Card, CardContent } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { ProspectHistorique } from "@/modules/crm/components/prospect-historique"
import { getPurchaseOrder } from "@/modules/purchases/actions/get-purchase-order"
import PurchaseOrderHeader from "@/modules/purchases/components/purchase-order-header"
import PurchaseOrderDetailSections from "@/modules/purchases/components/purchase-order-detail-sections"

export default async function PurchaseOrder({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params
  if (!reference) notFound()

  const result = await getPurchaseOrder(reference)
  if (!result.success || !result.purchaseOrder) notFound()

  const data = result.purchaseOrder
  return (
    <Card className="mb-6">
      <CardContent className=" space-y-6 ">
        <PurchaseOrderHeader order={data} />
        <PurchaseOrderDetailSections
          order={{
            ...data,
            lines: data.lines.map((line) => ({
              ...line,
              specification: line.specification ?? undefined,
            })),
            notes: data.notes ?? undefined,
            paymentTerms: data.paymentTerms ?? undefined,
            expectedDate: data.expectedDate ?? null,
          }}
        />

        <ProspectHistorique activities={data.activities} />
      </CardContent>
    </Card>
  )
}
