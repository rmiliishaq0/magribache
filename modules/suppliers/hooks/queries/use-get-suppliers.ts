import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { getSuppliers } from "../../api/get-suppliers";
import { filterSchema } from "@/modules/suppliers/schemas/filter-schema";

type Pagination={
  pageIndex:number,
  pageSize:number
}

export  function useGetSuppliers({pagination,activeFilters}: {pagination?:Pagination, activeFilters?:z.infer<typeof filterSchema>}) {
  return useQuery({
      queryKey: activeFilters ? ['suppliers',activeFilters,pagination] :[],
      queryFn: async()=>{
        if(activeFilters) {
          const params = new URLSearchParams();
        Object.entries(activeFilters).forEach(([key, value]) => {
            if (
              typeof value === "object" &&
              value !== null &&
              "from" in value &&
              "to" in value
            ) {
              if (value.from) {
                params.set("from", value.from.toISOString());
              }

              if (value.to) {
                params.set("to", value.to.toISOString());
              }

              return;
            }
            params.set(key, String(value));
          })
          params.set("page",String(pagination?.pageIndex))
          params.set("limit",String(pagination?.pageSize))
        return getSuppliers(params);
        }
        return getSuppliers();
      },
    })
}