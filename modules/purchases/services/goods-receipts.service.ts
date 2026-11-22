import prisma from "@/lib/prisma"
import { Prisma } from "@/app/generated/prisma/client"
import { requireAuth } from "@/lib/auth"
import { GoodsReceiptStatus, PurchaseOrderStatus } from "@/app/generated/prisma/enums"
import { goodsReceiptSchema } from "../schemas/goods-receipt"
import { goodsReceiptsRepository } from "../repositories/goods-receipts.repository"

type ReceiptFilters = {
  skip?: number
  take?: number
  status?: GoodsReceiptStatus
  supplierId?: number
  purchaseOrderId?: number
  date?: { from?: Date; to?: Date }
}

function serializeReceipt(receipt: Awaited<ReturnType<typeof goodsReceiptsRepository.getByReference>>) {
  if (!receipt) return null
  return {
    ...receipt,
    lines: receipt.lines.map((line) => {
      const quantityReceived = Number(line.quantityReceived)
      const quantityOrdered = Number(line.purchaseOrderLine.quantity)
      const receivedQuantity = Number(line.purchaseOrderLine.receivedQuantity)
      const receivedBefore = receipt.status === GoodsReceiptStatus.COMPLETED
        ? Math.max(0, receivedQuantity - quantityReceived)
        : receipt.status === GoodsReceiptStatus.CANCELLED
          ? receivedQuantity + quantityReceived
          : receivedQuantity
      return {
        ...line,
        quantityReceived,
        unitPriceHT: line.unitPriceHT === null ? null : Number(line.unitPriceHT),
        designation: line.purchaseOrderLine.designation,
        productName: line.product.name,
        quantityOrdered,
        receivedQuantity,
        receivedBefore,
        remainingBefore: Math.max(0, quantityOrdered - receivedBefore),
        remainingAfter: Math.max(0, quantityOrdered - receivedQuantity),
      }
    }),
  }
}

async function postCompletedReceipt(tx: Prisma.TransactionClient, receiptId: number) {
  const receipt = await tx.goodsReceipt.findUnique({
    where: { id: receiptId },
    include: {
      supplier: true,
      purchaseOrder: { include: { lines: true } },
      lines: { include: { purchaseOrderLine: true, product: true } },
    },
  })
  if (!receipt) throw new Error("Reception introuvable")

  for (const line of receipt.lines) {
    const remaining = Number(line.purchaseOrderLine.quantity) - Number(line.purchaseOrderLine.receivedQuantity)
    const quantityReceived = Number(line.quantityReceived)
    if (quantityReceived > remaining + 0.0001) {
      throw new Error(`Quantité reçue supérieure au reliquat pour ${line.purchaseOrderLine.designation}`)
    }

    await tx.purchaseOrderLine.update({
      where: { id: line.purchaseOrderLineId },
      data: { receivedQuantity: { increment: quantityReceived } },
    })
    await tx.product.update({
      where: { id: line.productId },
      data: { currentStock: { increment: quantityReceived } },
    })

    let stockLotId: number | undefined
    if (line.lotNumber) {
      const existingLot = await tx.stockLot.findUnique({ where: { lotNumber: line.lotNumber } })
      if (existingLot) throw new Error(`Le numéro de lot ${line.lotNumber} existe déjà`)
      const stockLot = await tx.stockLot.create({
        data: {
          lotNumber: line.lotNumber,
          product: { connect: { id: line.productId } },
          supplier: { connect: { id: receipt.supplierId } },
          goodsReceiptId: receipt.id,
          entryDate: receipt.receiptDate,
          quantityInitial: quantityReceived,
          quantityAvailable: quantityReceived,
          unit: line.unit,
          unitCost: line.unitPriceHT ?? undefined,
          totalCost: line.unitPriceHT ? quantityReceived * Number(line.unitPriceHT) : undefined,
        },
      })
      stockLotId = stockLot.id
    }

    await tx.stockMovement.create({
      data: {
        reference: `MVT-${new Date().getFullYear()}-${receipt.id}-${line.id}`,
        product: { connect: { id: line.productId } },
        ...(stockLotId ? { stockLot: { connect: { id: stockLotId } } } : {}),
        type: "PURCHASE_IN",
        quantity: quantityReceived,
        unit: line.unit,
        unitCost: line.unitPriceHT ?? undefined,
        totalCost: line.unitPriceHT ? quantityReceived * Number(line.unitPriceHT) : undefined,
        sourceType: "GOODS_RECEIPT",
        sourceId: String(receipt.id),
        sourceReference: receipt.reference,
        notes: line.notes ?? "Réception fournisseur",
      },
    })
  }

  const purchaseOrder = await tx.purchaseOrder.findUnique({
    where: { id: receipt.purchaseOrderId },
    include: { lines: true },
  })
  if (purchaseOrder) {
    const fullyReceived = purchaseOrder.lines.every(
      (line) => Number(line.receivedQuantity) >= Number(line.quantity) - 0.0001,
    )
    await tx.purchaseOrder.update({
      where: { id: purchaseOrder.id },
      data: { status: fullyReceived ? PurchaseOrderStatus.RECEIVED : PurchaseOrderStatus.PARTIALLY_RECEIVED },
    })
  }
}

