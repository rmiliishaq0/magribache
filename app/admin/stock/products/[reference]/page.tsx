import { Card, CardContent } from "@/components/ui/card"
import {ProspectHistorique} from "@/modules/crm/components/prospect-historique"
import { notFound } from "next/navigation";
import { getProduct } from "@/modules/products/actions/get-product";
import ProductHeader from "@/modules/products/components/product-header";
import { ProductStatus, ProductType, StockUnit } from "@/app/generated/prisma/browser";
import ProductInfo from "@/modules/products/components/product-info";
import ProductSuppliers from "@/modules/products/components/product-suppliers";
import ProductMouvments from "@/modules/products/components/product-mouvments";
import ProductStockLot from "@/modules/products/components/product-stock-lot";


export default async function Product({params}:{params:Promise<{reference:string}>}) {
    const {reference} = await params
    if(!reference) notFound()
    const result = await getProduct(reference)
    if(!result.success){
        notFound()    
    }
    const data = {...result.product,
                    id:10,
                    reference:result.product?.reference!,
                    name :result.product?.name ?? "",
                    type:result.product?.type ?? ProductType.FINISHED_PRODUCT,
                    status:result.product?.status ?? ProductStatus.ACTIVE,
                    unit:result.product?.unit ?? StockUnit.M3,
                    capacityM3: result.product?.capacityM3 ? Number(result.product.capacityM3) : undefined,
                    dimensions:result.product?.dimensions ?? undefined,
                    material:result.product?.material ?? undefined,
                    color:result.product?.color ?? undefined,
                    grammage:result.product?.grammage ?? undefined,
                    taxRate:result.product?.taxRate ? Number(result.product.taxRate) : undefined,
                    salePriceHT:result.product?.salePriceHT ? Number(result.product.salePriceHT) : undefined,
                    purchasePriceHT:result.product?.purchasePriceHT ? Number(result.product.purchasePriceHT) : undefined,
                    currentStock:result.product?.currentStock ? Number(result.product.currentStock) : undefined,
                    minimumStock:result.product?.minimumStock ? Number(result.product.minimumStock) : undefined,
                    maximumStock:result.product?.maximumStock ? Number(result.product.maximumStock) : undefined,
                    trackLot:result.product?.trackLot ?? undefined,
                    trackSerialNumber:result.product?.trackSerialNumber ?? undefined,
                    suppliers:result.product?.suppliers ?? undefined,
                }
    return (
        <Card className="mb-6">
            <CardContent className=" space-y-6 ">
                <ProductHeader product={data}/>
                <ProductInfo product={data}/>
                <ProspectHistorique activities={data?.activity}/>
                <ProductSuppliers suppliers={[]}/>
                <ProductStockLot productStockLot={[]}/>
                <ProductMouvments productMouvments={[]}/>
            </CardContent>
        </Card>
    )
}