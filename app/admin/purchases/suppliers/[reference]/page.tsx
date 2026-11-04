import { Card, CardContent } from "@/components/ui/card"
import { notFound } from "next/navigation";
import { getSupplier } from "@/modules/suppliers/actions/get-supplier";
import { SupplierStatus } from "@/app/generated/prisma/enums";
import SupplierHeader from "@/modules/suppliers/components/supplier-header";
import SupplierInfo from "@/modules/suppliers/components/supplier-info";
import SupplierHistory from "@/modules/suppliers/components/supplier-history";
import SupplierRelatedData from "@/modules/suppliers/components/supplier-related-data";
import type { Activity } from "@/modules/crm/types";

export default async function Supplier({params}:{params:Promise<{reference:string}>}) {
    const {reference} = await params
    if(!reference) notFound()
    const result = await getSupplier(reference)
    if(!result.success){
        notFound()    
    }
    const data = {...result.supplier,
                    reference,
                    name: result.supplier?.name ?? "",
                    status: result.supplier?.status ?? SupplierStatus.ACTIVE,
                    contactName: result.supplier?.contactName || "",
                    phone: result.supplier?.phone || "",
                    whatsapp: result.supplier?.whatsapp || "",
                    email: result.supplier?.email || "",
                    country: result.supplier?.country || "",
                    city: result.supplier?.city || "",
                    address: result.supplier?.address || "",
                    ice:result.supplier?.ice || "",
                    rc:result.supplier?.rc || "",
                    ifNumber:result.supplier?.ifNumber || "",
                    paymentTerms:result.supplier?.paymentTerms || "",
                    currency:result.supplier?.currency || "MAD",
                    deliveryDelayDays:result.supplier?.deliveryDelayDays || 0,
                    notes:result.supplier?.notes || "",
                }
    const formData = {
        ...data,
        products: data.products?.map((item) => item.product.reference),
    }
    return (
        <Card className="mb-6">
            <CardContent className=" space-y-6 ">
                <SupplierHeader supplier={formData} productCount={data.products?.length ?? 0}/>
                <SupplierInfo supplier={formData}/>
                <SupplierRelatedData
                    products={(data.products ?? []).map((item) => ({
                        id: item.id,
                        product: item.product,
                        purchasePriceHT: item.purchasePriceHT,
                        deliveryDelayDays: item.deliveryDelayDays,
                        isPreferred: item.isPreferred,
                    }))}
                    purchaseOrders={(data.purchaseOrders ?? []).map((order) => ({
                        id: order.id,
                        reference: order.reference,
                        status: order.status,
                        totalTTC: order.totalTTC,
                        currency: order.currency,
                    }))}
                />
                <SupplierHistory activities={(data.activity ?? []) as Activity[]}/>
            </CardContent>
        </Card>
    )
}