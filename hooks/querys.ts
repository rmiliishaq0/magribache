import {useQuery} from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";
import { getClients ,getContrats,getProspects,getContactsFournisseurs,getContacts,getFournisseurs} from "@/utils/Apis";

type Pagination = {
  pageIndex: number;
  pageSize: number;
};



export  function useClients({pagination, sorting}: { pagination: Pagination; sorting: SortingState}, enabled: boolean) {
  return useQuery({
      queryKey: ['clients',pagination,sorting],
      queryFn: async()=>{
        const sort = sorting[0];

        const params = new URLSearchParams({
          page: String(pagination.pageIndex + 1),
          limit: String(pagination.pageSize),
          sortBy: sort?.id ?? "createdAt",
          order: sort?.desc ? "desc" : "asc",
        });
        return getClients(params);
      },
      enabled,
    })
}

export  function useFournisseurs({pagination, sorting}: { pagination: Pagination; sorting: SortingState}, enabled: boolean) {
  return useQuery({
      queryKey: ['fournisseurs',pagination,sorting],
      queryFn: async()=>{
        const sort = sorting[0];

        const params = new URLSearchParams({
          page: String(pagination.pageIndex + 1),
          limit: String(pagination.pageSize),
          sortBy: sort?.id ?? "createdAt",
          order: sort?.desc ? "desc" : "asc",
        });
        return getFournisseurs(params);
      },
      enabled,
    })
}

export  function useContacts({pagination, sorting}: { pagination: Pagination; sorting: SortingState}, enabled: boolean) {
  return useQuery({
      queryKey: ['contacts',pagination,sorting],
      queryFn: async()=>{
        const sort = sorting[0];

        const params = new URLSearchParams({
          page: String(pagination.pageIndex + 1),
          limit: String(pagination.pageSize),
          sortBy: sort?.id ?? "createdAt",
          order: sort?.desc ? "desc" : "asc",
        });
        return getContacts(params);
      },
      enabled,
    })
}

export  function useContactsFournisseurs({pagination, sorting}: { pagination: Pagination; sorting: SortingState}, enabled: boolean) {
  return useQuery({
      queryKey: ['contacts-fournisseurs',pagination,sorting],
      queryFn: async()=>{
        const sort = sorting[0];

        const params = new URLSearchParams({
          page: String(pagination.pageIndex + 1),
          limit: String(pagination.pageSize),
          sortBy: sort?.id ?? "createdAt",
          order: sort?.desc ? "desc" : "asc",
        });
        return getContactsFournisseurs(params);
      },
      enabled,
    })
}

export  function useProspects({pagination, sorting}: { pagination: Pagination; sorting: SortingState}, enabled: boolean) {
  return useQuery({
      queryKey: ['prospects',pagination,sorting],
      queryFn: async()=>{
        const sort = sorting[0];

        const params = new URLSearchParams({
          page: String(pagination.pageIndex + 1),
          limit: String(pagination.pageSize),
          sortBy: sort?.id ?? "createdAt",
          order: sort?.desc ? "desc" : "asc",
        });
        return getProspects(params);
      },
      enabled,
    })
}

export function useContrats({pagination, sorting}: { pagination: Pagination; sorting: SortingState}, enabled: boolean) {
  return useQuery({
      queryKey: ['contrats',pagination,sorting],
      queryFn: async()=>{
        const sort = sorting[0];

        const params = new URLSearchParams({
          page: String(pagination.pageIndex + 1),
          limit: String(pagination.pageSize),
          sortBy: sort?.id ?? "createdAt",
          order: sort?.desc ? "desc" : "asc",
        });
        return getContrats(params);
      },
      enabled,
    })
}