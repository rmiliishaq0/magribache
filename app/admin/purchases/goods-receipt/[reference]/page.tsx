import { Card, CardContent } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { getGoodsReceipt } from "@/modules/purchases/actions/get-goods-receipt"
import GoodsReceiptHeader from "@/modules/purchases/components/goods-receipt-header"
import GoodsReceiptDetailSections from "@/modules/purchases/components/goods-receipt-detail-sections"

export default async function GoodsReceiptPage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params
  if (!reference) notFound()

  const result = await getGoodsReceipt(reference)
  if (!result.success || !result.goodsReceipt) notFound()

  return (
    <Card className="mb-6">
      <CardContent className="space-y-6">
        <GoodsReceiptHeader receipt={result.goodsReceipt} />
        <GoodsReceiptDetailSections receipt={result.goodsReceipt} />
      </CardContent>
    </Card>
  )
}
