import { useQuery } from "@tanstack/react-query";
import { generateReference } from "../../actions/generate-refrence";

export  function useGetReference() {
  return useQuery({
      queryKey: ["reference"],
      queryFn: generateReference,
    })
}