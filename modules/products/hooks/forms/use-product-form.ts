import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productsSchema } from "../../schemas/productsSchema";
import { ProductStatus } from "@/app/generated/prisma/enums";

export function useProductForm({defaultValues}:{defaultValues?:z.input<typeof productsSchema>}){
    return useForm<z.input<typeof productsSchema>, any, z.output<typeof productsSchema>>({
        resolver:zodResolver(productsSchema),
        mode:"all",
        reValidateMode:"onChange",
        defaultValues:defaultValues? defaultValues : {
            "reference":"default",
            "name": undefined,
            "type": undefined,
            "status": ProductStatus.ACTIVE,
            "unit": undefined,
            "capacityM3": undefined,
            "dimensions": undefined,
            "material": undefined,
            "color": undefined,
            "grammage": undefined,
            "taxRate": undefined,
            "salePriceHT": undefined,
            "purchasePriceHT": undefined,
            "currentStock": undefined,
            "minimumStock": undefined,
            "maximumStock": undefined,
            "trackLot": undefined,
            "trackSerialNumber": undefined
        }
    })}