import prisma from "@/lib/prisma"
import { Prisma } from "@/app/generated/prisma/client"
import { endOfDay, startOfDay } from "date-fns"
import type { PurchaseOrderStatus } from "@/app/generated/prisma/enums"

export const purchaseOrdersRepository = {
  async getAll({ skip, take, status, supplierId, date }: { skip?: number; take?: number; status?: PurchaseOrderStatus; supplierId?: number; date?: { from?: Date; to?: Date } }) {
    const where = {
      ...(status && { status }),
      ...(supplierId && { supplierId }),
      ...(date?.from || date?.to) && {
        orderDate: {
          ...(date.from && { gte: startOfDay(date.from) }),
          ...(date.to && { lte: endOfDay(date.to) }),
        },
      },
    }
    return prisma.purchaseOrder.findMany({
      where,
      skip,
      take,
      include: { supplier: true, lines: true, activities: { include: { logs: true } } },
      orderBy: { orderDate: "desc" },
    })
  },
  async count(where: { status?: PurchaseOrderStatus; supplierId?: number; date?: { from?: Date; to?: Date } } = {}) {
    const filter = {
      ...(where.status && { status: where.status }),
      ...(where.supplierId && { supplierId: where.supplierId }),
      ...(where.date?.from || where.date?.to) && {
        orderDate: {
          ...(where.date.from && { gte: startOfDay(where.date.from) }),
          ...(where.date.to && { lte: endOfDay(where.date.to) }),
        },
      },
    }
    return prisma.purchaseOrder.count({ where: filter })
  },
  async getLast() {
    return prisma.purchaseOrder.findFirst({ orderBy: { id: "desc" }, select: { id: true } })
  },
  async getByReference(reference: string) {
    return prisma.purchaseOrder.findUnique({
      where: { reference },
      include: { supplier: true, lines: true, activities: { include: { logs: true }, orderBy: { createdAt: "asc" } } },
    })
  },
  async getById(id: number) {
    return prisma.purchaseOrder.findUnique({
      where: { id },
      include: { supplier: true, lines: true, activities: { include: { logs: true }, orderBy: { createdAt: "asc" } } },
    })
  },
  async create(data: Prisma.PurchaseOrderCreateInput) {
    return prisma.purchaseOrder.create({ data, include: { supplier: true, lines: true, activities: { include: { logs: true } } } })
  },
  async update(id: number, data: Prisma.PurchaseOrderUpdateInput) {
    return prisma.purchaseOrder.update({ where: { id }, data, include: { supplier: true, lines: true, activities: { include: { logs: true } } } })
  },
  async delete(id: number) {
    return prisma.purchaseOrder.delete({ where: { id } })
  },
}
