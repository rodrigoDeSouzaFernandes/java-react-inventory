import api from "@/lib/client/axios";
import type { ProductionSuggestionResponse } from "../types";

export const getProductionSuggestion =
  async (): Promise<ProductionSuggestionResponse> => {
    const response = await api.get("/production/suggestion");
    return response.data;
  };
