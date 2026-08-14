import { getProspects } from "@/modules/crm/api/get-prospects";
import { useQuery } from "@tanstack/react-query";
import { SortingState} from "@tanstack/react-table";
import { z } from "zod";
import { filterSchema } from "../../schemas/filter";

type Pagination = {
  pageIndex: number;
  pageSize: number;
};

export  function useGetProspects({pagination, sorting,activeFilters}: { pagination?: Pagination; sorting?: SortingState,activeFilters:z.infer<typeof filterSchema>}) {
  return useQuery({
      queryKey: ['prospects',activeFilters],
      queryFn: async()=>{
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
          });
        return getProspects(params);
      },
    })
}