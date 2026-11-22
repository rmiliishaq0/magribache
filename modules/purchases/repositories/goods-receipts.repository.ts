import prisma from "@/lib/prisma"
import { Prisma } from "@/app/generated/prisma/client"
import type { GoodsReceiptStatus } from "@/app/generated/prisma/enums"
import { endOfDay, startOfDay } from "date-fns"

const receiptInclude = {
  supplier: true,
  purchaseOrder: true,
  lines: {
    include: {
      product: true,
      purchaseOrderLine: true,
    },
  },
} satisfies Prisma.GoodsReceiptInclude

export const goodsReceiptsRepository = {
  async getAll({ skip, take, status, supplierId, purchaseOrderId, date }: {
    skip?: number
    take?: number
    status?: GoodsReceiptStatus
    supplierId?: number
    purchaseOrderId?: number
    date?: { from?: Date; to?: Date }
  }) {
    return prisma.goodsReceipt.findMany({
      where: {
        ...(status && { status }),
        ...(supplierId && { supplierId }),
        ...(purchaseOrderId && { purchaseOrderId }),
        ...(date?.from || date?.to) && {
          receiptDate: {
            ...(date.from && { gte: startOfDay(date.from) }),
            ...(date.to && { lte: endOfDay(date.to) }),
          },
        },
      },
      skip,
      take,
      include: receiptInclude,
      orderBy: { receiptDate: "desc" },
    })
  },
  async count(filters: {
    status?: GoodsReceiptStatus
    supplierId?: number
    purchaseOrderId?: number
    date?: { from?: Date; to?: Date }
  } = {}) {
    return prisma.goodsReceipt.count({
      where: {
        ...(filters.status && { status: filters.status }),
        ...(filters.supplierId && { supplierId: filters.supplierId }),
        ...(filters.purchaseOrderId && { purchaseOrderId: filters.purchaseOrderId }),
        ...(filters.date?.from || filters.date?.to) && {
          receiptDate: {
            ...(filters.date.from && { gte: startOfDay(filters.date.from) }),
            ...(filters.date.to && { lte: endOfDay(filters.date.to) }),
          },
        },
      },
    })
  },
  async getLast() {
    return prisma.goodsReceipt.findFirst({ orderBy: { id: "desc" }, select: { id: true } })
  },
  async getByReference(reference: string) {
    return prisma.goodsReceipt.findUnique({ where: { reference }, include: receiptInclude })
  },
  async getById(id: number) {
    return prisma.goodsReceipt.findUnique({ where: { id }, include: receiptInclude })
  },
  async delete(id: number) {
    return prisma.goodsReceipt.delete({ where: { id } })
  },
}
