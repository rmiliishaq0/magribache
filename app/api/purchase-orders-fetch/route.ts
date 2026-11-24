import { NextRequest } from "next/server"
import { purchaseOrdersService } from "@/modules/purchases/services/purchase-orders.service"
import { PurchaseOrderStatus } from "@/app/generated/prisma/enums"
export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page") ?? 1)
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? 10)
  const status = request.nextUrl.searchParams.get("status") as PurchaseOrderStatus | null
  const supplierIdValue = request.nextUrl.searchParams.get("supplierId")
  const from = request.nextUrl.searchParams.get("from")
  const to = request.nextUrl.searchParams.get("to")
  return Response.json(await purchaseOrdersService.get({
    skip: (page - 1) * limit,
    take: limit,
    status: status ?? undefined,
    supplierId: supplierIdValue ? Number(supplierIdValue) : undefined,
    date: { from: from ? new Date(from) : undefined, to: to ? new Date(to) : undefined },
  }))
}
