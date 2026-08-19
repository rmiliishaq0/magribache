import { getProspects } from "@/modules/crm/api/get-prospects";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { filterSchema } from "../../schemas/filter";
import { getClients } from "../../api/get-clients";



export  function useGetClients({activeFilters}: { activeFilters?:z.infer<typeof filterSchema>}) {
  return useQuery({
      queryKey: activeFilters ? ['clients',activeFilters] :['clients'],
      queryFn: async()=>{
        if(activeFilters){
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
          return getClients(params);
        }
        return getClients();
      },
    })
}