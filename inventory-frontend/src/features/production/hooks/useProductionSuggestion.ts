import { useQuery } from "@tanstack/react-query";
import { getProductionSuggestion } from "../api/production.queries";
import type { ProductionSuggestionResponse } from "../types";

export const PRODUCTION_SUGGESTION_QUERY_KEY = ["production-suggestion"];

export const useProductionSuggestion = () => {
  return useQuery<ProductionSuggestionResponse>({
    queryKey: PRODUCTION_SUGGESTION_QUERY_KEY,
    queryFn: getProductionSuggestion,
  });
};
