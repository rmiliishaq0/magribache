import { useQuery } from "@tanstack/react-query";
import { getAllPartners } from "../../actions/get-all-partners";


export  function useGetAllPartners() {
  return useQuery({
      queryKey: ["allPartners"],
      queryFn: getAllPartners,
    })
}