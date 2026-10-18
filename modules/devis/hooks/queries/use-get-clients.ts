import { useQuery } from "@tanstack/react-query";
import { getClientsWithDevis } from "../../actions/get-clients";


export  function useGetClientsWithDevis() {
  return useQuery({
      queryKey: ["clientsWithDevis"],
      queryFn: getClientsWithDevis,
    })
}