async function refreshPurchaseOrderStatus(tx: Prisma.TransactionClient, purchaseOrderId: number) {
  const order = await tx.purchaseOrder.findUnique({
    where: { id: purchaseOrderId },
    include: { lines: true },
  })
  if (!order) return
  const received = order.lines.reduce((total: number, line: { receivedQuantity: unknown }) => total + Number(line.receivedQuantity), 0)
  await tx.purchaseOrder.update({
    where: { id: purchaseOrderId },
    data: {
      status: received <= 0.0001
        ? PurchaseOrderStatus.CONFIRMED
        : order.lines.every((line: { receivedQuantity: unknown; quantity: unknown }) => Number(line.receivedQuantity) >= Number(line.quantity) - 0.0001)
          ? PurchaseOrderStatus.RECEIVED
          : PurchaseOrderStatus.PARTIALLY_RECEIVED,
    },
  })
}

export const goodsReceiptsService = {
  async get(filters: ReceiptFilters = {}) {
    const auth = await requireAuth()
    if (auth.error) return { success: false, message: "Unauthorized" }
    const [receipts, total] = await Promise.all([
      goodsReceiptsRepository.getAll(filters),
      goodsReceiptsRepository.count(filters),
    ])
    const all = await goodsReceiptsRepository.getAll({})
    return {
      success: true,
      goodsReceipts: receipts.map((receipt) => serializeReceipt(receipt)).filter(Boolean),
      total,
      stats: {
        total,
        draft: all.filter((receipt) => receipt.status === "DRAFT").length,
        completed: all.filter((receipt) => receipt.status === "COMPLETED").length,
        cancelled: all.filter((receipt) => receipt.status === "CANCELLED").length,
      },
    }
  },

  async getByReference(reference: string) {
    const auth = await requireAuth()
    if (auth.error) return { success: false, message: "Unauthorized" }
    const receipt = await goodsReceiptsRepository.getByReference(reference)
    if (!receipt) return { success: false, message: "Réception introuvable" }
    return { success: true, goodsReceipt: serializeReceipt(receipt) }
  },

  async create(data: unknown) {
    try {
      const auth = await requireAuth()
      if (auth.error) return { success: false, message: "Unauthorized" }
      const parsed = goodsReceiptSchema.safeParse(data)
      if (!parsed.success) return { success: false, message: "Données invalides" }

      const receipt = await prisma.$transaction(async (tx) => {
        const order = await tx.purchaseOrder.findUnique({
          where: { id: parsed.data.purchaseOrderId },
          include: { supplier: true, lines: true },
        })
        if (!order) throw new Error("Commande d'achat introuvable")
        if (order.status === "RECEIVED" || order.status === "CANCELLED") {
          throw new Error("Cette commande ne peut plus être réceptionnée")
        }
        if (parsed.data.status === GoodsReceiptStatus.CANCELLED) {
          throw new Error("Utilisez l'annulation depuis une réception existante")
        }

        for (const line of parsed.data.lines) {
          const orderLine = order.lines.find((item) => item.id === line.purchaseOrderLineId)
          if (!orderLine || orderLine.productId !== line.productId) {
            throw new Error("Une ligne de réception ne correspond pas à la commande")
          }
          const remaining = Number(orderLine.quantity) - Number(orderLine.receivedQuantity)
          if (line.quantityReceived > remaining + 0.0001) {
            throw new Error(`Quantité reçue supérieure au reliquat pour ${orderLine.designation}`)
          }
        }

        const lotNumbers = parsed.data.lines
          .map((line) => line.lotNumber?.trim())
          .filter((lotNumber): lotNumber is string => Boolean(lotNumber))
        for (const lotNumber of lotNumbers) {
          const existingLot = await tx.stockLot.findUnique({ where: { lotNumber } })
          if (existingLot) throw new Error(`Le numéro de lot ${lotNumber} existe déjà`)
        }

        const last = await tx.goodsReceipt.findFirst({ orderBy: { id: "desc" }, select: { id: true } })
        const created = await tx.goodsReceipt.create({
          data: {
            reference: `BR-${new Date().getFullYear()}-${(last?.id ?? 0) + 1}`,
            supplier: { connect: { id: order.supplierId } },
            purchaseOrder: { connect: { id: order.id } },
            receiptDate: parsed.data.receiptDate,
            supplierDocumentRef: parsed.data.supplierDocumentRef,
            status: parsed.data.status,
            notes: parsed.data.notes,
            lines: {
              create: parsed.data.lines.map((line) => ({
                purchaseOrderLine: { connect: { id: line.purchaseOrderLineId } },
                product: { connect: { id: line.productId } },
                quantityReceived: line.quantityReceived,
                unit: line.unit,
                unitPriceHT: line.unitPriceHT,
                lotNumber: line.lotNumber,
                qualityChecked: line.qualityChecked,
                qualityStatus: line.qualityStatus,
                notes: line.notes,
              })),
            },
          },
          include: {
            supplier: true,
            purchaseOrder: true,
            lines: { include: { product: true, purchaseOrderLine: true } },
          },
        })

        if (parsed.data.status === GoodsReceiptStatus.COMPLETED) {
          await postCompletedReceipt(tx, created.id)
        }
        return created
      })

      const saved = await goodsReceiptsRepository.getById(receipt.id)
      return { success: true, message: "Réception créée", goodsReceipt: serializeReceipt(saved) }
    } catch (error) {
      console.error(error)
      return { success: false, message: error instanceof Error ? error.message : "Une erreur s'est produite" }
    }
  },

  async update(id: number, data: unknown) {
    try {
      const auth = await requireAuth()
      if (auth.error) return { success: false, message: "Unauthorized" }
      const parsed = goodsReceiptSchema.safeParse(data)
      if (!parsed.success) return { success: false, message: "Données invalides" }
      const before = await goodsReceiptsRepository.getById(id)
      if (!before) return { success: false, message: "Réception introuvable" }
      if (before.status !== GoodsReceiptStatus.DRAFT) {
        return { success: false, message: "Une réception terminée ne peut pas être modifiée" }
      }

      await prisma.$transaction(async (tx) => {
        if (parsed.data.status === GoodsReceiptStatus.CANCELLED) {
          throw new Error("Utilisez l'annulation depuis une réception existante")
        }
        const order = await tx.purchaseOrder.findUnique({
          where: { id: parsed.data.purchaseOrderId },
          include: { lines: true },
        })
        if (!order) throw new Error("Commande d'achat introuvable")
        if (order.status === "RECEIVED" || order.status === "CANCELLED") {
          throw new Error("Cette commande ne peut plus être réceptionnée")
        }
        for (const line of parsed.data.lines) {
          const orderLine = order.lines.find((item) => item.id === line.purchaseOrderLineId)
          if (!orderLine || orderLine.productId !== line.productId) {
            throw new Error("Une ligne de réception ne correspond pas à la commande")
          }
          const remaining = Number(orderLine.quantity) - Number(orderLine.receivedQuantity)
          if (parsed.data.status === GoodsReceiptStatus.COMPLETED && line.quantityReceived > remaining + 0.0001) {
            throw new Error(`Quantité reçue supérieure au reliquat pour ${orderLine.designation}`)
          }
        }
        await tx.goodsReceipt.update({
          where: { id },
          data: {
            receiptDate: parsed.data.receiptDate,
            supplierDocumentRef: parsed.data.supplierDocumentRef,
            status: parsed.data.status,
            notes: parsed.data.notes,
            lines: {
              deleteMany: {},
              create: parsed.data.lines.map((line) => ({
                purchaseOrderLine: { connect: { id: line.purchaseOrderLineId } },
                product: { connect: { id: line.productId } },
                quantityReceived: line.quantityReceived,
                unit: line.unit,
                unitPriceHT: line.unitPriceHT,
                lotNumber: line.lotNumber,
                qualityChecked: line.qualityChecked,
                qualityStatus: line.qualityStatus,
                notes: line.notes,
              })),
            },
          },
        })
        if (parsed.data.status === GoodsReceiptStatus.COMPLETED) {
          await postCompletedReceipt(tx, id)
        }
      })
      const saved = await goodsReceiptsRepository.getById(id)
      return { success: true, message: "Réception mise à jour", goodsReceipt: serializeReceipt(saved) }
    } catch (error) {
      console.error(error)
      return { success: false, message: error instanceof Error ? error.message : "Une erreur s'est produite" }
    }
  },

  async cancel(reference: string) {
    try {
      const auth = await requireAuth()
      if (auth.error) return { success: false, message: "Unauthorized" }
      const receipt = await goodsReceiptsRepository.getByReference(reference)
      if (!receipt) return { success: false, message: "Réception introuvable" }
      if (receipt.status === GoodsReceiptStatus.CANCELLED) return { success: false, message: "Réception déjà annulée" }

      await prisma.$transaction(async (tx) => {
        if (receipt.status === GoodsReceiptStatus.COMPLETED) {
          for (const line of receipt.lines) {
            const quantity = Number(line.quantityReceived)
            const product = await tx.product.findUnique({ where: { id: line.productId }, select: { currentStock: true } })
            if (!product || Number(product.currentStock) < quantity - 0.0001) {
              throw new Error(`Stock insuffisant pour annuler la réception de ${line.product.name}`)
            }
            const purchaseOrderLine = await tx.purchaseOrderLine.findUnique({
              where: { id: line.purchaseOrderLineId },
              select: { receivedQuantity: true },
            })
            if (!purchaseOrderLine || Number(purchaseOrderLine.receivedQuantity) < quantity - 0.0001) {
              throw new Error(`Quantité reçue insuffisante pour annuler ${line.purchaseOrderLine.designation}`)
            }
            if (line.lotNumber) {
              const stockLot = await tx.stockLot.findUnique({ where: { lotNumber: line.lotNumber } })
              if (stockLot && Number(stockLot.quantityAvailable) < quantity - 0.0001) {
                throw new Error(`Le lot ${line.lotNumber} a déjà été consommé partiellement`)
              }
            }
            await tx.purchaseOrderLine.update({
              where: { id: line.purchaseOrderLineId },
              data: { receivedQuantity: { decrement: quantity } },
            })
            await tx.product.update({
              where: { id: line.productId },
              data: { currentStock: { decrement: quantity } },
            })
          }
          await tx.stockLot.deleteMany({ where: { goodsReceiptId: receipt.id } })
          await tx.stockMovement.deleteMany({
            where: { sourceType: "GOODS_RECEIPT", sourceReference: receipt.reference },
          })
        }
        await tx.goodsReceipt.update({
          where: { id: receipt.id },
          data: { status: GoodsReceiptStatus.CANCELLED },
        })
        await refreshPurchaseOrderStatus(tx, receipt.purchaseOrderId)
      })
      return { success: true, message: "Réception annulée" }
    } catch (error) {
      console.error(error)
      return { success: false, message: "Une erreur s'est produite" }
    }
  },

  async delete(reference: string) {
    const auth = await requireAuth()
    if (auth.error) return { success: false, message: "Unauthorized" }
    const receipt = await goodsReceiptsRepository.getByReference(reference)
    if (!receipt) return { success: false, message: "Réception introuvable" }
    if (receipt.status !== GoodsReceiptStatus.DRAFT) {
      return { success: false, message: "Seule une réception brouillon peut être supprimée" }
    }
    await goodsReceiptsRepository.delete(receipt.id)
    return { success: true, message: "Réception supprimée" }
  },
}
