import { requireAuth } from "@/lib/auth"
import { PurchaseOrderStatus } from "@/app/generated/prisma/enums"
import { purchaseOrderSchema } from "../schemas/purchase-order"
import { purchaseOrdersRepository } from "../repositories/purchase-orders.repository"
import { PurchaseOrderWithRelations } from "../types";
import { activityRepository } from "@/modules/activity/activity.repository"
import { logsRepository } from "@/modules/logs/logs-repository"
import { Prisma } from "@/app/generated/prisma/client"



const serialize = (order: PurchaseOrderWithRelations) => ({
  ...order,
  totalHT: Number(order.totalHT),
  taxAmount: Number(order.taxAmount),
  totalTTC: Number(order.totalTTC),
  lines: order.lines.map((line) => ({
    ...line,
    quantity: Number(line.quantity),
    receivedQuantity: Number(line.receivedQuantity),
    unitPriceHT: Number(line.unitPriceHT),
    taxRate: Number(line.taxRate),
    totalHT: Number(line.totalHT),
    taxAmount: Number(line.taxAmount),
    totalTTC: Number(line.totalTTC),
  })),
  activities: order.activities,
})

export const purchaseOrdersService = {
  async get({ skip, take, status, supplierId, date }: { skip?: number; take?: number; status?: PurchaseOrderStatus; supplierId?: number; date?: { from?: Date; to?: Date } } = {}) {
    const auth = await requireAuth()
    if (auth.error) return { success: false, message: "Unauthorized" }
    const [orders, total] = await Promise.all([
      purchaseOrdersRepository.getAll({ skip, take, status, supplierId, date }),
      purchaseOrdersRepository.count({ status, supplierId, date }),
    ])
    const allOrders = await purchaseOrdersRepository.getAll({ status, supplierId, date })
    return {
      success: true,
      purchaseOrders: orders.map(serialize),
      total,
      stats: {
        total,
        draft: allOrders.filter((order) => order.status === "DRAFT").length,
        confirmed: allOrders.filter((order) => order.status === "CONFIRMED").length,
        received: allOrders.filter((order) => order.status === "RECEIVED").length,
      },
    }
  },
  async getByReference(reference: string) {
    const auth = await requireAuth()
    if (auth.error) return { success: false, message: "Unauthorized" }
    const order = await purchaseOrdersRepository.getByReference(reference)
    if (!order) return { success: false, message: "Commande introuvable" }
    return { success: true, purchaseOrder: serialize(order) }
  },
  async delete(reference: string) {
    const auth = await requireAuth()
    if (auth.error) return { success: false, message: "Unauthorized" }
    const order = await purchaseOrdersRepository.getByReference(reference)
    if (!order) return { success: false, message: "Commande introuvable" }
    await purchaseOrdersRepository.delete(order.id)
    return { success: true, message: "Commande supprimée" }
  },
  async create(data: unknown) {
    try {
      const auth = await requireAuth()
      if (auth.error) return { success: false, message: "Unauthorized" }
      const parsed = purchaseOrderSchema.safeParse(data)
      if (!parsed.success) return { success: false, message: "Données invalides" }
      const last = await purchaseOrdersRepository.getLast()
      const reference = `BC-${new Date().getFullYear()}-${(last?.id ?? 0) + 1}`
      const totals = parsed.data.lines.reduce(
        (sum, line) => {
          const totalHT = line.quantity * line.unitPriceHT
          const taxAmount = totalHT * line.taxRate / 100
          return { totalHT: sum.totalHT + totalHT, taxAmount: sum.taxAmount + taxAmount }
        },
        { totalHT: 0, taxAmount: 0 },
      )
      const order = await purchaseOrdersRepository.create({
        reference,
        supplier: { connect: { id: parsed.data.supplierId } },
        orderDate: parsed.data.orderDate,
        expectedDate: parsed.data.expectedDate,
        status: parsed.data.status,
        currency: parsed.data.currency,
        paymentTerms: parsed.data.paymentTerms,
        notes: parsed.data.notes,
        totalHT: totals.totalHT,
        taxAmount: totals.taxAmount,
        totalTTC: totals.totalHT + totals.taxAmount,
        lines: {
          create: parsed.data.lines.map((line) => {
            const totalHT = line.quantity * line.unitPriceHT
            const taxAmount = totalHT * line.taxRate / 100
            return {
              product: { connect: { id: line.productId } },
              designation: line.designation,
              specification: line.specification,
              quantity: line.quantity,
              unit: line.unit,
              unitPriceHT: line.unitPriceHT,
              taxRate: line.taxRate,
              totalHT,
              taxAmount,
              totalTTC: totalHT + taxAmount,
            }
          }),
        },
      })
      await activityRepository.create({
        entityType: "PURCHASE_ORDER",
        action: "CREATED",
        note: "Commande d'achat créée.",
        purchaseOrder: { connect: { id: order.id } },
      })
      return { success: true, message: "Commande créée", purchaseOrder: serialize(order) }
    } catch (error) {
      console.error(error)
      return { success: false, message: "Une erreur s'est produite" }
    }
  },
  async update(id: number, data: unknown) {
    const auth = await requireAuth()
    if (auth.error) return { success: false, message: "Unauthorized" }
    const parsed = purchaseOrderSchema.safeParse(data)
    if (!parsed.success) return { success: false, message: "Données invalides" }
    const before = await purchaseOrdersRepository.getById(id)
    const totals = parsed.data.lines.reduce(
      (sum, line) => {
        const totalHT = line.quantity * line.unitPriceHT
        const taxAmount = totalHT * line.taxRate / 100
        return { totalHT: sum.totalHT + totalHT, taxAmount: sum.taxAmount + taxAmount }
      },
      { totalHT: 0, taxAmount: 0 },
    )
    const order = await purchaseOrdersRepository.update(id, {
      supplier: { connect: { id: parsed.data.supplierId } },
      orderDate: parsed.data.orderDate,
      expectedDate: parsed.data.expectedDate,
      status: parsed.data.status,
      currency: parsed.data.currency,
      paymentTerms: parsed.data.paymentTerms,
      notes: parsed.data.notes,
      totalHT: totals.totalHT,
      taxAmount: totals.taxAmount,
      totalTTC: totals.totalHT + totals.taxAmount,
      lines: {
        deleteMany: {},
        create: parsed.data.lines.map((line) => {
          const totalHT = line.quantity * line.unitPriceHT
          const taxAmount = totalHT * line.taxRate / 100
          return {
            product: { connect: { id: line.productId } },
            designation: line.designation,
            specification: line.specification,
            quantity: line.quantity,
            unit: line.unit,
            unitPriceHT: line.unitPriceHT,
            taxRate: line.taxRate,
            totalHT,
            taxAmount,
            totalTTC: totalHT + taxAmount,
          }
        }),
      },
    })
    const activity = await activityRepository.create({
      entityType: "PURCHASE_ORDER",
      action: "UPDATED",
      note: "Commande d'achat mise à jour.",
      purchaseOrder: { connect: { id: order.id } },
    })
    const fields = ["supplierId", "orderDate", "expectedDate", "status", "currency", "paymentTerms", "notes", "lines"] as const
    const logs: Prisma.ActivityLogCreateManyInput[] = []
    for (const field of fields) {
      const oldValue = field === "lines"
        ? before?.lines.map((line) => ({ productId: line.productId, designation: line.designation, quantity: String(line.quantity), unit: line.unit, unitPriceHT: String(line.unitPriceHT), taxRate: String(line.taxRate) }))
        : before?.[field]
      const newValue = field === "lines" ? parsed.data.lines : parsed.data[field]
      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        logs.push({
          activityId: activity.id,
          field,
          oldValue: oldValue == null ? null : String(oldValue),
          newValue: newValue == null ? null : String(newValue),
        })
      }
    }
    if (logs.length > 0) await logsRepository.createMany(logs)
    return { success: true, message: "Commande mise à jour", purchaseOrder: serialize(order) }
  },
}
