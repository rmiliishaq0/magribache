import { NextRequest } from "next/server"
import { GoodsReceiptStatus } from "@/app/generated/prisma/enums"
import { goodsReceiptsService } from "@/modules/purchases/services/goods-receipts.service"

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page") ?? 1)
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? 10)
  const status = request.nextUrl.searchParams.get("status") as GoodsReceiptStatus | null
  const supplierIdValue = request.nextUrl.searchParams.get("supplierId")
  const purchaseOrderIdValue = request.nextUrl.searchParams.get("purchaseOrderId")
  const from = request.nextUrl.searchParams.get("from")
  const to = request.nextUrl.searchParams.get("to")

  return Response.json(await goodsReceiptsService.get({
    skip: (page - 1) * limit,
    take: limit,
    status: status ?? undefined,
    supplierId: supplierIdValue ? Number(supplierIdValue) : undefined,
    purchaseOrderId: purchaseOrderIdValue ? Number(purchaseOrderIdValue) : undefined,
    date: { from: from ? new Date(from) : undefined, to: to ? new Date(to) : undefined },
  }))
}
