import { useQuery } from "@tanstack/react-query";
import { getSuppliersWithProducts } from "../../actions/get-suppliers";

export  function useGetSuppliers() {
  return useQuery({
      queryKey: ['suppliers'],
      queryFn: async()=>{
        return getSuppliersWithProducts();
      },
    })
}
