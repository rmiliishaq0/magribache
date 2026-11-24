import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/modules/clients/api/get-clients";

export function useClients(params: Record<string, string | number | boolean> = {}, enabled = true) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) searchParams.set(key, String(value));
  });

  return useQuery({
    queryKey: ["clients", Object.entries(params)],
    queryFn: () => getClients(searchParams),
    enabled,
  });
}
