import { Card, CardContent } from "@/components/ui/card";
import ProductMouvments from "@/modules/products/components/product-mouvments";
import { productService } from "@/modules/products/services/product.service";
import { ProductMouvmentsType } from "@/modules/products/types";

export default async function StockMovementsPage() {
  const result = await productService.getStockMovements();
  const movements =
    "movements" in result ? (result.movements as ProductMouvmentsType[]) : [];

  return (
    <Card>
      <CardContent className="space-y-6">
        <h2 className="mt-2 text-2xl font-bold text-secondary">
          Mouvements de stock
        </h2>
        <ProductMouvments productMouvments={movements} />
      </CardContent>
    </Card>
  );
}
