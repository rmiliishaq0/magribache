"use client"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import StatsCard from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Trash} from "lucide-react";
import { productsSchemaWithId } from "../types";
import { useDeleteProduct } from "../hooks/mutations/use-delete-products";
import { stockStats } from "../constants/product-stats";
import { Options } from "@/modules/products/constants/options-to-frensh";


type Data={
    date?:Date | undefined,
    note?:string | undefined
}


export default function ProductHeader({product}:{product :productsSchemaWithId}) {
    const {mutate,isPending} = useDeleteProduct()
    console.log(product.minimumStock)
    return(
        <>
            <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-secondary mt-2">Fiche produit</h2>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href="/admin/stock/products">Produits</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{product.reference}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                    </div>
                    <div className="flex gap-2">
                        <Button disabled={isPending} variant={"destructive"} onClick={()=>{mutate(product?.reference)}}><Trash/> Supprimer</Button>
                    </div>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    {stockStats.map((i, index) => {
                        const value = product?.[i.accessKey as keyof typeof product] || 0
                        return (
                            <StatsCard
                                key={index}
                                Icon={i.icon}
                                description={i.title ?? "Indéfinie"}
                                number={Options?.[value as keyof typeof Options] || value as string | number}
                                style={i.style}
                            />
                        )
})}
                </div>
        </>
    )
}